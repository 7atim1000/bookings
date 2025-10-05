import React from 'react' 
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineBedroomChild } from "react-icons/md";
import { MdOutlineAddCircle } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const sidebarLinks = [
        {name: "Dashboard", path: "/owner", icon: <MdDashboardCustomize className ='min-h-6 min-w-6'/>},
        {name: "Add Room", path: "/owner/add-room", icon: <MdOutlineAddCircle className ='min-h-6 min-w-6'/>},
        {name: "List Room", path: "/owner/list-room", icon: <MdOutlineBedroomChild className ='min-h-6 min-w-6'/>}
    ] 
    
    
    return (
        <div className ='md:w-64 w-16 border-x-2 h-full text-base  border-gray-300 pt-4 flex flex-col transition-all duration-1000'>
           {
             sidebarLinks.map((item, index)=>(
                <NavLink to ={item.path} key ={index} end ='/owner'
                    className ={({isActive}) => `flex items-center py-3 px-4 md:px-8 gap-3
                    ${isActive ? 'border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600' 
                        : 'hover:bg-gray-100/90 border-white text-gray-600'
                    }`}
                >
                    {item.icon}
                    <p className ='md:block hidden text-center'>{item.name}</p>

                </NavLink>
             ))
           }
        </div>
    );
}

export default Sidebar ;