'use client'
import TitlePage from '@/Hook/TitlePage';
import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ReleventJobs = () => {
    const useAxios= useAxios_public();
    const {data:jobs={}}=useQuery({
        queryKey:['relevantData'],
        queryFn:async()=>{
         const res = await useAxios.get(`/api/Jobs/relevantJobs`);
          return res.data ;
        }
    })
   console.log(jobs) 
    return (
        <div>
            <TitlePage ></TitlePage>
        </div>
    );
};

export default ReleventJobs;