import React , {useState, useEffect} from 'react' 
import { useParams } from 'react-router-dom'
import { roomCommonData } from '../assets/assets';
import StarRating from '../components/StarRating';

import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaHotel } from "react-icons/fa6";
import { useAppContext } from '../context/AppContext';
import {toast} from 'react-hot-toast' ;

const RoomDetails = () => {
    const { id } = useParams();
    const {rooms, getToken, axios, navigate} = useAppContext();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(1);

    const [isAvailable, setIsAvailable] = useState(false);
    
    // Check if the room is available
    const checkAvailability = async()=> {
        try {
            // Check is checkIn Date is greater than checkOut Date
            if (checkInDate >= checkOutDate) {
                toast.error('Sorry Chcek-in Date should be less than Check-out Date')
                return ;
            } 

            const {data} = await axios.post('/api/bookings/check-availability', {room: id, checkInDate,checkOutDate})
            if (data.success) {
                if(data.isAvailable){
                    setIsAvailable(true)
                    toast.success('Room is available')
                } else {
                    setIsAvailable(false);
                    toast.error('Room is not available now')
                }
            }else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    };

    // onSubmit handler function to check availabilty & book the room
    const onSubmitHandler = async(e)=> {
        
        try{
            e.preventDefault();
            if (!isAvailable){
                return checkAvailability();
            }else {
                const {data} = await axios.post('/api/bookings/book', 
                    {
                        room:id, 
                        checkInDate, 
                        checkOutDate, 
                        guests:guests, 
                        paymentMethod: "Pay At Hotel"
                    }, 
                    {
                        headers:{
                            Authorization: `Bearer ${await getToken()}`
                        }
                    }
                )

                    if (data.success) {
                        toast.success(data.message)
                        navigate('/my-bookings')
                        scrollTo(0, 0)
                    }else (
                        toast.error(data.message)
                    )
            }

        }catch(error){
            toast.error(error.message)
        }
    }

    useEffect(()=>{
       const room = rooms.find(room=> room._id === id)
       room && setRoom(room)
       room && setMainImage(room.images[0])
    }, [rooms])



    return room &&(

      <div className ='py-20 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32'>
          <div className ='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className ='text-3xl md:text-4xl font-playfair'>{room.hotel.name} 
                <span className ='font-inter text-sm'>({room.roomType})</span>
            </h1>
            <p className ='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
          </div>

          <div className ='flex items-center gap-1 mt-2'>
            <StarRating />
            <p className ='ml-2'>200+ reviews</p>
          </div>

          <div className ='flex items-center gap-1 text-gray-500 mt-2'>
            <IoLocation className ='w-5 h-5 text-green-600'/>
            <span>{room.hotel.address}</span>
          </div>

          <div className ='flex flex-col lg:flex-row mt-6 gap-6'>
            <div className ='lg:w-1/2 w-full'>
                <img src ={mainImage} alt="room Image" className ='w-full rounded-xl shadow-lg object-cover'/>
            </div>

            <div className ='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
               {room.images.map((image, index)=> (
                
                <img onClick ={()=> setMainImage(image)}
                  key ={index} src ={image} alt ="room image"
                  className ={`w-full rounded-xl h-40 shadow-md object-cover cursor-pointer 
                    ${mainImage === image && 'outline-3 outline-green-600'}`}
                />
               ))}
            </div>
          </div>

        <div className ='flex flex-col md:flex-row md:justify-between mt-10'>
            
            <div className ='flex flex-col'>
                <h1 className ='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                  
                    <div className ='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((amenity, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100/70'>
                                <BsFillEmojiSunglassesFill className='text-[#f6b100]' />
                                <p className='text-xs text-[#0ea5e9]'>{amenity}</p>
                            </div>
                        ))}
                    </div>
            </div>
          
            <p className ='text-sm text-stone-500'>AED <span className ='text-lg text-stone-800'>{room.pricePerNight}</span> / night</p>
          
        </div>

        <form 
            onSubmit ={onSubmitHandler}
            className = 'flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px__rgba(0,0,0,0.15)] p-6 rounded-xl mx-automt-16 max-w-6xl'>
            <div className ='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                
                <div className ='flex flex-col'> 
                    <label htmlFor ='checkInDate' className ='font-medium'>Check-In</label>
                    <input 
                        onChange ={(e)=>setCheckInDate(e.target.value)}
                        min ={new Date().toISOString().split('T')[0]}
                        
                        type ='date' id ='checkInDate' placeholder ='Check-In'
                        className ='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none text-sm'
                        required
                    />
                </div>
                <div className ='w-px bg-[#49b9ff]/50 max-h-15 min-h-15 max-md:hidden'></div>
                <div className ='flex flex-col'> 
                    <label htmlFor ='checkOutDate' className ='font-medium'>Check-Out</label>
                    <input 
                        onChange ={(e)=>setCheckOutDate(e.target.value)}
                        min ={checkInDate}
                        disabled={!checkInDate}
                        type ='date' id ='checkOutDate' placeholder ='Check-Out'
                        className ='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none text-sm'
                        required
                    />
                </div>
                <div className ='w-px bg-[#49b9ff]/50 max-h-15 min-h-15 max-md:hidden'></div>
                <div className ='flex flex-col'> 
                    <label htmlFor ='guests' className ='font-medium'>Guests</label>
                    <input 
                        onChange ={(e)=>setGuests(e.target.value)}
                        value ={guests}
                        type ='number' id ='guests' placeholder ='1'
                        className ='max-w-22 rounded border border-gray-300 px-3 py-2 outline-none'
                        required
                    />
                </div>


            </div>
            <button type ='submit' className ='bg-[#49b9ff] hover:bg-[#49b9ff] active:scale-95 transition-all text-white
            rounded-sm max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer font-semibold'>
                {isAvailable ? "Book Now" : "Check Availability"}
            </button>
        </form>

        {/*Common Specifications */}
        
        <div className ='mt-25 space-y-4'>
                {
                    roomCommonData.map((item, index) => (
                        <div key={index} className='flex items-start gap-2'>
                            <BsFillPatchCheckFill className ='w-5 h-5 text-green-600'/>
                            <div>
                                <p className='text-base'>{item.title}</p>
                                <p className='text-gray-500'>{item.description}</p>
                            </div>
                        </div>
                    ))
                }
        </div>

        <div className ='max-w-3xl border-y  border-gray-300 my-15 py-10 test-gray-500'>
            <p>Guests will ne allocated on the ground floor according to availability you get a comfortable tow bedroom apartment
                has a true city feeling. The price quoted is for tow guests, at the guest slot please mark the number of guests
                to get the exact price for groups. The guests will be allocatedground according to availability. Yoo get the comfortable
                tow bedroom apartment that has a true city feeling.
            </p>
        </div>

        {/*Hosted by */}
        <div className ='flex flex-col items-start gap-4'>
                <div className ='flex items-center gap-2'>
                   <FaHotel className ='inline w-5 h-5 text-green-600'/>    
                   <p className ='text-lg md:text-lg'>Hosted By <span className ='text-2xl text-green-600'>{room.hotel.name}</span></p>
                </div>
                
                
                <div className ='flex items-center mt-1'>
                    <StarRating/>
                    <p className ='ml-2'>200+ reviews</p>
                </div>
        </div>

        <button className ='px-6 py-2.5  mt-4 rounded text-white bg-[#49b9ff] hover:bg-[#49b9ff]-dull transition-all duration-1000 cursor-pointer'>
            Contact Now
        </button>
       
      </div>
    );
}

export default RoomDetails