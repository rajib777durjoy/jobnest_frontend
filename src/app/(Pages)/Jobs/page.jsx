import AllJob from '@/Component/randomJobs/AllJob';
import React from 'react';

const Jobs = () => {
    return (
        <div className='w-[90%] mx-auto text-black'>
            find random jobs !
            <AllJob></AllJob>
        </div>
    );
};

export default Jobs;