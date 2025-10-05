import React from 'react' ;
import { testimonials } from '../assets/assets';
import { IoIosStarOutline } from "react-icons/io";

const StarRating = ({rating = 4}) => {
    return (
        <>
            {Array(5).fill('').map((_, index) => (
                <IoIosStarOutline 
                    className ='w-5 h-5 text-[#f6b100]'
                    key ={index} 
                    filled ={testimonials.rating > index} 
                />
            )) }
        </>
    );
}


export default StarRating ;