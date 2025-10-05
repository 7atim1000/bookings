// Add Retry Logic in Your Webhook
const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        await whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;
        
        const userData = {
            _id: data.id,
            email: data.email_addresses[0]?.email_address,
            username: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            image: data.image_url,
        };

        console.log(`Processing webhook: ${type} for user: ${data.id}`);

        switch (type) {
            case "user.created": {
                // Add retry logic for first-time user creation
                let retries = 3;
                let success = false;
                
                while (retries > 0 && !success) {
                    try {
                        // Check if user already exists (prevents duplicates)
                        const existingUser = await User.findById(data.id);
                        if (existingUser) {
                            console.log('User already exists:', data.id);
                            success = true;
                            break;
                        }
                        
                        await User.create(userData);
                        console.log('User successfully created:', data.id);
                        success = true;
                    } catch (dbError) {
                        console.log(`Retry ${4 - retries} failed:`, dbError.message);
                        retries--;
                        
                        if (retries > 0) {
                            // Wait 1 second before retry
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        }
                    }
                }
                
                if (!success) {
                    console.error('Failed to create user after all retries:', data.id);
                    // You might want to queue this for later processing
                }
                break;
            }

            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData, { new: true, upsert: false });
                console.log('User updated:', data.id);
                break;
            }

            case "user.deleted": {
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
