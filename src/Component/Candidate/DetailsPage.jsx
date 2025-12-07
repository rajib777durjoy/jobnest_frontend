'use client'

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import useAxios_public from '@/Hook/useAxios_public';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFilePdf, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';

const DetailsPage = ({ id }) => {
    const useAxios = useAxios_public();
    const [jobDetails, setJobDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const res = await useAxios.get(`/api/Jobs/applyDetails/${id}`);
                // console.log('JObDetails', res.data[0])
                setJobDetails(res.data[0]);
            }
        };
        fetchData();
    }, [id]);


    return (
        <div className="w-full min-h-screen py-10 px-2 md:px-12 lg:px-24">
            <div key={jobDetails?.Apply_id} className="mb-10">
                {/* Header Section */}
                <div className="bg-green-600 text-white rounded-2xl shadow-lg p-8 mb-8 text-center">
                    <h1 className="text-xl lg:text-3xl md:text-4xl font-bold mb-2 capitalize">{jobDetails?.JobTitle}</h1>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <p className="flex items-center gap-2 text-md lg:text-lg">
                            <FaBriefcase /> {jobDetails?.JobType}
                        </p>
                        <p className="flex items-center gap-2 text-md lg:text-lg">
                            <FaMoneyBillWave /> {jobDetails?.salary} BDT/month
                        </p>
                    </div>
                </div>

                {/* Candidate Info Form */}
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-10  mb-8">
                    <h2 className="text-lg lg:text-2xl font-semibold mb-6 text-gray-800 border-b pb-3 flex justify-between">Applicant Information <DropdownMenu className='w-[400px]'>
                        <DropdownMenuTrigger>...</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                        <p><span className="font-semibold">Full Name:</span> {jobDetails?.fullName}</p>
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-green-600" /> {jobDetails?.email}
                        </p>
                        <p className="flex items-center gap-2">
                            <FaPhone className="text-green-600" /> {jobDetails?.phone}
                        </p>
                        <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-green-600" /> {jobDetails?.loaction}
                        </p>
                        <p><span className="font-semibold">Applied On:</span> {new Date(jobDetails?.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="mt-6">
                        <a
                            href={jobDetails?.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium shadow transition"
                        >
                            <FaFilePdf /> View Resume
                        </a>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
                    <h2 className="text-lg lg:text-2xl font-semibold mb-4 text-gray-800">Applicant's Message</h2>
                    <p className=" text-xs lg:text-md text-gray-700 leading-relaxed">{jobDetails?.description}</p>
                </div>
            </div>

        </div>
    );
}


export default DetailsPage;
