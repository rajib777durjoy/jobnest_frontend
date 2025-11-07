'use client'

import useAxios_public from '@/Hook/useAxios_public';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AllJob = () => {
    const userData = useSelector(state => state?.user?.userData);
    const [Joblist, setJoblist] = useState([])
    const useAxios = useAxios_public();
    console.log('user data', userData)
    useEffect(() => {

        const handleGetTheJob = async () => {
            const res = await useAxios.get('/api/user/getJob')
            setJoblist(res.data);
        }
        handleGetTheJob()
    }, [])


    // const handleSearch=async()=>{
    //  const res= await useAxios.post('/api/user/searchJobs?jobs=frontend developer jobs');
    // }
    return (
        <div className='w-[100%]  min-h-screen bg-sky-50 py-10'>
            <div className='w-[90%] mx-auto'>
                <h1 className='text-4xl text-black font-bold text-center w-[100%] my-6'>Recent Job</h1>
            </div>
            <div className='w-[90%] mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    Joblist.map((item, ind) => (<div key={ind} className='shadow-md min-h-[200px] shadow-green-200 rounded-md flex flex-col justify-center px-4 '>
                        <div className=''>
                            <h2 className='my-2 capitalize font-bold'>{(item?.title).replace(":","").slice(0,20)}</h2>
                            <Link href={`${item?.link}`} className=''>Job Link:<span className='text-blue-400 underline '>{(item?.link).slice(0,25)}</span></Link>
                            <p className='mt-4'>Post_time:{(item?.snippet).split(".")[0]}</p>
                        </div>

                        <div className=' flex justify-between mt-5'>
                            <Link href={`${item?.link}`} target='_blank' ><button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Apply</button></Link>
                            <button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Share</button>

                        </div>
                    </div>))
                }

            </div>
        </div>
    );
};

export default AllJob;