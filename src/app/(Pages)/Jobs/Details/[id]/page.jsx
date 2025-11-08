import useAxios_public from '@/Hook/useAxios_public';
import React from 'react';
import Link from 'next/link';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';

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
                    <Link href={data?.webLink || "#"} target="_blank">
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
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/*Full Name */}
                    <div>
                        <label className="block font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Jone Duo"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-semibold mb-2">Email </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="name123@gmail.com"
                            className="input input-bordered w-full"
                        />
                    </div>
                    {/* Position */}
                    <div>
                        <label className="block font-semibold mb-2">Job Title</label>
                        <input
                            type="text"
                            name="JobTitle"
                            placeholder="EX:Frontend/Backend"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block font-semibold mb-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="+880*********"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-semibold mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Dhaka, Bangladesh"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Job Type */}
                    <div>
                        <label className="block font-semibold mb-2">Job Type</label>
                        <select className="select select-bordered w-full" name="JobType">
                            <option>Select Type</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Remote</option>
                            <option>Internship</option>
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block font-semibold mb-2">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            placeholder="$"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block font-semibold mb-2">Resume (PDF)</label>
                        <input type="file" name="resume" className="input input-bordered w-full" />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block font-semibold mb-2">Tell me about your self</label>
                        <textarea
                            name="description"
                            placeholder="Write your responsibilities,experience, etc."
                            className="textarea textarea-bordered w-full h-32 px-2"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-md font-semibold transition-all"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default JobDetails;