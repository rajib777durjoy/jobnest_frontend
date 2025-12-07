'use client'

import React, { useState } from "react";
import { useParams } from "next/navigation";
import useAxios_public from "@/Hook/useAxios_public";
import TitlePage from "@/Hook/TitlePage";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";


const ApplyForm = () => {
    const { Job_id } = useParams();
    // console.log('jobId', Job_id)
    const useAxios = useAxios_public()
    const user = useSelector(state=>state.user?.userData);
    
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const fullName = e.target.fullName.value;
        const JobTitle = e.target.JobTitle.value.toLowerCase();
        const email = user?.email;
        const phone = e.target.phone.value;
        const loaction = e.target.location.value;
        const JobType = e.target.JobType.value;
        const salary = e.target.salary.value;
        const resume = e.target.resume.files[0];
        const description = e.target.description.value;
        const data = { fullName, email, JobTitle, phone, loaction, JobType, salary, resume, description,Job_id };
        // console.log('data info:', data)
        if(!user?.email){
            // console.log('userEmail is null')
         return ;
        }
        const res = await useAxios.post('/api/Jobs/JobSubmitForm', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (res.data.success) {
            // console.log(res.data.success)
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${res.data?.success}`,
                showConfirmButton: false,
                timer: 1500
            });
        }

        if (res.data.message) {
            // console.log('candidate response:', res.data.message)
            Swal.fire({
                position: "top-center",
                icon: "warning",
                title: `${res.data?.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (<div className="w-[80%] mx-auto">
        <div className="w-full mb-10 h-[50px]">
            <TitlePage title={'Apply For This Position'}></TitlePage>
        </div>

        <form onSubmit={handleSubmitForm} className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 space-y-5">
            {/*Full Name */}
            <div>
                <label className="block font-semibold mb-2">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Jone Duo"
                    className="input input-bordered w-full"
                    required
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
                    defaultValue={user?.email}
                    required
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
                    required
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
                    required
                />
            </div>

            {/* Job Type */}
            <div>
                <label className="block font-semibold mb-2">Job Type</label>
                <select required className="select select-bordered w-full" name="JobType">
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
                    required
                />
            </div>

            {/* Resume */}
            <div>
                <label className="block font-semibold mb-2">Resume (PDF)</label>
                <input required type="file" name="resume" className="input input-bordered w-full" />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block font-semibold mb-2">Tell me about your self</label>
                <textarea
                    name="description"
                    placeholder="Write your responsibilities,experience, etc."
                    className="textarea textarea-bordered w-full h-32 px-2"
                    required
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

    );
};

export default ApplyForm;