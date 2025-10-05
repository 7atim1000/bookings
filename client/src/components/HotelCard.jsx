import React from 'react' ;
import { Link } from 'react-router-dom'
import { ImLocation2 } from "react-icons/im";
import { IoIosStar } from "react-icons/io";

const HotelCard = ({room , index}) => {
    return (
       <Link to ={'/rooms/' + room._id} onClick ={()=> scrollTo(0,0)} key ={room._id}
       
        className ='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90
            shadow-[0px_4px_4px_rgba(0,0,0,0.15)]'
       >
            <img src ={room.images[0]} alt ="" className ='h-50' />
            {index % 2 === 0 &&
            <p className ='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>
                Best Seller
            </p>
            }
            <div className ='p-4 pt-5'>
                <div className ='flex items-center justify-between'>
                    <p className ='font-playfair text-xl font-medium text-gray-800'>{room.hotel.name}</p>
                    <div className ='flex items-center gap-1'>
                        <IoIosStar className ='text-[#f6b100] w-5 h-5'/> 4.5   
                    </div>
                </div>

                <div className ='flex items-center gap-1 text-sm mt-5'>
                    <ImLocation2  className ='text-green-500 w-5 h-5'/>
                    <span>{room.hotel.address}</span>
                </div>
                <div className ='flex items-center justify-between mt-4'>
                    <p className ='text-xs font-normal'>AED <span className ='text-lg text-green-600'> {room.pricePerNight}</span> / night </p>
                    <button className ='px-4 py-2 text-sm font-semibold rounded hover:bg-[#f6b100] hover:text-[#0ea5e9]
                    duration-1000 transition-all cursor-pointer text-white bg-[#0ea5e9]'>Book Now</button>
                </div>
            </div>
       </Link>        
    );
}

export default HotelCard ;