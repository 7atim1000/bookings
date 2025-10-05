import React from 'react'
import Title from './Title';
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { exclusiveOffers } from '../assets/assets';

const ExcelusiveOffers = () => {
    return (
        <div className ='flex flex-col items-center px-6 md:px-6 lg:px-6 xl:px-12 pt-20 pb-15'>
            <div className ='flex flex-col md:flex-row items-center justify-between w-full'>
               <Title align= 'left' title ='Exclusive Offers' subTitle ='Take advantege of our limited-time offers and
               special packages to enhance your stay and create unforgettable memories.'/>
               <button >View All Offers
                    <RiArrowRightDoubleLine className ='inline text-[#49b9ff]'/>
               </button>
            </div>

            <div className ='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full'>
                {exclusiveOffers.map((item) => (
                   
                    <div 
                       key ={item.id}
                       className ='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl
                       text-white font-light bg-no-repeat gb-cover bg-center '
                    
                        style = {{backgroundImage: `url(${item.image})`}}
                      >
                        <p 
                            className ='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-[#be3e3f] font-medium rounded-full'>
                            {item.priceOff} % OFF
                        </p>
                        <div>
                            <p className ='text-2xl  font-medium font-playfair'>{item.title}</p>
                            <p className ='text-lg'>{item.description}</p>
                            <p className ='text-sm'>Expire : <span className ='text-[#be3e3f]/70 text-xl'>{item.expiryDate}</span></p>
                        </div>
                        <button>
                            View Offers
                            <RiArrowRightDoubleLine className ='inline text-[#0ea5e9]'/>
                        </button>


                    </div>
                ))}

            </div>
        </div>
    );
}

export default ExcelusiveOffers ;