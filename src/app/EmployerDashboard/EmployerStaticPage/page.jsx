import React, { useState } from 'react';
import { LuActivity } from "react-icons/lu";
import { BsGraphUpArrow } from "react-icons/bs";
import { useSelector } from 'react-redux';
import useAxios_public from '@/Hook/useAxios_public';
import { IoEyeSharp } from "react-icons/io5";
import {
    Table,
    TableBody,

    TableCell,

    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';

const EmployerStaticPage = () => {
   const userData = useSelector(state=>state.user?.userData);
   const useAxios = useAxios_public()
   const {data:Jobs=[]}=useQuery({
    queryKey:['Jobs',userData?.id],
    queryFn:async()=>{
        const res = await useAxios.get(`/api/employer/queryRecentJobs/${userData?.id}`)
        console.log(res.data)
        return res.data
    }
   })
  console.log("Jobs::",Jobs)
    return (
        <div>
            <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {/* Card 1 */}
                <div className=' h-[150px]  shadow shadow-gray-400 rounded-md flex items-center justify-between bg-blue-500 px-4'>
                    {/* content */}
                    <div>
                        <h1 className='text-lg lg:text-xl text-white'>Active Jobs</h1>
                        <h2 className='text-xl lg:text-4xl text-white font-bold my-4'>
                            3
                        </h2>
                        <div className=' text-white text-lg lg:text-xl '>
                            <span className='flex items-center gap-2'><BsGraphUpArrow /> 100%</span>
                        </div>
                    </div>

                    {/* icon */}
                    <div className='p-2 rounded-md shadow bg-blue-400'>
                        <LuActivity className='text-2xl lg:text-5xl text-white' />
                    </div>
                </div>
                {/* Card 2 */}
                <div className=' h-[150px]  shadow shadow-gray-400 rounded-md flex items-center justify-between bg-blue-500 px-4'>
                    {/* content */}
                    <div>
                        <h1 className='text-lg lg:text-xl text-white'>Active Jobs</h1>
                        <h2 className='text-xl lg:text-4xl text-white font-bold my-4'>
                            3
                        </h2>
                        <div className=' text-white text-lg lg:text-xl '>
                            <span className='flex items-center gap-2'><BsGraphUpArrow /> 100%</span>
                        </div>
                    </div>

                    {/* icon */}
                    <div className='p-2 rounded-md shadow bg-blue-400'>
                        <LuActivity className='text-2xl lg:text-5xl text-white' />
                    </div>
                </div>
                {/* Card 3 */}
                <div className=' h-[150px]  shadow shadow-gray-400 rounded-md flex items-center justify-between bg-blue-500 px-4'>
                    {/* content */}
                    <div>
                        <h1 className='text-lg lg:text-xl text-white'>Active Jobs</h1>
                        <h2 className='text-xl lg:text-4xl text-white font-bold my-4'>
                            3
                        </h2>
                        <div className=' text-white text-lg lg:text-xl '>
                            <span className='flex items-center gap-2'><BsGraphUpArrow /> 100%</span>
                        </div>
                    </div>

                    {/* icon */}
                    <div className='p-2 rounded-md shadow bg-blue-400'>
                        <LuActivity className='text-2xl lg:text-5xl text-white' />
                    </div>
                </div>
            </div>

            <div className='w-full grid grid-cols-2 gap-4 mt-5'>
                {/* Left side Box */}
                <div className='w-full p-5 rounded-md shadow-md shadow-gray-400 '>
                    <div className='flex justify-between items-center w-full p-5'>
                        <div className=''>
                            <span className='text-xl font-bold block'>Recent Post Jobs</span>
                            <span className='text-md text-gray-500 font-medium'>Latest job postings</span>

                        </div>
                        <div>
                            <Link href={'/AdminDashboard/AdminComponent/AllJob'} ><button className='cursor-pointer'>View All</button></Link>
                        </div>
                    </div>
                    {
                        Jobs?.map((item, ind) => <div key={ind} className='w-full h-[70px] my-4 flex items-center justify-between px-5  rounded-md shadow  shadow-green-500 '>
                            <div className='flex items-center gap-2'>
                                <span>{item?.logo || 'Logo'}</span>
                                <div >
                                    <h2 className='text-md font-bold'>{item?.companyName}</h2>
                                    <h2>{item?.JobTitle}</h2>
                                    <h3 className='text-xs'>{new Date(item?.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}</h3>
                                </div>
                            </div>
                            <div>
                                <Select value={item?.status} onValueChange={(value) => {
                                    setStatus(value)
                                    setJobId(item?.Job_id)
                                }}  >
                                    <SelectTrigger className="w-[180px]" disabled={item?.status === "Accept" || item?.status === 'Reject'}  >
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="Reject">Reject</SelectItem>
                                        <SelectItem value="Accept">Accept</SelectItem>
                                        <SelectItem value="Panding">Panding</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                        </div>)
                    } 

                </div>
                {/* Right side Box */}
                <div className='w-full p-5 rounded-md shadow-md shadow-gray-400 '>
                    <div className='flex justify-between items-center w-full p-5'>
                        <div className=''>
                            <span className='text-xl font-bold block'>Recent Applications</span>
                            <span className='text-md text-gray-500 font-medium'>Latest candidate applications</span>

                        </div>
                        <div>
                            <Link href={'/AdminDashboard/AdminComponent/AllJob'} ><button className='cursor-pointer'>View All</button></Link>
                        </div>
                    </div>
                    {/* {
                        Application?.map((item, ind) => <div key={ind} className='w-full h-[70px] my-4 flex items-center justify-between px-5  rounded-md shadow  shadow-green-500 '>
                            <div className='flex items-center gap-2'>
                               
                                <div >
                                    <h2 className='text-md font-bold'>{item?.fullName}</h2>
                                    <h2>{item?.JobTitle}</h2>
                                    <h3 className='text-xs'>{new Date(item?.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}</h3>
                                </div>
                            </div>
                            <div>
                                <div>{item?.JobType}</div>
                            </div>
                        </div>)
                    } */}

                </div>

            </div>

            
            <Link href={'/Dashboard/ShowJobs'} className='text-center lg:hidden hover:bg-green-600 block w-full mx-auto shadow  py-1 rounded-lg cursor-pointer mt-4 bg-green-500 text-white'>
                View More
            </Link>

        </div>
    );
};

export default EmployerStaticPage;