'use client'
import useAxios_public from '@/Hook/useAxios_public';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import CandidateFrom from '@/Component/CandidateFrom/CandidateFrom';
import { MdNotificationsOff } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
const JobDetails = () => {
    const { id } = useParams();
    const [alert, setAlert] = useState(false)
    // console.log('details id', id);
    const useAxios = useAxios_public()
    if (!id) {
        return null;
    }
    const { data:Data = [],refetch } = useQuery({
        queryKey: ['Jobs', id],
        queryFn: async () => {
            const res = await useAxios.get(`/api/Jobs/details/${id}`);
            setAlert(res.data[0].Alert)
            return res.data[0]

        }
    })

    const handleAlert = (JobTitle, JobType, location) => {
        setAlert()
      refetch()
    }
    // console.log(res.data[0])
    return (
        <div className="w-[90%]  mx-auto my-10 pt-7 flex flex-col lg:flex-row justify-between ">
            {/* ---------------- Left Section- Job Details ---------------- */}
            <div className="w-full lg:w-[60%] bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                {/* Header: Job Title & Company Logo */}
                <div className="flex items-start gap-4">
                    <img
                        src={Data?.companyLogo || "/company-default.png"}
                        alt="company logo"
                        className="w-14 h-14 rounded-md border"
                    />

                    <div className='w-full'>
                        <div className='flex justify-between w-full'>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {Data?.JobTitle || "Job Title Not Provided"}
                            </h1>
                            <div>
                                <div onClick={() => handleAlert(Data?.JobTitle, Data?.JobType, Data?.location)} className='text-4xl rounded-full shadow-md shadow-gray-300' >{alert ? <IoNotifications className='  text-green-600  ' /> : <MdNotificationsOff className='  text-green-600  ' />}</div>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mt-1">{Data?.companyName}</p>

                        <p className="text-gray-500 text-xs flex gap-1 mt-1">
                            <FaMapMarkerAlt className="text-gray-400" />
                            {Data?.location || "Location not available"}
                        </p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex items-center flex-wrap gap-3 mt-5">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center gap-1">
                        <FaBriefcase /> {Data?.JobType || "Full-time"}
                    </span>

                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs flex items-center gap-1">
                        <FaCalendarAlt />
                        Deadline: {Data?.deadline?.split("T")[0] || "N/A"}
                    </span>

                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs flex items-center gap-1">
                        <FaMoneyBillWave />
                        {Data?.salary || "Negotiable"}
                    </span>
                </div>

                {/* Summary  */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Job Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border">
                        {Data?.summary ||
                            "This position requires a strong understanding of modern development technologies and the ability to work in a fast-paced environment. The selected candidate will collaborate with cross-functional teams to deliver high-quality solutions."}
                    </p>
                </div>

                {/* Description */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {Data?.description || "Job description not provided."}
                    </p>
                </div>

                {/* Skills */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {(Data?.skills?.split(",") || ["React.js", "Node.js", "Express.js"]).map(
                            (skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 text-xs bg-gray-100 border border-gray-200 rounded-full"
                                >
                                    {skill.trim()}
                                </span>
                            )
                        )}
                    </div>
                </div>

                {/* Company Website Button */}
                <div className="mt-10">
                    <Link href={Data?.webLink || "#"}>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">
                            Visit Company Website
                        </button>
                    </Link>
                </div>
            </div>

            {/* ---------------- RIGHT SECTION: Candidate Form ---------------- */}
            <div className="w-full lg:w-[38%] bg-white shadow-sm border border-gray-200 rounded-xl p-6 h-fit sticky top-10">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
                    Apply Now
                </h3>
                <CandidateFrom id={id} Title={Data?.JobTitle} working_time={Data?.working_time} ownerEmail={Data?.email} JobType={Data?.JobType} />
            </div>
        </div>


    );
};

export default JobDetails;