
'use client'

import useAxios_public from '@/Hook/useAxios_public';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

const UserProfile = () => {
    const params = useParams();
    const id = params?.id;

    const useAxios = useAxios_public();

    const { data: user = {}, isLoading } = useQuery({
        queryKey: ['userInfo', id],
        queryFn: async () => {
            const res = await useAxios.get(`/api/admin/singleUser/${id}`);
            return res.data;
        },
        enabled: !!id, // prevent calling before param exists
    });

    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className="space-y-6 w-[90%] mx-auto">
            <div className='w-full h-[60px]'></div>
            {/* Banner */}
            {user?.banner ? (
                <Link href={'/Banner'}>
                    <img
                        src={user?.banner}
                        alt="Banner"
                        className="w-full h-60 object-cover rounded-xl shadow"
                    />
                </Link>
            ) : (
                <div className="w-full h-40 flex items-center justify-center text-gray-500 text-xl border rounded-xl">
                    No Banner Added
                </div>
            )}

            {/* Profile Section */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
                <div>
                    <img
                        src={user?.profile}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-2 border-green-400 shadow object-cover"
                    />
                </div>

                <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-bold capitalize">{user?.name}</h2>
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

            {/* Meta Info */}
            <div className="bg-white rounded-2xl shadow p-6 flex justify-between text-gray-600 text-sm">
                <p>Joined: {new Date(user?.created_date).toLocaleDateString()}</p>
                <p>User ID: #{user?.id}</p>
            </div>
        </div>
    );
};

export default UserProfile;
