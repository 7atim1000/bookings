import React , {useState, useEffect} from 'react'
import Title from '../components/Title'

import { IoLocation } from "react-icons/io5";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const MyBookings = () => {
        const { axios, getToken, user } = useAppContext();
        const [bookings, setBookings] = useState([]);

        // const fetchUserBookings = async()=> {
        //     try {
        //         // const {data} = await axios.get('/api/bookings/user', {headers:{Authorization: `Bearer ${await getToken()}})` }})
        //         const {data} = await axios.get('/api/bookings/user', 
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${await getToken()}`
        //             }}
        //         )
            
        //         if (data.success){
        //             setBookings(data.bookings);
        //         } else {
        //             toast.error(data.message)
        //         }
        //     } catch (error) {
        //         toast.error(error.message);
        //     }
        // }

        // useEffect (()=>{
        //     if (user){
        //         fetchUserBookings();
        //     }
        // }, [user])

    const fetchUserBookings = async () => {
        try {
            const token = await getToken();
            if (!token) {
                toast.error('No authentication token found');
                return;
            }

            const { data } = await axios.get('/api/bookings/user',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Fixed typo: data.sucess -> data.success
            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Fetch bookings error:', error);
            // More detailed error message
            toast.error(error.response?.data?.message || error.message || 'Failed to fetch bookings');
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserBookings();
        }
    }, [user]);

    return (
        <div className ='py-28 md:pb-35 md:pt-18 px-4 md:px-16 lg:px-24xl:px-32'>
            <Title title ='My Bookings' subTitle ="Easily manage your past, currently, and upcoming hotel reservations in one place
            . Plan your trips seamlessly withjusta few clicks" align ="left"
            />
        
        <div className ='max-w-6xl mt-8 w-full text-gray-800'>
        
            <div className ='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                <div className ='w-1/3'>Hotels</div>          {/*3fr*/}
                <div className ='w-1/3'>Date & Timings</div>   {/*2fr*/}
                <div className ='w-1/3'>Payment</div>         {/*1fr*/}
            </div>
           
            {bookings.map((booking)=> (
                <div 
                    key ={booking._id}
                    className ='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'
                    >
                    {/*Hotel Details / 3fr */}
                    <div className ='flex flex-col md:flex-row '>
                        <img src ={booking.room.images[0]} alt ="Hotel Image"
                        className ='min-md:w-44 rounded shadow object-cover'
                        />
                        <div className ='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                            <p className ='text-2xl'>{booking.hotel.name}
                            <span className ='text-sm text-blue-600'> ({booking.room.roomType})</span>
                            </p>
                            
                            <div className ='flex items-center gap-1 text-sm text-gray-500'>
                                <IoLocation className ='inline w-5 h-5 text-green-200'/>
                                <span>{booking.hotel.address}</span>
                            </div>
                            <div className ='flex items-center gap-1 text-sm'>
                                <FaPersonCircleCheck className ='inline w-5 h-5 text-blue-200'/>
                                <p className ='text-gray-600 text-xs'>Guests :<span className ='text-gray-800 text-md'> {booking.guests}</span></p>
                            </div>
                            <p className ='text-gray-600 text-xs'>Total : AED<span className ='text-gray-800 text-md'> {booking.totalPrice}</span></p>
                            

                        </div>
                    </div>
                    
                    {/*Date & Timeings / 2fr*/}
                    <div className ='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                        <div>
                            <p>Check-In: </p>
                            <p className ='text-gray-500 text-sm'>
                                {new Date(booking.checkInDate).toDateString()}
                            </p>
                        </div>
                        <div>
                            <p>Check-Out:</p>
                            <p className ='text-gray-500 text-sm'>
                                {new Date(booking.checkInDate).toDateString()}
                            </p>
                        </div>

                    </div>
                   
                   {/*payment status /1fr */}
                    <div className ='flex flex-col items-center justify-center pt-3'>
                        <div className ='flex items-center gap-2'>
                            <div className ={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-[#be3e3f]"}`}></div>
                               
                                <p className ={`text-sm ${booking.isPaid ? 'text-green-500' : 'text-[#be3e3f]'}`}>
                                    {booking.isPaid ? "Paid" : "Unpaid"}
                                </p>
                        </div>

                            {
                               !booking.isPaid &&(
                                <button className ='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full
                                hover:bg-gray-50 transition-all duration-700 cursor-pointer'>Pay Now</button>
                               )
                            }
                    </div>
                </div>
            ))}
        
        </div>

        </div>
    );
}


export default MyBookings ;