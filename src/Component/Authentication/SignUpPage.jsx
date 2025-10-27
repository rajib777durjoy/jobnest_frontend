'use client'

import React, { useState } from 'react';
import { motion } from "motion/react"
import Link from 'next/link';
import useAxios_public from '@/Hook/useAxios_public';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase.config';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/Redux/userSlice';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Image, setImage] = useState(null);
    const axiosPublic = useAxios_public();
    const dispatch= useDispatch()
     const route= useRouter()
    const provider = new GoogleAuthProvider();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formsubmit = async () => {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append('profile', Image);
            const res = await axiosPublic.post('api/submitFrom', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            console.log('respons::', res.data)
            dispatch(setUserData(res.data))
        };
        formsubmit()
    }
    const handleGoogleSubmit = async () => {
        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        console.log('google user', user)

        if (user?.email && user?.displayName) {
            const googleSignIn = await axiosPublic.post('/api/googleSignIn',{
                name: user?.displayName,
                email: user?.email,
                photoUrl: user?.photoURL
            })
            console.log("respons::",googleSignIn.data);
            dispatch(setUserData(googleSignIn?.data));
            if(googleSignIn?.data){
               return route.push('/');
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#121212] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-600/20"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-green-500">
                    Create Your Account
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-300 mb-2">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="w-full px-4 py-2 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:border-green-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full px-4 py-2 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:border-green-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="w-full px-4 py-2 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:border-green-500 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Profile Image</label>
                        <input
                            type="file"
                            placeholder="Upload your profile"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full px-4 py-2 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:border-green-500 transition"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2.5 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-white transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Already have an account?
                    <Link href="/signin" className="text-green-400 ms-2 hover:underline">
                        Sign In
                    </Link>
                </p>

                <div className="flex items-center justify-center mt-6">
                    <span className="w-1/4 border-b border-gray-700"></span>
                    <span className="mx-3 text-gray-500 text-sm">or</span>
                    <span className="w-1/4 border-b border-gray-700"></span>
                </div>

                <div className="mt-6 space-y-3">
                    <button onClick={handleGoogleSubmit} className="w-full flex items-center justify-center gap-2 bg-[#1f1f1f] border border-gray-700 hover:border-green-500 rounded-lg py-2 transition">
                        <span>Sign up with Google</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;