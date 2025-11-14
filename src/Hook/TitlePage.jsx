import React from 'react';
import { FaClipboardList } from 'react-icons/fa';

const TitlePage = ({ title, subTitle }) => {
    return (
        <div className='w-full'>
            <div className="flex items-center justify-center">
                <FaClipboardList className="text-2xl text-green-500 dark:text-green-400" />
                <h1 className="text-2xl font-bold text-gray-800 py-2 ">
                   {title}
                </h1>
            </div>

            {/* Right: Optional subtitle or info */}
            <div className="mt-3 md:mt-0 text-gray-600 text-center">
                {subTitle}
            </div>
        </div>
    );
};

export default TitlePage;