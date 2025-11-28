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
    const admin = false;
    const employer = true;
    const candidate= false;

    return (
        <aside className="w-[15%] h-screen fixed top-0 bg-white shadow shadow-gray-300 p-4">
            <h1 className="h-[50px]"></h1>
            <div className='flex flex-col justify-between h-[600px]'>
                {admin && <div>
                    <Link href={'/AdminDashboard'} className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><HiMiniSquares2X2 className='text-lg' /><span className='hidden lg:inline-block'>Dashboard</span></Link>
                    <Link href='/AdminDashboard/Admin_userpage' className="text-md text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2">
                        <FaUsers className='text-lg' /><span className='hidden lg:inline-block'>Users</span> 
                    </Link>

                    <Link href={'/AdminDashboard/PostJob'} className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><FaPlus className='text-lg' /><span className='hidden lg:inline-block'>Post Job</span></Link>
                    <Link href='/AdminDashboard/Analytics' className="text-md text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2">
                        <FaChartLine className='text-lg' /><span className='hidden lg:inline-block'>Analytics</span> 
                    </Link>

                    <Link href='/AdminDashboard/AdminNotifi' className="text-md text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2">
                        <IoNotificationsOutline className='text-lg' /><span className='hidden lg:inline-block'>Message</span> 
                    </Link>

                    <Link href='/AdminDashboard/Settings' className="text-md text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2">
                        <FiSettings className='text-lg' /><span className='hidden lg:inline-block'>Settings</span> 
                    </Link>
                </div>
                }

                {employer && <div>
                    <Link href={'/EmployerDashboard'} className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><HiMiniSquares2X2 className='text-lg' /><span className='hidden lg:inline-block'>Dashboard</span> </Link>
                    <Link href={'/EmployerDashboard/PostJob'} className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><FaPlus className='text-lg' /><span className='hidden lg:inline-block'>Post Job</span></Link>
                    <Link href={'/EmployerDashboard/manageJob'} className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><MdManageAccounts className='text-lg' /><span className='hidden lg:inline-block'>Manage Job</span></Link>
                    <Link href='/EmployerDashboard/Analytics' className="text-md text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2 ">
                        <FaChartLine className='text-lg' /><span className='hidden lg:inline-block'>Analytics</span>
                    </Link>
                    <Link href='/EmployerDashboard/Messages' className="text-md text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2 ">
                        <FaRegEnvelope className='text-lg' /><span className='hidden lg:inline-block'>Messages</span>
                    </Link>
                    <Link href='/EmployerDashboard/EmployerNotifi' className="text-md text-black flex items-center hover:bg-green-500 gap-2 rounded-md p-2 ">
                        <IoNotificationsOutline className='text-lg' /><span className='hidden lg:inline-block'>Notifications</span>
                    </Link>
                    <Link href={'/EmployerDashboard/Company'} className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><PiBuildingOffice className='text-lg' /><span className='hidden lg:inline-block'>Company profile</span> </Link>
                </div>
                }
                
                {candidate && <div>
                    <Link href='/Dashboard' className="text-md text-black flex items-center hover:bg-green-500 gap-2  outline-0  rounded-md p-2  "><HiMiniSquares2X2 className='text-lg' />Dashboard</Link>
                    <Link href='/Dashboard/ShowJobs' className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><CiViewList className='text-lg' />My Jobs</Link>
                    <Link href={'/Dashboard/ReleventJobs'} className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><FaBriefcase />Relevant Jobs</Link>
                    <Link href='/Dashboard/CandidateNotifi' className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><IoNotificationsOutline /> Notifications</Link>
                    <Link href='/Profile' className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 " ><MdManageAccounts /> Profile</Link>
                    <Link href={'/Dashboard/SaveJobs'} className="text-md text-black flex items-center hover:bg-green-500 gap-2  rounded-md p-2 "><FaRegSave className='text-lg' />Save Jobs </Link>
                </div>
                }

                <div className=''>
                    <h1 onClick={handleSingout} className=" text-md lg:text-lg text-black flex items-center hover:bg-green-500 rounded-md lg:p-2 "><IoIosLogOut className='hidden lg:block text-lg' />Logout</h1>
                </div>

            </div>

        </aside>
    );
};

export default Sidebar;