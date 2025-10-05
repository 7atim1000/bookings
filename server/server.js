import express from 'express' ; 
import "dotenv/config" ;
import cors from 'cors' ;
import connectDB from './configs/db.js'
import {clerkMiddleware} from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoute.js';
import hotelRouter from './routes/hotelRoute.js';
import connectionCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoute.js';
import bookingRouter from './routes/bookingRoute.js';
// github step at 5:54:58

// nodemailer.com npm install nodemailer
// brevo.com    
/*
Setting clerk web hooks from this URL:
https://dashboard.clerk.com/apps/app_330rIERIpAVpYbqWhlR1vBblXMD/instances/ins_330rIQ6LVKKDm89nmhNG0JeUUmC/webhooks

default set: https://play.svix.com/in/e_9sZurpIByTVOFFSpuBS5pZg06AB/
localhostset: http://localhost:9000/api/clerk

vercel backend domain
https://hotel-booking-backend-eight-ashy.vercel.app/
*/

// create an app using express
connectDB();
connectionCloudinary();
const app = express();

// middleware 
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
 }))

app.use(express.json());
app.use(clerkMiddleware());

// provide cors that will allow the backend  to connect with any frontend
//app.use(cors()) ; Enable cross-Origin resource sharing
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5174']
 }))

// API to listen to clerk webhooks 
app.use('/api/clerk', clerkWebhooks); 
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);

// create the first route in our application
app.get('/', (req , res)=> res.send('API is working'));

// if the port is available in the environment variable then that port number , else we will use the 8000 
const PORT = process.env.PORT||8000;

// dot listen that will start this backend server by provide the port number 
app.listen(PORT, ()=> console.log(`Server Running On Port ${PORT}`));
