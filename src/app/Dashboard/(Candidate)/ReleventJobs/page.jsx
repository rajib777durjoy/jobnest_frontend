'use client'

import TitlePage from '@/Hook/TitlePage';
import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";

import React, { useState } from 'react';

const ReleventJobs = () => {
    const useAxios = useAxios_public();
    const [index,setIndex]=useState(0)
    const { data: jobs = [] } = useQuery({
        queryKey: ['relevantData'],
        queryFn: async () => {
            const res = await useAxios.get(`/api/Jobs/relevantJobs`);
            return res.data;
        }
    })
    console.log(jobs)
    return (
        <div>
            <TitlePage ></TitlePage>
            {
                jobs&&  <div className="w-full flex justify-between mt-10">
                <div className="w-[20%] border border-amber-300 h-screen overflow-y-scroll">
                 {jobs.map((job,ind)=>(<div className='w-[90%] mx-auto border-amber-400 border my-5'>
                    <h1 className='text-xl text-black'>{job.companyName}</h1>
                 </div>))}
                </div>
                <div className="w-[75%] border border-red-500 h-screen  ">

                </div>
            </div> || <span className='text-xl block text-gray-400 text-center mt-10'>No Available Relevent Job</span>
            }
           

        </div>
    );
};

export default ReleventJobs;