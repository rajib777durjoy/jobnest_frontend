import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { usePathname } from 'next/navigation';

const NavItem = ({handleNavigate}) => {
const pathname = usePathname();
    return ( 
        <div className='flex items-center justify-between gap-4'>
            <li onClick={()=>{handleNavigate('/')}} className={`cursor-pointer flex items-center gap-1 hover:text-[#10B981] ${pathname =='/'?'text-[#10B981]':''} list-none text-md font-medium`}><FaHome className='text-2xl ms-2 block md:hidden'/><span className='hidden md:block ms-4'>Home</span></li>
            <li onClick={()=>{handleNavigate('/Network')}} className={`cursor-pointer hover:text-[#10B981] ${pathname =='/Network'?'text-[#10B981]':''} list-none text-md font-medium`}><FaPeopleGroup className='text-2xl mx-2 block md:hidden'/><span className='hidden md:block mx-4'>Network</span></li>
            <li onClick={()=>{handleNavigate('/Jobs')}} className={`cursor-pointer hover:text-[#10B981] ${pathname =='/Jobs'?'text-[#10B981]':''} list-none text-md font-medium`}><MdOutlineWork className='text-2xl  block md:hidden'/><span className='hidden md:block'>Jobs</span></li>
            <li onClick={()=>{handleNavigate('/Notification')}} className={`cursor-pointer hover:text-[#10B981] ${pathname =='/Notification'?'text-[#10B981]':''} list-none text-md font-medium`}><AiFillNotification className='text-2xl mx-2 block md:hidden'/><span className='hidden md:block mx-4'>Notification</span></li>
            <li onClick={()=>{handleNavigate('/Message')}} className={`cursor-pointer hover:text-[#10B981] ${pathname =='/Contact'?'text-[#10B981]':''} list-none text-md font-medium`}><BsChatDotsFill className='text-2xl me-2  block md:hidden'/><span className='hidden md:block me-4'>Message</span></li>
        </div>
    );
};

export default NavItem;