'use client'

import React, { useEffect } from 'react';
import HeadingPage from './HeadingPage';
import useAxios_public from '@/Hook/useAxios_public';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/Redux/userSlice';

const HomePage = () => {
    const description = `JobNest is a modern job aggregator platform that helps users easily find the most recent and relevant job postings based on their profiles and preferences.Our system automatically collects jobs from multiple trusted sources while filtering out duplicates and fake job listings — ensuring you only see genuine, high-quality opportunities.
    To get started, users must sign up and create a profile, which includes their skills, experience, and career interests. This allows JobNest's recommendation engine to deliver personalized job matches and help HR professionals reach the right candidates faster.`
    const subtitle = 'Find recent and relevant jobs, connect directly with HRs'
   const axiosPublic= useAxios_public();
   const dispatch =useDispatch();
   useEffect(()=>{
    const current_user=async()=>{
     const getUser =await axiosPublic.get('/api/user/currentUser');
    //  console.log('current user::',getUser?.data)
     dispatch(setUserData(getUser?.data))
    }
    current_user()
   },[])
    return (
        <div className='w-[100%] bg-[url("/AiHelp2.jpg")] bg-no-repeat bg-cover min-h-screen'>
            <div className='w-[100%] h-[80px]'></div>
            <div className='w-[90%] mx-auto'>
                <HeadingPage title={'Find recent and relevant jobs'} subtitle={'Discover your dream job and reach HRs effortlessly, all in one place'} description={description}></HeadingPage>
            </div>
        </div>
    );
};

export default HomePage;