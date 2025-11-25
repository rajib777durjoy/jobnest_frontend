'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { MdDeleteForever } from "react-icons/md";

const AllJob = () => {
    const userData = useSelector(state => state.user?.userData);
    const useAxios = useAxios_public();
    const [status, setStatus] = useState("");
    const [Job_id, setJobId] = useState(0)
    const { data: jobs = [], isPending, refetch } = useQuery({
        queryKey: ['jobs', userData?.email],
        queryFn: async () => {
            const res = await useAxios.get(`/api/admin/Alljob`);
            return res.data;
        }
    })
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

    const handleJobRemove = async (Job_id) => {
        const data = { email: userData?.email }
        if (data?.email) {
            const res = await useAxios.delete(`/api/admin/JobDelete/${Job_id}`, { data });
            console.log(res.data?.message);
            if (res.data?.message === 'Job deleted successfully') {
                refetch()
            }
        }
    }
    if (isPending) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className='text-xl lg:text-4xl font-bold '>Job Management</div>
            <h1 className='text-md text-gray-400'>View all job postings and monitor their status.</h1>
            {jobs && <div className='hidden py-4 lg:block shadow  shadow-gray-500 rounded-md mt-10 overflow-x-scroll px-2'>
                <Table className=''>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Id</TableHead>
                            <TableHead className='text-center'>Name</TableHead>
                            <TableHead className="text-center">JobTitle</TableHead>
                            <TableHead className="">JobType</TableHead>
                            <TableHead className="">Details</TableHead>
                            <TableHead className="text-center">Remove</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {jobs?.map((item, ind) => (
                            <TableRow key={ind}>
                                <TableCell className="font-medium text-center">{item?.Job_id}</TableCell>
                                <TableCell className='text-center'>{item?.companyName}</TableCell>
                                <TableCell className="text-center">{item?.JobTitle}</TableCell>
                                <TableCell className="text-center mx-auto"><Select className='text-center' value={item?.status} onValueChange={(value) => {
                                    setStatus(value)
                                    setJobId(item?.Job_id)
                                }}  >
                                    <SelectTrigger className="w-[180px]" disabled={item?.status === "Accept" || item?.status === 'Reject'}  >
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Reject">Reject</SelectItem>
                                        <SelectItem value="Accept">Accept</SelectItem>
                                        <SelectItem value="Panding">Panding</SelectItem>
                                    </SelectContent>
                                </Select></TableCell>
                                <TableCell className=""><Link className=' hover:text-green-900 text-green-500 flex ps-4 ' href={`/Dashboard/ApplyDetails/${item?.Job_id}`}><IoEyeSharp className='text-2xl' /></Link></TableCell>
                                <TableCell className="flex justify-center"><button onClick={() => handleJobRemove(item?.Job_id)} className=' hover:text-red-900 text-red-600 pt-2  flex justify-center'><MdDeleteForever className='text-2xl' /></button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                
            </div> || <span className='text-xl block text-gray-400 text-center mt-10'>No Available Applied Job</span>}
        </div>
    );
};

export default AllJob;