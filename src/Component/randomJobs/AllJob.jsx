'use client';

import useAxios_public from '@/Hook/useAxios_public';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// React Icons
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';

const AllJob = () => {
  const userData = useSelector((state) => state?.user?.userData);
  const [Joblist, setJoblist] = useState([]);
  const useAxios = useAxios_public();

  useEffect(() => {
    const handleGetTheJob = async () => {
      try {
        const res = await useAxios.get('/api/Jobs/Joblist');
        setJoblist(res.data);
      } catch (error) {
        // console.error('Error fetching jobs:', error);
      }
    };
    handleGetTheJob();
  }, [useAxios]);

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-green-50 py-12">
      <div className="w-[90%] mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Explore Recent Jobs
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Discover opportunities that match your passion and skills — apply and grow your career.
        </p>
      </div>

      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Joblist.length > 0 ? (
          Joblist.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-100 p-6 flex flex-col justify-between"
            >
              {/* Top Section */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600 flex items-center gap-1">
                    <FaBriefcase /> {item?.JobType || 'N/A'}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FaCalendarAlt /> {item?.deadline ? item.deadline.split('T')[0] : 'N/A'}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
                  {item?.JobTitle || 'Untitled Job'}
                </h2>

                <p className="text-gray-500 mt-2 text-sm leading-relaxed line-clamp-3">
                  {item?.description || 'No description provided.'}
                </p>
              </div>

              {/* Bottom Info */}
              <div className="mt-5 space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <FaBuilding className="text-green-600" />
                  {item?.companyName || 'Company not specified'}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-sky-600" />
                  {item?.location || 'Location not mentioned'}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-yellow-600" />
                  {item?.salary ? `${item.salary} BDT` : 'Negotiable'}
                </p>
              </div>

              {/* Bottom Button */}
              <div className="mt-6">
                <Link href={`/Jobs/Details/${item?.Job_id}`}>
                  <button className="btn btn-success w-full text-black bg-green-500 rounded-md py-1 hover:bg-green-600 font-semibold">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No jobs available right now 
          </p>
        )}
      </div>
    </div>
  );
};

export default AllJob;
