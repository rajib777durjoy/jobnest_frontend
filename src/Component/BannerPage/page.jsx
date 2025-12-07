'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BannerPage = () => {
    const user = useSelector(state => state.user?.userData);
     const route= useRouter()


    // Handle file select
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // console.log(preview)
        if (!file) return;
        form.append("banner", file)
        // axios.post("/api/uploadBanner", form)
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 py-10">
            <div className="w-[80%] mx-auto bg-white rounded-2xl shadow-lg p-7">

                {/* Page Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Profile Banner Settings
                </h2>

                {/* Banner Preview */}
                <div className="w-full h-[500px] rounded-xl overflow-hidden  shadow shadow-green-700 ">
                    <img
                        src={user?.banner || "/default-banner.jpg"}
                        alt="banner"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Upload Button */}
                <div className="mt-6 flex justify-between">
                    <div>
                        <label
                            htmlFor="bannerInput"
                            className="cursor-pointer inline-block bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition duration-200"
                        >
                            Upload New Banner
                        </label>
                        <input
                            id="bannerInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div>
                        <button onClick={()=>{route.push('/Profile')}} className="cursor-pointer inline-block bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition duration-200">Back To Home</button>
                    </div>

                </div>

                <p className="text-gray-500 text-sm mt-3">
                    Recommended size: 1200x400 • JPG, PNG, or WEBP • Max 5MB
                </p>
            </div>
        </div>
    );
};

export default BannerPage;
