'use client'

import React from 'react';
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { PiBuildingOffice } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { FaBriefcase, FaChartLine, FaRegEnvelope, FaRegSave, FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { CiViewList } from "react-icons/ci";
import useAxios_public from '@/Hook/useAxios_public';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@/Redux/userSlice';
import Link from 'next/link';
import { IoNotificationsOutline } from 'react-icons/io5';
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
    // const admin = userData?.role === 'admin';
    // const employer = userData?.role === 'employer';
    // const candidate = userData?.role === 'member';
    const admin = true;
    const employer = false;
    const candidate= false;

    return (
        <aside className="w-[15%] h-screen fixed top-0 bg-white shadow shadow-gray-300 p-4">
            <h1 className="h-[50px]"></h1>
            <div className='flex flex-col justify-between h-[600px]'>
                {admin && <div>
                    <Link href={'#'} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><HiMiniSquares2X2 className='text-lg' />Dashboard</Link>
                    <Link href='/Dashboard/Ad_userPage' className="text-lg text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2">
                        <FaUsers className='text-lg' /> Users
                    </Link>

                    <Link href={''} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><FaPlus className='text-lg' />Post Job</Link>
                    <Link href='/Dashboard/Analytics' className="text-lg text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2">
                        <FaChartLine className='text-lg' /> Analytics
                    </Link>
                    <Link href={''} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><PiBuildingOffice className='text-lg' />Company </Link>
                    <Link href='/Dashboard/AdminNotifi' className="text-lg text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2">
                        <IoNotificationsOutline className='text-lg' /> Notifications
                    </Link>

                    <Link href='/Dashboard/Settings' className="text-lg text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2">
                        <FiSettings className='text-lg' /> Settings
                    </Link>
                </div>
                }
                {employer && <div>
                    <Link href={''} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><HiMiniSquares2X2 className='text-lg' />Dashboard</Link>
                    <Link href={''} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><FaPlus className='text-lg' />Post Job</Link>
                    <Link href={''} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><MdManageAccounts className='text-lg' />Manage Jobs</Link>
                    <Link href='/Dashboard/Analytics' className="text-lg text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2 ">
                        <FaChartLine className='text-lg' />Analytics
                    </Link>
                    <Link href='/Dashboard/Messages' className="text-lg text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2 ">
                        <FaRegEnvelope className='text-lg' />Messages
                    </Link>
                    <Link href='/Dashboard/EmployerNotifi' className="text-lg text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2 ">
                        <IoNotificationsOutline className='text-lg' />Notifications
                    </Link>
                    <Link href={''} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><PiBuildingOffice className='text-lg' />Company </Link>
                </div>
                }
                {candidate && <div>
                    <Link href='/Dashboard' className="text-lg text-black flex items-center hover:bg-green-500 gap-2  outline-0  rounded-md p-2  "><HiMiniSquares2X2 className='text-lg' />Dashboard</Link>
                    <Link href='/Dashboard/ShowJobs' className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><CiViewList className='text-lg' />My Jobs</Link>
                    <Link href={'/Dashboard/ReleventJobs'} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><FaBriefcase />Relevant Jobs</Link>
                    <Link href='/Dashboard/CandidateNotifi' className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><IoNotificationsOutline /> Notifications</Link>
                    <Link href='/Profile' className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 " ><MdManageAccounts /> Profile</Link>
                    <Link href={'/Dashboard/SaveJobs'} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><FaRegSave className='text-lg' />Save Jobs </Link>
                </div>
                }

                <div className=''>
                    <h1 onClick={handleSingout} className="text-lg text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><IoIosLogOut className='text-lg' />Logout</h1>
                </div>

            </div>

        </aside>
    );
};

export default Sidebar;