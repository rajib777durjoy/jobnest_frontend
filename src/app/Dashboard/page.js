'use client'
import StaticPage from "@/Component/Candidate/StaticPage";
import { useSelector } from "react-redux";


const DashboardHome =() => {
 const userData = useSelector(state => state.user?.userData);
 console.log('user',userData)
 const admin= userData?.role === 'admin';
 const employer= userData?.role === 'employer';
 const candidate= userData?.role === 'member';
 console.log(admin,employer,candidate)
    return (
        <div className='w-full min-h-screen '>
         {
            admin && <div>Hello world</div>
         }
         {candidate && <StaticPage></StaticPage> }
           
        </div>
    );
};

export default DashboardHome;