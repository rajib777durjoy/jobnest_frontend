'use client'

import useAxios_public from "@/Hook/useAxios_public";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AddJobPage = () => {
  const [JobType, setJobType] = useState('');
  const useAxios = useAxios_public();
  //    const userInfo= useSelector(state=>state.user.userData);
  //    console.log("userInfo::",userInfo?.email)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const JobTitle = e.target.JobTitle.value.toLowerCase();
    const companyName = e.target.companyName.value;
    const location = e.target.location.value;
    const webLink = e.target.companyLink.value;
    const logo = e.target.logo.files[0];
    const salary = e.target.salary.value;
    const skills = e.target.skills.value;
    const experience = e.target.experience.value;
    const deadline = e.target.date.value;
    const summary = e.target.summary.value;
    const description = e.target.description.value;
    if (!JobType) {
      return alert('please select Jobtype')
    }
    const data = {
      JobTitle,
      companyName,
      webLink,
      location,
      JobType,
      skills,
      experience,
      logo,
      summary,
      salary,
      deadline,
      description
    }
    const formData= new FormData();
    formData.append('JobTitle',e.target.JobTitle.value.toLowerCase());
    formData.append('companyName',e.target.companyName.value);
    formData.append('location',e.target.location.value);
    formData.append('webLink',e.target.companyLink.value);
    formData.append('logo',e.target.logo.files[0]);
    formData.append('salary',e.target.salary.value);
    formData.append('skills',e.target.skills.value);
    formData.append('experience',e.target.experience.value);
    formData.append('deadline',e.target.date.value);
    formData.append('summary',e.target.summary.value);
    formData.append('description',e.target.description.value);

    console.log('info::', JobTitle, companyName, webLink, skills, experience, location, JobType, salary, deadline, description);
    const res = await useAxios.post(`/api/Jobs/Jobpost`,formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log('message', res.data)
  }
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center ">
      <div className="w-[80%] mx-auto  bg-base-100 shadow-md rounded-2xl  p-8 shadow-green-300 ">
        <h2 className="text-3xl font-bold text-center text-primary mb-10 pb-6">
          Add New Job
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Job Title</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              name="JobTitle"
              className="input input-bordered w-full p-2"
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
              className="input input-bordered w-full p-2"
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
              className="input input-bordered w-full p-2"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Company Logo</span>
            </label>
            <input
              type="file"
              name="logo"
              className="input input-bordered w-full p-2"
              required
            />
          </div>
          {/* Skills */}
          <div className="form-control">
            <label className="font-semibold text-sm">Required Skills use(,)</label>
            <input name="skills" className="input input-bordered w-full p-2" placeholder="React, Node.js, MongoDB…" required />
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
              className="input input-bordered w-full p-2"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="form-control">Experience</label>
            <select name='experience' className="w-full p-3 border rounded-lg">
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
            </select>
          </div>

          {/* Job Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Job Type</span>
            </label>
            <select name="JobType" onChange={(e) => setJobType(e.target.value)} className="select select-bordered w-full">
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
              className="input input-bordered w-full p-2"
              required
            />
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Application Deadline</span>
            </label>
            <input name="date" type="date" className="input input-bordered w-full p-2" required />
          </div>

          {/* Summary */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Job Summary</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-32"
              name="summary"
              placeholder="Write job responsibilities, requirements, and more..." required
            ></textarea>
          </div>
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
            <button type="submit" className="btn  w-full py-2 ">
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
