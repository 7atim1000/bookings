import User from '../models/User.js';
import { Webhook } from 'svix';

const clerkWebhooks = async (req, res) => {
    console.log('Webhook received:', req.method, req.url);
    
    try {
        // Log headers for debugging
        console.log('Headers received:', {
            'svix-id': req.headers["svix-id"],
            'svix-timestamp': req.headers["svix-timestamp"],
            'svix-signature': req.headers["svix-signature"],
        });

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verify webhook signature
        await whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;
        console.log('Webhook type:', type, 'User ID:', data?.id);

        const userData = {
            _id: data.id,
            email: data.email_addresses[0]?.email_address,
            username: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            image: data.image_url,
        };

        console.log('User data to process:', userData);

        switch (type) {
            case "user.created": {
                const newUser = await User.create(userData);
                console.log('User created in DB:', newUser._id);
                break;
            }

            case "user.updated": {
                const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
                console.log('User updated in DB:', updatedUser?._id);
                break;
            }

            case "user.deleted": {
                const deletedUser = await User.findByIdAndDelete(data.id);
                console.log('User deleted from DB:', deletedUser?._id);
                break;
            }

            default:
                console.log('Unhandled webhook type:', type);
                break;
        }

        res.json({ success: true, message: 'Webhook received' });

    } catch (error) {
        console.error('Webhook error:', error.message);
        console.error('Full error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export default clerkWebhooks;
