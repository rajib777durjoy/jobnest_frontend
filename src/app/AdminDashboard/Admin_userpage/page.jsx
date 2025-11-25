'use client'

import React from 'react';
import {
    Table,
    TableBody,

    TableCell,

    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { IoEyeSharp } from 'react-icons/io5';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
const Admin_userpage = () => {
    const useAxios = useAxios_public();
    const user = useSelector(state => state.user?.userData);
    const { data: users = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await useAxios.get(`/api/admin/usersList/${user?.email}`)
            return res.data;
        }
    })
    console.log('user admin::', users)
    return (
        <div className='w-full min-h-screen'>
            {users && <div className='hidden py-4 text-black lg:block shadow  shadow-gray-500 rounded-md mt-10 overflow-x-scroll px-2'>
                <Table className=''>
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
                        {users?.map((item, ind) => (
                            <TableRow key={ind}>
                                <TableCell className="font-medium text-center">{item.id}</TableCell>
                                <TableCell className='text-center'>{item.name}</TableCell>
                                <TableCell className='text-center'>{item.email}</TableCell>
                                <TableCell className="text-center">{item.title}</TableCell>
                                <TableCell className="text-center">{item.JobType}</TableCell>
                                <TableCell className="text-center flex items-center justify-center"><Link className=' hover:text-green-400  text-xl' href={`/userDetails/${item?.id}`}><IoEyeSharp /></Link></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div> || <span className='text-xl block text-black  text-center mt-10'>No Available Save Job</span>}
            <div className='w-full grid md:grid-cols-2 gap-4 mt-4 lg:hidden '>
                {
                    users && users?.map((item, ind) => (<div
                        key={ind}
                        className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-100 p-6 flex flex-col justify-between"
                    >
                        {/* Top Section */}
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600 flex items-center gap-1">
                                    <FaBriefcase /> {item.fullName || 'N/A'}
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <MdDelete className='text-2xl text-black' />
                                </span>
                            </div>

                            <h2 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
                                {item?.name || 'Untitled Job'}
                            </h2>

                            <p className="text-gray-500 mt-2 text-sm leading-relaxed line-clamp-3">
                                {item.email || 'No description provided.'}
                            </p>
                        </div>


                        <div className="mt-5 space-y-2 text-sm text-gray-700">
                            <p className="flex items-center gap-2">
                                {item?.title || 'Company not specified'}
                            </p>
                            <p className="flex items-center gap-2">
                                {item?.description || 'Location not mentioned'}
                            </p>
                            {/* <p className="flex items-center gap-2">
                                <FaMoneyBillWave className="text-yellow-600" />
                                {item?.salary ? `${item.salary} BDT` : 'Negotiable'}
                            </p> */}
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
            <Link href={'/Dashboard/ShowJobs'} className='text-center lg:hidden hover:bg-green-600 block w-full mx-auto shadow  py-1 rounded-lg cursor-pointer mt-4 bg-green-500 text-white'>
                View More
            </Link>
        </div>
    );
};

export default Admin_userpage;