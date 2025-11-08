'use client'

import useAxios_public from "@/Hook/useAxios_public";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AddJobPage = () => {
   const [JobType,setJobType]=useState('');
   const useAxios= useAxios_public();
//    const userInfo= useSelector(state=>state.user.userData);
//    console.log("userInfo::",userInfo?.email)
    const handleSubmit=async(e)=>{
     e.preventDefault();
     const JobTitle= e.target.JobTitle.value;
     const companyName= e.target.companyName.value;
     const location= e.target.location.value;
     const webLink= e.target.companyLink.value;
     const salary= e.target.salary.value;
     const deadline= e.target.date.value;
     const description= e.target.description.value;
     if(!JobType){
       return alert('please select Jobtype')
     }
     const data={
        JobTitle,
        companyName,
        webLink,
        location,
        JobType,
        salary,
        deadline,
        description
     }
     console.log('info::',JobTitle,companyName,webLink,location,JobType,salary,deadline,description);
     const res= await useAxios.post(`/api/Jobs/Jobpost`,data);
     console.log('message',res.data)
    }
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center ">
      <div className="w-[60%] mx-auto  bg-base-100 shadow-md rounded-2xl  p-8 shadow-green-300 ">
        <h2 className="text-3xl font-bold text-center text-primary mb-10 pb-6">
          Add New Job
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="form-control">
            <label className="label">
              <span  className="label-text font-semibold">Job Title</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              name="JobTitle"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Company Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Company Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Google"
              name="companyName"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Company Link</span>
            </label>
            <input
              type="url"
              placeholder="https://www.Xcompany.com"
              name="companyLink"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dhaka, Bangladesh"
              name="location"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Job Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Job Type</span>
            </label>
            <select name="JobType" onChange={(e)=>setJobType(e.target.value)} className="select select-bordered w-full">
              <option disabled={!JobType} selected>
                Select job type
              </option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
              <option>Internship</option>
            </select>
          </div>

          {/* Salary Range */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Salary Range</span>
            </label>
            <input
              type="text"
              placeholder="e.g. $500 - $1000/month"
              name="salary"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Application Deadline</span>
            </label>
            <input name="date" type="date" className="input input-bordered w-full" required />
          </div>

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Job Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-32"
              name="description"
              placeholder="Write job responsibilities, requirements, and more..." required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-6 bg-green-500 rounded-md cursor-pointer hover:bg-green-700">
            <button type="submit" className="btn  w-[100%] py-2 ">
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
