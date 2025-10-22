'use client'

import { useRouter } from 'next/navigation';
import NavItem from './NavItem';
import React, { useState } from 'react';
import { BiSolidUserCircle } from "react-icons/bi";
const Navbar = () => {
    const router = useRouter()
    const handleNavigate=(path)=>{
     router.push(path)
    }

    return (
        <div className='w-[90%]  mx-auto h-[70px] flex items-center justify-between bg-transparent'>
            {/* icon */}
            <div className='flex flex-col items-center hover:text-[#10B981]'>
                <img src={'/job-offer.png'} alt="logo" className='w-[35px] h-[35px]' />
                <h1 className='text-md font-bold'>Job<span>Nest</span></h1>
            </div>
            {/* Center position*/}
            {<NavItem handleNavigate={handleNavigate}></NavItem>}
            
            {/* right position */}
            <div>
                { <span><BiSolidUserCircle className='text-4xl' /></span>}
            </div>
            
        </div>
    );
};

export default Navbar;