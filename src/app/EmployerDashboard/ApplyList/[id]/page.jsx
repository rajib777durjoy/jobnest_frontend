'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const ApplyDetails = () => {
    const { id } = useParams();
    // console.log(id)
    const useAxios = useAxios_public();
    const { data: ApplyData = [],refetch,isPending } = useQuery({
        queryKey: ['applyData', id],
        queryFn: async () => {
            const res = await useAxios.get(`/api/employer/applyJobDetails/${id}`);
            return res.data;
        }
    })
    if(isPending){
        return <div>Loading ...</div>
    }
    return (
        <div className="min-h-screen w-full bg-gray-100 py-10">
            {
                ApplyData?.map((job, ind) => <div key={ind} className="w-[90%] mx-auto bg-white shadow-md rounded-xl p-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                        <div>
                            <h1 className='text-xl lg:text-3xl font-bold px-2 capitalize'>{job?.JobTitle}</h1>
                        </div>
                        <Link href={'/EmployerDashboard/ApplyList'}><button className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg shadow">
                            Back
                        </button></Link>
                    </div>

                    {/* Job Badges */}
                    <div className="flex flex-wrap gap-3 mt-5">
                        <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">{job?.JobType}</span>

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
                            <h2 className="text-lg font-semibold ">{job?.loaction}</h2>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500">Phone</p>
                            <h2 className="text-lg font-semibold">{job?.phone}</h2>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500">Working Time</p>
                            <h2 className="text-lg font-semibold">{job?.working_time || 'Undefind'}</h2>
                        </div>
                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm ">
                            <p className="text-sm text-gray-500">Resume PDF</p>
                            <Link href={job?.resume} target='_blank' ><h2 className="text-lg font-semibold">{(job?.resume).slice(0, 50)}</h2></Link>

                        </div>
                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500 py-2">Requset</p>
                            <Select className='text-center' value={job?.status} onValueChange={async(value) => {
                            //    console.log('hello world ',value)
                               const res = await useAxios.patch(`/api/employer/updateStatus/${value}/${job?.Apply_id}`)
                               if(res.data.message === 'update successfull'){
                                 refetch()
                               }
                               
                            }}  >
                                <SelectTrigger className="w-[180px]" disabled={job?.status === "Accept" || job?.status === 'Reject'}  >
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Reject">Reject</SelectItem>
                                    <SelectItem value="Accept">Accept</SelectItem>
                                    <SelectItem value="Panding">Panding</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mt-10">
                        <h2 className="text-xl font-bold text-gray-800">Job Description</h2>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            {job?.description}
                        </p>
                    </div>


                </div>)
            }

        </div>
    );
};

export default ApplyDetails;