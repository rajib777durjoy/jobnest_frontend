'use client'

import React from 'react';
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { PiBuildingOffice } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import useAxios_public from '@/Hook/useAxios_public';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@/Redux/userSlice';
const Sidebar = () => {
   const router = useRouter();
    const axiosPublic = useAxios_public();
    const userData = useSelector(state => state.user?.userData);
    const dispatch = useDispatch()
    const handleSingout = async () => {
        const res = await axiosPublic.post(`/api/signOut/${userData?.email}`, {});
        // console.log('signout::', res?.data?.message)
        if (res.data?.message) {
            dispatch(setUserData(null))
            return router.push('/');
        }

    }
    return (
        <aside className="w-[15%] h-screen fixed top-0 shadow shadow-gray-300 p-4">
            <h1 className="h-[50px]"></h1>
            <div className='flex flex-col justify-between h-[600px]'>
                <div>
                    <h1 className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><HiMiniSquares2X2 className='text-lg' />Dashboard</h1>
                    <h1 className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><FaPlus className='text-lg' />Post Job</h1>
                    <h1 className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><MdManageAccounts className='text-lg' />Manage Jobs</h1>
                    <h1 className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><PiBuildingOffice className='text-lg' />Company </h1>
                </div>
                <div className=''>
                    <h1 onClick={handleSingout} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><IoIosLogOut className='text-lg' />Logout</h1>
                </div>

            </div>

        </aside>
    );
};

export default Sidebar;