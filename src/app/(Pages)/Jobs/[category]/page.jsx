

import axios from 'axios';
import Link from 'next/link';
import React from 'react';

const jobCategory = async ({ params }) => {
    const { category } = params;
    console.log(category)
    const { data } = await axios.get(`http://localhost:7000/api/user/category/?category=${category}`, { withCredentials: true,timeout: 5000,  headers: {
      'Cache-Control': 'max-age=300', 
    }, });

    const Jobs = data.items || []
    console.log(data.items)
    return (
        <div className='w-[90%] mx-auto min-h-screen '>
            <h1 className='text-center text-4xl mt-10 border-b pb-4'>{(category).replace("%20"," ")}</h1>
            <div className='w-[100%] grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-6'>
                {
                    Jobs.map((item, ind) => (<div key={ind} className='shadow-md h-[300px] shadow-green-200 rounded-md flex flex-col justify-center px-4 '>
                        <div className='h-[200px]'>
                            <h2 className='my-2 capitalize font-bold'>{(item?.title).replace(":","")}</h2>
                            <Link href={`${item?.link}`} className='flex flex-wrap'>Job Link:<span className='text-blue-400 underline '>{item?.link}</span></Link>
                            <Link href={`${item?.formattedUrl}`} className='flex flex-wrap'>Website:<span className='text-blue-400 underline '>{item?.formattedUrl}</span></Link>
                            <p>Post_time:{(item?.snippet).split(".")[0]}</p>
                        </div>

                        <div className=' flex justify-between '>
                            <Link href={`${item?.link}`} target='_blank' ><button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Apply</button></Link>
                            <button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Share</button>

                        </div>
                    </div>))
                }
            </div>
        </div>
    );
};

export default jobCategory;