'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import EmployerStaticPage from './EmployerStaticPage/page';

const EmployerHome = () => {
    const userData = useSelector(state => state.user?.userData);
    console.log('user', userData)
    const Employer = userData?.role === 'employer';
    return (
        <div>
         {Employer && <EmployerStaticPage></EmployerStaticPage>}
        </div>
    );
};

export default EmployerHome;