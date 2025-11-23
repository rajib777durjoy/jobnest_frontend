'use client'

import StaticPage from "@/Component/Candidate/StaticPage";
import { useSelector } from "react-redux";


const DashboardHome =() => {
 const userData = useSelector(state => state.user?.userData);
 console.log('user',userData)
//  const admin= userData?.role === 'admin';
//  const employer= userData?.role === 'employer';
//  const candidate= userData?.role === 'member';
 const admin = true;
 const candidate = false;
 const employer = false
//  console.log(admin,employer,candidate)
    return (
        <div className='w-full min-h-screen '>
         
         {candidate && <StaticPage></StaticPage> }
           
        </div>
    );
};

export default DashboardHome;