'use client'
import React, { useEffect, useState } from 'react';
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
import Link from 'next/link';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";

const StaticPage = () => {
    const userData = useSelector(state => state.user?.userData);
    const useAxios = useAxios_public();
    const [ApplyJobs, setApplyJobs] = useState([]);
    useEffect(() => {
        const Get_recent_job = async () => {
            const res = await useAxios.get(`/api/Jobs/Apply_jobs/${userData?.email}`);
            console.log('jobs::', res.data);
            setApplyJobs(res?.data)

        }
        Get_recent_job();
    }, [userData?.email])
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

            {ApplyJobs && <div className='hidden lg:block shadow  shadow-gray-500 rounded-md mt-10 overflow-x-scroll px-2'>
                <Table className=''>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Id</TableHead>
                            <TableHead className='text-center'>Name</TableHead>
                            <TableHead className='text-center'>Email</TableHead>
                            <TableHead className="text-center">JobTitle</TableHead>
                            <TableHead className="text-center">JobType</TableHead>
                            <TableHead className="text-center">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {ApplyJobs.map((item, ind) => (
                            <TableRow key={ind}>
                                <TableCell className="font-medium text-center">{item.Apply_id}</TableCell>
                                <TableCell className='text-center'>{item.fullName}</TableCell>
                                <TableCell className='text-center'>{item.email}</TableCell>
                                <TableCell className="text-center">{item.JobTitle}</TableCell>
                                <TableCell className="text-center">{item.JobType}</TableCell>
                                <TableCell className="text-center flex items-center justify-center"><Link className=' hover:text-green-400  text-xl' href={`/Dashboard/ApplyDetails/${item?.Apply_id}`}><IoEyeSharp /></Link></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} >Total</TableCell>
                            <TableCell className="text-center">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
                <Link href={'/Dashboard/ShowJobs'} className='text-center hover:bg-green-600 block w-[20%] mx-auto shadow  py-1 rounded-lg cursor-pointer mt-4 bg-green-500 text-white'>
                    View More
                </Link>
            </div> || <span className='text-xl block text-gray-400 text-center mt-10'>No Available Applied Job</span>}

            <div className='w-full grid md:grid-cols-2 gap-4 mt-4 lg:hidden '>
                {
                    ApplyJobs && ApplyJobs.map((item, ind) => (<div
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

                        {/* Bottom Button */}
                        {/* <div className="mt-6">
                            <Link href={`/Jobs/Details/${item?.Job_id}`}>
                                <button className="btn btn-success w-full text-black bg-green-500 rounded-md py-1 hover:bg-green-600 font-semibold">
                                    View Details
                                </button>
                            </Link>
                        </div> */}
                    </div>)) || <span className='text-xl block text-gray-400 text-center mt-10'>No Available Applied Job</span>
                }
            </div>
            <Link href={'/Dashboard/ShowJobs'} className='text-center lg:hidden hover:bg-green-600 block w-[20%] mx-auto shadow  py-1 rounded-lg cursor-pointer mt-4 bg-green-500 text-white'>
                View More
            </Link>

        </div>
    );
};

export default StaticPage;