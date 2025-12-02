'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import { FaPlus } from "react-icons/fa6";
import { IoEyeSharp, IoFilter } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { FaUsers } from "react-icons/fa";

const ManageJob = () => {
    const userData = useSelector(state => state.user?.userData);
    const useAxios = useAxios_public();
    const [searchText, setsearchText] = useState('');
    const [filter, setFilter] = useState('')
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1)
    const [Jobs, setJobs] = useState([])

    // useEffect(() => {
    //     console.log('filter:::', filter)
    //     const delayAction = setTimeout(() => {
    //         if (userData?.email) {
    //             useAxios
    //                 .get(`/api/employer/Joblist?search=${searchText}&&filter=${filter}&&page=${page}&&limit=${limit}`)
    //                 .then(res => {
    //                     console.log(res.data.data)
    //                     setJobs(res.data.data)
    //                     setPage(res.data.page);
    //                     setTotalPages(res.data.totalPages);
    //                 })
    //                 .catch(err => console.log(err));
    //         }
    //     }, 500); // server action after 500ms //

    //     return () => clearTimeout(delayAction);

    // }, [searchText, filter, page, userData?.email])


    const handleJobRemove = (id) => {

    }
    console.log('page', totalPages)
    return (
        <div className='w-full '>
            {/* Title section */}
            <div className='w-[92%] flex justify-between mx-auto  mb-10'>
                <div>
                    <h1 className='text-xl lg:text-2xl font-bold'>Job Management</h1>
                    <h3 className='text-xs lg:text-sm text-gray-400'>Manage your job postings and track applications</h3>
                </div>
                <Link href={'/Jobs/AddJob'}>
                    <button className='btn bg-green-600 hover:bg-green-800 py-3 px-4 flex items-center gap-2 rounded-lg text-md text-white'><FaPlus />Add New Job</button>
                </Link>
            </div>
            {/* Main section */}
            <div className='w-[92%] mx-auto  rounded-md shadow-lg shadow-gray-300 px-4 py-6 min-h-[200px]'>
                {/* search and filter part */}
                <div className='w-full flex justify-between '>
                    <div className='w-[70%] flex h-10 border px-2 items-center rounded-lg '>
                        < IoIosSearch className='text-xl' /><input value={searchText} onChange={(e) => setsearchText(e.target.value)} className='w-full border-0 outline-0  p-2' placeholder='Search Jobs..' type='text'></input>
                    </div>
                    <div>
                        <Select onValueChange={(value) => {
                            console.log(value)
                            setFilter(value)
                        }}>
                            <SelectTrigger className="w-[180px] flex items-center gap-2">
                                <IoFilter />
                                <SelectValue placeholder="Filter" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="experience-high">Experience (High → Low)</SelectItem>
                                <SelectItem value="experience-low">Experience (Low → High)</SelectItem>

                                <SelectItem value="company-az">Company Name (A → Z)</SelectItem>
                                <SelectItem value="company-za">Company Name (Z → A)</SelectItem>

                                <SelectItem value="recent">Most Recent Jobs</SelectItem>
                                <SelectItem value="oldest">Oldest Jobs</SelectItem>

                                <SelectItem value="title-az">Job Title (A → Z)</SelectItem>
                                <SelectItem value="title-za">Job Title (Z → A)</SelectItem>

                                <SelectItem value="remote">Remote Jobs Only</SelectItem>
                                <SelectItem value="onsite">Onsite Jobs Only</SelectItem>
                                <SelectItem value="hybrid">Hybrid Jobs Only</SelectItem>

                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='p-1'>
                    <span className='text-gray-500 text-sm '>Showing  {Jobs.length} jobs</span>
                </div>
                {/* Table part */}
                {/* {Jobs && <div className='hidden py-4 lg:block shadow  shadow-gray-500 rounded-md mt-10 overflow-x-scroll px-2'>
                    <Table className=''>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Id</TableHead>
                                <TableHead className='text-center'>Name</TableHead>
                                <TableHead className="text-center">JobTitle</TableHead>
                                <TableHead className=" flex justify-center items-center gap-2"><FaUsers className='text-lg' />Applicants</TableHead>
                                <TableHead className="">Details</TableHead>
                                <TableHead className="text-center">Remove</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {Jobs?.map((item, ind) => (
                                <TableRow key={ind}>
                                    <TableCell className="font-medium text-center">{item?.Job_id}</TableCell>
                                    <TableCell className='text-center'>{item?.companyName}</TableCell>
                                    <TableCell className="text-center">{item?.JobTitle}</TableCell>
                                    <TableCell className="flex items-center justify-center gap-2">{item?.applyCount > 1 && <FaUsers /> || item?.applyCount}</TableCell>
                                    <TableCell className=""><Link className=' hover:text-green-900 text-green-500 flex ps-4 ' href={`/AdminDashboard/AdminComponent/Details/${item?.Job_id}`}><IoEyeSharp className='text-2xl' /></Link></TableCell>
                                    <TableCell className="flex justify-center"><button onClick={() => handleJobRemove(item?.Job_id)} className=' hover:text-red-900 text-red-600 pt-2  flex justify-center'><MdDeleteForever className='text-2xl' /></button></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </div> || <span className='text-xl block text-gray-400 text-center mt-10'>No Available Applied Job</span>} */}
                <div className="flex gap-2 mt-4">
                    <span>Page {page} of {totalPages}</span>
                </div>
                <div className="flex items-center gap-4 justify-center">
                    {/* Prev Button */}
                    <button
                        onClick={() => setPage(page > 1 ? page - 1 : 1)}
                        className="px-3 border border-gray-300 rounded-md h-10"
                       
                    >
                        Prev
                    </button>

                    {/* Scrollable page buttons */}
                    <div className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-gray-400 max-w-[500px]">
                        {Array(totalPages).fill(0).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 min-w-[35px] rounded-md border border-gray-300 ${page === i + 1 ? 'bg-green-700 text-white' : 'bg-white text-gray-700 hover:bg-green-100'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => setPage(page < totalPages ? page + 1 : 1)}
                        className="px-3 border border-gray-300 rounded-md h-10"
                        
                    >
                        Next
                    </button>
                </div>





            </div>
        </div >
    );
};

export default ManageJob;