'use client'
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
const AdminStaticPage = () => {
    const userData = useSelector(state => state.user?.userData);
    const useAxios = useAxios_public();
    const [status, setStatus] = useState("");
    const [Job_id, setJobId] = useState(0)
    const { data: jobs = [], isLoading, refetch } = useQuery({
        queryKey: ['jobs', userData?.email],
        queryFn: async () => {
            const res = await useAxios.get(`/api/admin/postjobs`);
            return res.data;
        }
    })

    const {data:Application=[]}=useQuery({
        queryKey:['application',userData?.email],
        queryFn:async()=>{
            const res = await useAxios.get('/api/admin/applications');
           return res.data;
        }
    })
    // console.log('josdfdslfjdsf', jobs)
    // console.log('applicafjosdre:',Application)

    const { data: update = [""] } = useQuery({
        queryKey: ['status', status],
        queryFn: async () => {
            const res = await useAxios.patch(`/api/admin/update_status/${Job_id}?status=${status}`);
            if (res.data?.message === 'update successfull') {
                refetch();
                return res.data?.message;
            }
        }
    })

    // console.log('update::', update)
    if (isLoading) {
        return <div>Loading....</div>
    }
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
                        jobs?.map((item, ind) => <div key={ind} className='w-full h-[70px] my-4 flex items-center justify-between px-5  rounded-md shadow  shadow-green-500 '>
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
                    {
                        Application?.map((item, ind) => <div key={ind} className='w-full h-[70px] my-4 flex items-center justify-between px-5  rounded-md shadow  shadow-green-500 '>
                            <div className='flex items-center gap-2'>
                                {/* <span>{item?.logo || 'Logo'}</span> */}
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
                    }

                </div>

            </div>

            <div className='w-full grid md:grid-cols-2 gap-4 mt-4 lg:hidden '>
                {
                    jobs && jobs.map((item, ind) => (<div
                        key={ind}
                        className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-100 p-6 flex flex-col justify-between"
                    >
                        {/* Top Section */}
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600 flex items-center gap-1">
                                    <FaBriefcase /> {item?.JobType || 'N/A'}
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <MdDelete className='text-2xl text-black' />
                                </span>
                            </div>

                            <h2 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
                                {item?.JobTitle || 'Untitled Job'}
                            </h2>

                            <p className="text-gray-500 mt-2 text-sm leading-relaxed line-clamp-3">
                                {item?.description || 'No description provided.'}
                            </p>
                        </div>


                        <div className="mt-5 space-y-2 text-sm text-gray-700">
                            <p className="flex items-center gap-2">
                                <FaBuilding className="text-green-600" />
                                {item?.companyName || 'Company not specified'}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-sky-600" />
                                {item?.location || 'Location not mentioned'}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMoneyBillWave className="text-yellow-600" />
                                {item?.salary ? `${item.salary} BDT` : 'Negotiable'}
                            </p>
                        </div>
                    </div>)) || <span className='text-xl block text-gray-400 text-center mt-10'>No Available Applied Job</span>
                }
            </div>
            <Link href={'/Dashboard/ShowJobs'} className='text-center lg:hidden hover:bg-green-600 block w-full mx-auto shadow  py-1 rounded-lg cursor-pointer mt-4 bg-green-500 text-white'>
                View More
            </Link>

        </div>
    );
};

export default AdminStaticPage;