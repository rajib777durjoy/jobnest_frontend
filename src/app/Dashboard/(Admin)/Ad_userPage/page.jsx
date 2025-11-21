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
const Ad_userPage = () => {
     const useAxios = useAxios_public();
     const user= useSelector(state=>state.user?.userData);
     const {data:users=[]}=useQuery({
        queryKey:['user',user?.email],
        queryFn:async()=>{
         const res = await useAxios.get(`/api/admin/usersList/${user?.email}`)
        }
     })
    return (
        <div className='w-full min-h-screen'>
            {users && <div className='hidden py-4 lg:block shadow  shadow-gray-500 rounded-md mt-10 overflow-x-scroll px-2'>
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
                        {users.map((item, ind) => (
                            <TableRow key={ind}>
                                <TableCell className="font-medium text-center">{item.id}</TableCell>
                                {/* <TableCell className='text-center'>{item.fullName}</TableCell>
                                <TableCell className='text-center'>{item.email}</TableCell>
                                <TableCell className="text-center">{item.JobTitle}</TableCell>
                                <TableCell className="text-center">{item.JobType}</TableCell>
                                <TableCell className="text-center flex items-center justify-center"><Link className=' hover:text-green-400  text-xl' href={`/Dashboard/ApplyDetails/${item?.Apply_id}`}><IoEyeSharp /></Link></TableCell> */}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div> || <span className='text-xl block text-gray-400 text-center mt-10'>No Available Save Job</span>}
        </div>
    );
};

export default Ad_userPage;