'use client'

import TitlePage from '@/Hook/TitlePage';
import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ReleventJobs = () => {
  const axiosPublic = useAxios_public();
  const [index, setIndex] = useState(0);
  const user = useSelector(state=>state.user?.userData);
  // console.log('user info::',user?.id)
  const { data: jobs = [] } = useQuery({
    queryKey: ['relevantData'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/Jobs/relevantJobs`);
      return res.data;
    },
  });
  const handleSaveJob=async(Job_id)=>{
  const data= {Job_id,user_id:user?.id}
  const res = await axiosPublic.post(`/api/Jobs/savejob`,data);
  // console.log('ress::',res.data)
  }
// console.log('relevantJobs',jobs)
  return (
    <div className="min-h-screen bg-gray-50">
      <TitlePage title={'Recommended Jobs for You'} subTitle={'Smarter job suggestions tailored to your professional background'} />

      {jobs?.length > 0 ? (
        <div className="w-full mt-10 flex gap-6 px-4">
          {/* LEFT SIDEBAR */}
          <div className="w-[22%] h-[90vh] bg-white shadow rounded-xl overflow-y-auto p-4 border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Relevant Jobs
            </h2>

            {jobs.map((job, ind) => (
              <div
                key={ind}
                className={`px-4 rounded-lg mb-3 cursor-pointer transition border 
                  ${index === ind ? ' hover:bg-green-600 hover:text-white' : 'hover:bg-gray-100'}
                `}
                onClick={() => setIndex(ind)}
              >
                <h1 className="text-lg font-medium">{job?.companyName}</h1>
                <p className="text-sm opacity-80">{job?.JobTitle}</p>
              </div>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-[75%] bg-white shadow rounded-xl p-8 border h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <Link href={`${jobs[index]?.webLink}`} target='_blank'><h1
                className="text-3xl font-bold text-gray-900 cursor-pointer hover:underline hover:text-green-600 transition"
                
              >
                {jobs[index]?.companyName}
              </h1></Link>
              <p className="text-gray-600 mt-2">{jobs[index]?.email}</p>
            </div>

            <div className="space-y-3 text-gray-700">
              <div>
                <span className="font-semibold">Job Title:</span> {jobs[index]?.JobTitle}
              </div>
              <div>
                <span className="font-semibold">Company Website:</span>{' '}
                <span
                  className="text-green-600 underline cursor-pointer"
                  onClick={() => router.push(jobs[index]?.webLink)}
                >
                  {jobs[index]?.webLink}
                </span>
              </div>
              <div>
                <span className="font-semibold">Location:</span> {jobs[index]?.location}
              </div>
              <div>
                <span className="font-semibold">Job Type:</span> {jobs[index]?.JobType}
              </div>
              <div>
                <span className="font-semibold">Salary:</span> {jobs[index]?.salary} BDT
              </div>
              <div>
                <span className="font-semibold">Deadline:</span> {jobs[index]?.deadline}
              </div>

              {/* Button Is (Apply and Save)  */}
              <div className='w-full flex gap-36 items-center  '>
                <Link href={`/Dashboard/ApplyForm/${jobs[index]?.Job_id}`}><h1 className='font-medium bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded-md'>Apply</h1></Link>
                <h1 onClick={()=>handleSaveJob(jobs[index]?.Job_id)} className='font-medium border hover:outline-1 px-4 py-2 hover:font-bold  text-green-700 hover:text-green-800 rounded-lg'>Save </h1>
              </div>

              <div className="pt-4 border-t mt-4">
                <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                <p className="leading-7 text-gray-800">{jobs[index]?.description}</p>
              </div>
              
            </div>
          </div>
        </div>
      ) : (
        <span className="text-xl block text-gray-400 text-center mt-10">
          No Available Relevant Job
        </span>
      )}
    </div>
  );
};

export default ReleventJobs;
