'use client'
import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { MdDeleteForever } from "react-icons/md";
import { IoEyeSharp } from 'react-icons/io5';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import Swal from 'sweetalert2';

const ApplyList = () => {
    const userData = useSelector(state => state.user?.userData);
    const useAxios = useAxios_public();
    const { data: ApplyData = [], refetch } = useQuery({
        queryKey: ['applyData', userData?.email],
        queryFn: async () => {
            const res = await useAxios.get(`/api/employer/applyJoblist/${userData?.email}`);
            return res.data;
        }
    })
    const handleApplyRemove = async (apply_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await useAxios.delete(`/api/employer/applyjobRemove/${apply_id}`);
                if (res.data.message === 'delete successfull') {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                    refetch()
                }
                
            }
        });

    }
    console.log('apply data::', ApplyData)
    return (
        <div>
            <div className='text-xl lg:text-4xl font-bold '>Job Management</div>
            <h1 className='text-md text-gray-400'>View all job postings and monitor their status.</h1>
            {ApplyData && <div className='hidden py-4 lg:block shadow  shadow-gray-500 rounded-md mt-10 overflow-x-scroll px-2'>
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
                        {ApplyData?.map((item, ind) => (
                            <TableRow key={ind}>
                                <TableCell className="font-medium text-center">{item?.Job_id}</TableCell>
                                <TableCell className='text-center'>{item?.fullName}</TableCell>
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
                                <TableCell className=""><Link className=' hover:text-green-900 text-green-500 flex ps-4 ' href={`/EmployerDashboard/ApplyList/${item?.Apply_id}`}><IoEyeSharp className='text-2xl' /></Link></TableCell>
                                <TableCell className="flex justify-center"><button onClick={() => handleApplyRemove(item?.Apply_id)} className=' hover:text-red-900 text-red-600 pt-2  flex justify-center'><MdDeleteForever className='text-2xl' /></button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

            </div> || <span className='text-xl block text-gray-400 text-center mt-10'>No Available Applied Job</span>}
        </div>
    );
};

export default ApplyList;