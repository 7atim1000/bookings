import React from 'react' ;
import { Link } from 'react-router-dom';
import { FaHotel } from "react-icons/fa6";
import {UserButton} from '@clerk/clerk-react'
const Navbar = () => {
    return(
       <div className ='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-1000'>
        <Link>
            <FaHotel className ='inline w-8 h-8 text-blue-500'/> <span className ='text-[#1f1f1f] text-lg'>Hotels</span>
        </Link>
        <UserButton/>
       </div>
    );
}

export default Navbar ;
