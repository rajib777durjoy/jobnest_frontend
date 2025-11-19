'use client'

import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector(state => state.user?.userData);
    console.log('user data:::', user)
    {
        banner
        :
        null
        created_date
        :
        "2025-11-03T20:02:23.787Z"
        description
        :
        ""
        email
        :
        "durjoy2001chando@gmail.com"
        id
        :
        1
        name
        :
        "Durjoy Chando"
        password
        :
        null
        profile
        :
        "https://lh3.googleusercontent.com/a/ACg8ocL4CLwq6g6jCaOAsvt6VZivas0P_gssqxJf2KO8JOVQ-kGtsPYc=s96-c"
        role
        :
        "member"
        title
        :
        "web developer,frontend developer,next.js developer,mern stack developer,React.js developer"
    }

    return (
        <div className="w-[90%] mx-auto my-10 p-6 space-y-6">

            {/* Banner */}
            <div className="w-full h-48 bg-gray-200 rounded-2xl overflow-hidden relative">
                {user?.banner ? (
                    <img
                        src={user.banner}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
                        No Banner Added
                    </div>
                )}
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="">
                    <img
                        src={user?.profile}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-2 border-green-400 shadow object-cover"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                    <p className="text-gray-700 font-medium capitalize">
                        Role: {user?.role}
                    </p>

                    {/* Titles */}
                    <div className="flex flex-wrap">
                        {user?.title?.split(",").map((t, i) => (
                            <span
                                key={i}
                                className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full mr-2 mb-2"
                            >
                                {t.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-xl font-semibold mb-3">About</h3>

                {user?.description ? (
                    <p className="text-gray-700">{user.description}</p>
                ) : (
                    <p className="text-gray-500">No description added</p>
                )}
            </div>

            {/* Meta */}
            <div className="bg-white rounded-2xl shadow p-6 flex justify-between text-gray-600 text-sm">
                <p>Joined: {new Date(user?.created_date).toLocaleDateString()}</p>
                <p>User ID: #{user?.id}</p>
            </div>
        </div>

    );
};

export default UserProfile;