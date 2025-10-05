import React, {useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaHotel } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useClerk, UserButton } from '@clerk/clerk-react';
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useAppContext } from '../context/AppContext';

// useprebuiltui.com

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];

    const bookIcon =() => {
       <FaArrowAltCircleDown />
    }

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {openSignIn} = useClerk(); 
    // const {user} = useUser();
    // const navigate = useNavigate();
    const location = useLocation();

    const {user, navigate, isOwner, setShowHotelReg} = useAppContext()

    useEffect(() => {
        if (location.pathname !== '/'){
           setIsScrolled(true);
           return;
        }else {
            setIsScrolled(false)
        }
        
        setIsScrolled(prev => location.pathname !== '/' ? true : prev);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    
    }, [location.pathname]);

    return (
        
            <nav className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to ='/'>
                    <FaHotel className ='inline w-8 h-8 text-white'/> <span className ='text-white text-lg'>Hotels</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:text-md md:font-medium items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}

                {
                    user && (
                        <button
                            onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}

                            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                            {isOwner ? 'Dashboard' : 'List Your Hotel'}
                        </button>
                    )
                }
                
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    
                    {
                      user ? 
                      (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action 
                                label='My Bookings' labelIcon={<bookIcon/>}
                                onClick ={()=> navigate('/my-bookings')}
                                />
                        </UserButton.MenuItems>
                      </UserButton>)
                      :
                      (<button 
                        onClick ={openSignIn}
                        className={`cursor-pointer px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                        Login
                    </button>)
                    }
                </div>




                {/* Mobile Menu Button */}
                
                <div className="flex items-center gap-3 md:hidden">
                {user &&
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label='My Bookings' labelIcon={<bookIcon />}
                                onClick={() => navigate('/my-bookings')}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                }


                    <CiMenuKebab onClick ={()=> setIsMenuOpen(!isMenuOpen)} className ='w-8 h-8 cursor-pointer text-orange-400 font-semibold' />
                </div>

                {/* Mobile Menu */}

                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <IoCloseOutline  className ='w-7 h-7'/> 
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}
                     
                    { user &&
                    <button 
                        onClick ={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}
                        className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                        {isOwner? 'Dashboard' : "List your Hotel"}
                    </button>
                    }
                    
                    {!user &&
                    <button 
                        onClick ={openSignIn}
                        className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer">
                        Login
                    </button>
                    } 
                </div>
            </nav>
        
    );
}


export default Navbar ;