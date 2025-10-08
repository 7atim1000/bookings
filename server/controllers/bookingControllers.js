import Room from "../models/Room.js" ;
import Booking from "../models/Booking.js";
import Hotel from '../models/Hotel.js';
import transporter from "../configs/nodemailer.js";

// function to check availability of room 
const checkAvailability = async({ checkInDate, checkOutDate, room}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        });
        
        const isAvailable = bookings.length === 0; 
        return isAvailable;

    } catch (error) {
       console.error(error.message)     
    }
};


// API Check availabiliy 
export const checkAvailabilityAPI = async (req , res ) => {
    try {
        const { room , checkInDate, checkOutDate } = req.body ;
        const isAvailable = await checkAvailability({ 
            checkInDate,
            checkOutDate,
            room
        });

        res.json({ success: true, isAvailable })
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
};


//API to create new booking
export const createBooking = async(req , res ) => {
    
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body ;
        
        const userId = req.user._id ;
         if (!userId) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not authenticated' 
            });
        }
        
        // bofore booking checkAvailability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });
        if (!isAvailable) {
            return res.json({success: false, message: 'Sorry room is not available now'});
        }

        // get booking totalPrice
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight ;
        // Calculate total based on night
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights ;

        const booking = await Booking.create({
            user:userId,
            room, 
            hotel: roomData.hotel._id,
            guests : +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

       

        res.json({success: true, message: 'Booking created successfully'});

    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Failed to create booking'})
    }
};


//API TO GET ALL BOOKING FOR USER 
// export const getUserBookings = async(req , res) => {
    
//     try {
//         const user = req.user._id ;
//         const bookings = await Booking.find({user}).populate("room hotel").sort({createAt: -1});

//         res.json({ success:true, bookings});

//     } catch (error) {
//         console.log(error)
//         res.json({ suucess: false, message: error.message})
//     }
// } ;
export const getUserBookings = async(req, res) => {
    try {
        // Make sure user is available from auth middleware
        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not authenticated' 
            });
        }

        const userId = req.user._id;
        const bookings = await Booking.find({ user: userId })
            .populate("room hotel")
            .sort({ createdAt: -1 }); // Fixed typo: createAt -> createdAt

        res.json({ success: true, bookings });

    } catch (error) {
        console.log('Get user bookings error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};


export const getHotelBookings = async (req , res)=> {
    
    try{
        const hotel = await Hotel.findOne({owner: req.auth.userId});
        if (!hotel) {
            return res.json({ success: false, message: 'No Hotel found'});
        }

        const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({createdAt: -1});
        
        //Total bookings
        const totalBookings = bookings.length;

        //Total Revenue
        const totalRevenue = bookings.reduce((acc, booking)=>acc + booking.totalPrice ,0)
        
        res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}}) 
    
    }catch (error){
        res.json({success: false, message: "Faild to fetch bookings"})
    }
}
