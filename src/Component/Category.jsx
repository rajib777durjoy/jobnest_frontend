'use client'
import React from 'react';
import { FaLaptopCode } from "react-icons/fa";
import { IoPulseOutline } from "react-icons/io5";
import { SiTaichigraphics } from "react-icons/si";
import { MdDataSaverOff } from "react-icons/md";
import { SiUbiquiti } from "react-icons/si";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Category = () => {
    const router= useRouter()
    return (
        <div className='w-[100%] min-h-screen bg-sky-50 py-10 '>
            <div className='w-[90%] mx-auto'>
                <h1 className='text-4xl text-black font-bold text-center w-[100%] my-10'>Category</h1>
            </div>
            <div className='w-[90%] mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <div className='shadow-md h-[200px] shadow-green-200 rounded-md flex flex-col justify-center items-center'>
                    <div>
                        <FaLaptopCode className='text-6xl text-green-400' />
                    </div>
                    <h2 className='my-2'>Web developer</h2>
                    <div className='mt-2'>
                        <Link href={`/Jobs/${'Web developer'}`}><button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Explore</button></Link>
                    </div>
                </div>
                <div className='shadow-md h-[200px] shadow-green-200 rounded-md flex flex-col justify-center items-center'>
                    <div>
                        <IoPulseOutline  className='text-6xl text-green-400' />
                    </div>
                    <h2 className='my-2'>SEO Expert</h2>
                    <div className='mt-2'>
                        <button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Explore</button>
                    </div>
                </div>
                <div className='shadow-md h-[200px] shadow-green-200 rounded-md flex flex-col justify-center items-center'>
                    <div>
                        <SiTaichigraphics className='text-6xl text-green-400' />
                    </div>
                    <h2 className='my-2'>Graphic design</h2>
                    <div className='mt-2'>
                        <button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Explore</button>
                    </div>
                </div>
                <div className='shadow-md h-[200px] shadow-green-200 rounded-md flex flex-col justify-center items-center'>
                    <div>
                        <MdDataSaverOff className='text-6xl text-green-400' />
                    </div>
                    <h2 className='my-2'>Data Science</h2>
                    <div className='mt-2'>
                        <button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Explore</button>
                    </div>
                </div>
                <div className='shadow-md h-[200px] shadow-green-200 rounded-md flex flex-col justify-center items-center'>
                    <div>
                        <SiUbiquiti className='text-6xl text-green-400' />
                    </div>
                    <h2 className='my-2'>UX UI Designer</h2>
                    <div className='mt-2'>
                        <button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Explore</button>
                    </div>
                </div>
                <div className='shadow-md h-[200px] shadow-green-200 rounded-md flex flex-col justify-center items-center'>
                    <div>
                        <FaLaptopCode className='text-6xl text-green-400' />
                    </div>
                    <h2 className='my-2'>Web developer</h2>
                    <div className='mt-2'>
                        <button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Explore</button>
                    </div>
                </div>
                <div className='shadow-md h-[200px] shadow-green-200 rounded-md flex flex-col justify-center items-center'>
                    <div>
                        <FaLaptopCode className='text-6xl text-green-400' />
                    </div>
                    <h2 className='my-2'>Web developer</h2>
                    <div className='mt-2'>
                        <button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Explore</button>
                    </div>
                </div>
                <div className='shadow-md h-[200px] shadow-green-200 rounded-md flex flex-col justify-center items-center'>
                    <div>
                        <FaLaptopCode className='text-6xl text-green-400' />
                    </div>
                    <h2 className='my-2'>Web developer</h2>
                    <div className='mt-2'>
                        <button className='px-6 bg-green-500 font-medium text-white hover:bg-green-600 border rounded-md py-1'>Explore</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;