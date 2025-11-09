'use client'

import useAxios_public from "@/Hook/useAxios_public";
import Swal from "sweetalert2";

const CandidateFrom = ({ id }) => {
    const useAxios = useAxios_public()

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const JobTitle = e.target.JobTitle.value;
        const phone = e.target.phone.value;
        const loaction = e.target.location.value;
        const JobType = e.target.JobType.value;
        const salary = e.target.salary.value;
        const resume = e.target.resume.files[0];
        const description = e.target.description.value;
        const data = { fullName, email, JobTitle, phone, loaction, JobType, salary, resume, description, Job_id: id };
        console.log('data info:', data)
        const res = await useAxios.post('/api/Jobs/JobSubmitForm', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (res.data.success) {
            console.log(res.data.success)
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${res.data?.success}`,
                showConfirmButton: false,
                timer: 1500
            });
        }

        if (res.data.message) {
            console.log('candidate response:', res.data.message)
            Swal.fire({
                position: "top-center",
                icon: "warning",
                title: `${res.data?.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <form onSubmit={handleSubmitForm} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Deadline */}
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
    );
};

export default CandidateFrom;