'use client'
import React from 'react';
import AdminStaticPage from './AdminComponent/AdminStaticPage/page';
import { useSelector } from 'react-redux';

const AdminHome = () => {
    const userData = useSelector(state => state.user?.userData);
    // console.log('user', userData)
    //  const admin= userData?.role === 'admin';
     const admin = true;
    return (
        <div className='w-full min-h-screen'>
            
            {admin && <AdminStaticPage></AdminStaticPage>}
        </div>
    );
};

export default AdminHome;