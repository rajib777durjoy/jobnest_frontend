'use client'

import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

const JobDetails = () => {
    const { id } = useParams();
    const pathName = usePathname();
    // console.log("pathname::", pathName)
    // console.log(id)
    const useAxios = useAxios_public()
    const { data: Jobs = [], isPending } = useQuery({
        queryKey: ['Jobs', id],
        queryFn: async () => {
            const res = await useAxios.get(`/api/admin/JobDetails/${id}`);
            // console.log(res.data)
            return res.data;
        }
    })
    if (isPending) {
        return <div>Loading ...</div>
    }
    return (
        <div className="min-h-screen w-full bg-gray-100 py-10">
            {
                Jobs?.map((job, ind) => <div key={ind} className="w-[90%] mx-auto bg-white shadow-md rounded-xl p-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                        <div className="flex items-center gap-4">
                            <img
                                src={job?.logo}
                                alt="Company Logo"
                                className="w-20 h-20 object-cover rounded-xl"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{job?.JobTitle}</h1>
                                <p className="text-gray-600">{job?.companyName}</p>
                            </div>
                        </div>

                        <Link href={'/AdminDashboard/AdminComponent/AllJob'}><button className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg shadow">
                            Back 
                        </button></Link>
                    </div>

                    {/* Job Badges */}
                    <div className="flex flex-wrap gap-3 mt-5">
                        <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">{job?.JobType}</span>
                        <Link href={job?.webLink} target='_blank'><span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">{job?.webLink}</span></Link>
                        <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">{job?.email}</span>
                    </div>

                    {/* Job Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500">Salary</p>
                            <h2 className="text-lg font-semibold">${job?.salary} / year</h2>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500">Location</p>
                            <h2 className="text-lg font-semibold">{job?.location}</h2>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500">Experience</p>
                            <h2 className="text-lg font-semibold">{job?.experience}</h2>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500">Deadline</p>
                            <h2 className="text-lg font-semibold">{job?.deadline}</h2>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mt-10">
                        <h2 className="text-xl font-bold text-gray-800">Job Description</h2>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            {job?.description}
                        </p>
                    </div>

                    {/* Requirements */}
                    <div className="mt-10">
                        <h2 className="text-xl font-bold text-gray-800">Requirements</h2>
                        <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                            {
                              job?.requirement.split(/[,.\n]+/).map((item,ind)=><li key={ind}>{item}</li>)
                            }
                            {/* <li>Strong knowledge of JavaScript (ES6+)</li>
                            <li>Experience with React.js and Node.js</li>
                            <li>Familiar with MongoDB and Express.js</li>
                            <li>Good understanding of REST APIs</li>
                            <li>Ability to write clean and maintainable code</li> */}
                        </ul>
                    </div>

                    {/* Responsibilities */}
                    <div className="mt-10">
                        <h2 className="text-xl font-bold text-gray-800">Responsibilities</h2>
                        <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-2">
                             {
                              job?.responsibility.split(/[,.\n]+/).map((item,ind)=><li key={ind}>{item}</li>)
                            }
                            {/* <li>Develop and maintain web applications</li>
                            <li>Collaborate with designers & backend developers</li>
                            <li>Debug, fix bugs, and optimize performance</li>
                            <li>Write efficient and reusable code</li> */}
                        </ul>
                    </div>

                    {/* Apply Button Bottom */}
                    <div className="mt-10 text-center">
                        <button className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-3 rounded-lg text-lg shadow">
                            Apply Now
                        </button>
                    </div>

                </div>)
            }

        </div>
    );
};

export default JobDetails;