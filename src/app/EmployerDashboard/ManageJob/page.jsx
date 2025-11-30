'use client'

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { FaPlus } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
const ManageJob = () => {
    return (
        <div className='w-full '>
            <div className='w-[90%] flex justify-between mx-auto  mb-10'>
                <div>
                    <h1 className='text-xl lg:text-2xl font-bold'>Job Management</h1>
                    <h3 className='text-xs lg:text-sm text-gray-400'>Manage your job postings and track applications</h3>
                </div>
                <Link href={'/Jobs/AddJob'}>
                    <button className='btn bg-green-600 hover:bg-green-800 py-3 px-4 flex items-center gap-2 rounded-lg text-md text-white'><FaPlus />Add New Job</button>
                </Link>
            </div>
            <div className='w-[90%] mx-auto flex justify-between items-center my-5'>
                <div className='w-[70%]'>
                    <Input className='w-full' type='text'></Input>
                </div>
                <div>
                    <Select onValueChange={(value) => console.log(value)}>
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
        </div >
    );
};

export default ManageJob;