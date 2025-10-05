// Update your webhook handler to create users when session.created is received:
const clerkWebhooks = async (req, res) => {
    console.log('=== WEBHOOK RECEIVED ===');
    console.log('Time:', new Date().toISOString());
    console.log('Webhook Type:', req.body?.type);
    
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        await whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;
        
        console.log('Processing webhook:', type, 'for user:', data.id || data.user_id);

        switch (type) {
            case "user.created": {
                console.log('USER.CREATED EVENT TRIGGERED');
                await handleUserCreation(data);
                break;
            }

            case "session.created": {
                console.log('SESSION.CREATED EVENT TRIGGERED');
                await handleSessionCreated(data);
                break;
            }

            case "user.updated": {
                console.log('USER.UPDATED EVENT TRIGGERED');
                const userData = extractUserData(data);
                await User.findByIdAndUpdate(data.id, userData, { new: true, upsert: false });
                console.log('User updated:', data.id);
                break;
            }

            case "user.deleted": {
                console.log('USER.DELETED EVENT TRIGGERED');
                await User.findByIdAndDelete(data.id);
                console.log('User deleted:', data.id);
                break;
            }

            default:
                console.log('Unhandled webhook type:', type);
                break;
        }

        res.json({ success: true, message: 'Webhook received' });

    } catch (error) {
        console.error('Webhook processing error:', error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Helper function to extract user data
const extractUserData = (data) => {
    return {
        _id: data.id || data.user_id,
        email: data.email_addresses?.[0]?.email_address,
        username: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        image: data.image_url,
    };
};

// Handle user creation with retry logic
const handleUserCreation = async (data) => {
    let retries = 3;
    let success = false;
    
    const userData = extractUserData(data);
    
    while (retries > 0 && !success) {
        try {
            const existingUser = await User.findById(userData._id);
            if (existingUser) {
                console.log('User already exists:', userData._id);
                success = true;
                break;
            }
            
            await User.create(userData);
            console.log('User successfully created via user.created:', userData._id);
            success = true;
        } catch (dbError) {
            console.log(`Retry ${4 - retries} failed:`, dbError.message);
            retries--;
            
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    
    if (!success) {
        console.error('Failed to create user after all retries:', userData._id);
    }
};

// Handle session creation - CREATE USER IF NOT EXISTS
const handleSessionCreated = async (data) => {
    console.log('Session created for user:', data.user_id);
    
    // For session.created, we need to fetch user details from Clerk API
    // or use the limited data available in session webhook
    const userData = {
        _id: data.user_id,
        email: data.user?.email_addresses?.[0]?.email_address || 'pending@example.com',
        username: `${data.user?.first_name || ''} ${data.user?.last_name || ''}`.trim() || 'New User',
        image: data.user?.image_url,
    };

    let retries = 3;
    let success = false;
    
    while (retries > 0 && !success) {
        try {
            // Check if user already exists
            const existingUser = await User.findById(data.user_id);
            if (existingUser) {
                console.log('User already exists in DB:', data.user_id);
                success = true;
                break;
            }
            
            // Create user if doesn't exist
            await User.create(userData);
            console.log('User successfully created via session.created:', data.user_id);
            success = true;
        } catch (dbError) {
            console.log(`Session creation retry ${4 - retries} failed:`, dbError.message);
            retries--;
            
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    
    if (!success) {
        console.error('Failed to create user from session after all retries:', data.user_id);
    }
};

export default clerkWebhooks;
