import React from 'react';

const HeadingPage = ({ title, subtitle, description }) => {
    return (
        <div className='flex flex-col justify-center h-[500px]'>
            <h1 className='text-4xl text-green-700 font-extrabold mt-4'>{title}</h1>
            <h2 className='text-md font-serif'>{subtitle}</h2>
            <p className='text-sm font-normal font-serif pt-5 pb-10 '>{description}</p>
            <div className='flex mt-5 rounded-md shadow-lg shadow-green-900/40 py-4 px-3'>
                <div className='w-[90%] h-[40px]'>
                    <input
                        className='border border-[#10B981]/60 bg-transparent text-gray-100 rounded-md w-full h-full outline-none px-3 placeholder-gray-400 focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] transition duration-300'
                        type='text'
                        placeholder='Search Jobs...'
                        name=''
                        id=''
                    />
                </div>
                <button className='btn px-5 bg-[#10B981] text-black font-semibold mx-2 hover:bg-green-600 hover:text-white rounded-md transition duration-300'>
                    Search
                </button>
            </div>

        </div>
    );
};

export default HeadingPage;