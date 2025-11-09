
import useAxios_public from '@/Hook/useAxios_public';
import React from 'react';
import Link from 'next/link';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import CandidateFrom from '@/Component/CandidateFrom/CandidateFrom';

const JobDetails = async ({ params }) => {
    const { id } = params;
    console.log('details id', id);
    const useAxios = useAxios_public()
    if (!id) {
        return null;
    }
    const res = await useAxios.get(`/api/Jobs/details/${id}`);
    const data = res.data[0] || {}
    console.log(res.data[0])
    return (
        <div className="w-[90%] mx-auto flex flex-col lg:flex-row justify-between gap-10 my-10">
            {/* ---------- LEFT SIDE: Job Info Card ---------- */}
            <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 rounded-2xl p-6 w-full lg:w-[45%] flex flex-col justify-between">
                {/* Top Tags */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600 flex items-center gap-1">
                        <FaBriefcase /> {data?.JobType || "N/A"}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FaCalendarAlt />{" "}
                        {data?.deadline ? data.deadline.split("T")[0] : "N/A"}
                    </span>
                </div>

                {/* Title & Description */}
                <div className="mt-5">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {data?.JobTitle || "Untitled Job"}
                    </h2>
                    <p className="text-gray-600 mt-3 leading-relaxed">
                        {data?.description || "No description provided for this job."}
                    </p>
                </div>

                {/* Company Info */}
                <div className="mt-8 space-y-2 text-gray-700 text-sm">
                    <p className="flex items-center gap-2">
                        <FaBuilding className="text-green-600" />
                        {data?.companyName || "Company not specified"}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-sky-600" />
                        {data?.location || "Location not mentioned"}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-yellow-600" />
                        {data?.salary ? `${data.salary} BDT` : "Negotiable"}
                    </p>
                </div>

                {/* Website Button */}
                <div className="mt-8">
                    <Link href={data?.webLink || "#"}>
                        <button className="bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md font-semibold">
                            Visit Company Website
                        </button>
                    </Link>
                </div>
            </div>

            {/* ---------- RIGHT SIDE: Candidate Form ---------- */}
            <div className="w-full lg:w-[50%] bg-white shadow-md border border-gray-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    Candidate Form
                </h3>
               <CandidateFrom id={id}></CandidateFrom>
            </div>
        </div>

    );
};

export default JobDetails;