'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAxios_public from '@/Hook/useAxios_public';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@/Redux/userSlice';
import Image from 'next/image';
const Navbar = () => {
    const router = useRouter();
    const axiosPublic = useAxios_public();
    const userData = useSelector(state => state.user?.userData);
    const dispatch = useDispatch()
    console.log("user from redux", userData);
   const handleSingout = async () => {
        const res = await axiosPublic.post(`/api/signOut/${userData?.email}`,{});
        // console.log('signout::', res?.data?.message)
        if(res.data?.message){
          dispatch(setUserData(null))
         return router.push('/');
        }
       
    }
 useEffect(()=>{
    const current_user=async()=>{
         const getUser =await axiosPublic.get('/api/user/currentUser');
        //  console.log('current user::',getUser?.data)
         dispatch(setUserData(getUser?.data))
        }
        current_user()
 },[])
    return (
        <div className='w-[90%]  mx-auto h-[70px] flex items-center justify-between bg-transparent'>
            {/* icon */}
            <div className='flex flex-col items-center hover:text-[#10B981]'>
                <img src={'/job-offer.png'} alt="logo" className='w-[35px] h-[35px]' />
                <h1 className='text-md font-bold'>Job<span>Nest</span></h1>
            </div>
           
            {/* End position */}
            <div>
                {userData && <div className='flex items-center justify-between gap-2'><span><img src={userData?.profile} className='w-[40px] h-[40px] rounded-full' alt='image' /></span>
                <span className='bg-[#10B981] text-black font-medium cursor-pointer rounded-md py-2 px-4 hover:text-white hover:bg-green-900' onClick={handleSingout}>Signout</span>
                </div> || <div  className='flex justify-between gap-2'>
                    <span className='text-black bg-[#10B981] font-medium cursor-pointer rounded-md py-2 px-4 hover:text-white hover:bg-green-900 'onClick={()=>router.push('/SignIn')} >signIn</span>
                    <span className='text-black bg-[#10B981] font-medium cursor-pointer rounded-md py-2 px-4 hover:text-white hover:bg-green-900 'onClick={()=>router.push('/SignUp')} >signUp</span>
                </div>
                }
            </div>

        </div>
    );
};

export default Navbar;