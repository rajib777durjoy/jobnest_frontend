'use client'

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi";
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useAxios_public from '@/Hook/useAxios_public';
import { setUserData } from '@/Redux/userSlice';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
const UserProfile = () => {
    const userData = useSelector(state => state.user?.userData);
    const [open, setOpen] = useState(false)
    const [Profile, setProfile] = useState();
    const [Banner, setBanner] = useState();
    const dispatch = useDispatch()
    const useAxios = useAxios_public();
    // console.log('user data:::', user?.profile)
    // {
    //     banner
    //     :
    //     null
    //     created_date
    //     :
    //     "2025-11-03T20:02:23.787Z"
    //     description
    //     :
    //     ""
    //     email
    //     :
    //     "durjoy2001chando@gmail.com"
    //     id
    //     :
    //     1
    //     name
    //     :
    //     "Durjoy Chando"
    //     password
    //     :
    //     null
    //     profile
    //     :
    //     "https://lh3.googleusercontent.com/a/ACg8ocL4CLwq6g6jCaOAsvt6VZivas0P_gssqxJf2KO8JOVQ-kGtsPYc=s96-c"
    //     role
    //     :
    //     "member"
    //     title
    //     :
    //     "web developer,frontend developer,next.js developer,mern stack developer,React.js developer"
    // }
    const { data: user = [], refetch } = useQuery({
        queryKey: [userData?.id, 'userInfo'],
        queryFn: async () => {
            const res = await useAxios.get('/api/user/currentUser');
            return res.data;
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append("name", e.target.name.value);
        formData.append("email", e.target.email.value);
        formData.append("title", e.target.title.value);
        formData.append("description", e.target.description.value);

        // profile & banner (file or previous image)
        formData.append("profile", Profile || user?.profile);
        formData.append("banner", Banner || user?.banner);


        // console.log('datasfdsfsdf', dataInfo)
        const profileUpdate = async () => {
            try {
                console.log('function call')
                const res = await useAxios.put('/api/user/profileUpdate', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                console.log(res.data)

                dispatch(setUserData(res.data))
                refetch()
                setOpen(false)
            } catch (err) {
                console.log(err)
                setOpen(false)
            }

        }
        profileUpdate()

    }
    return (
        <div className="w-[90%] mx-auto my-10 p-6 space-y-6">

            {/* Banner */}
            <div className="w-full h-48 bg-gray-200 rounded-2xl overflow-hidden relative">
                <Dialog open={open} onOpenChange={setOpen} >

                    <DialogTrigger asChild>
                        <Button className={'m-2'} variant="outline"><FiEdit /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] lg:min-w-[50%] mx-auto border-0 shadow shadow-green-300 bg-green-100 text-center">
                        <DialogHeader>
                            <DialogTitle className='text-center text-xl'>Update your profile</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} >
                            <div className="grid gap-4 my-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Name</Label>
                                    <Input id="name-1" name="name" defaultValue={user?.name} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="userEmail-1">Email</Label>
                                    <Input id="userEmail-1" name="email" defaultValue={user?.email} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="title-1">Title use ( , )</Label>
                                    <Input id="title-1" name="title" defaultValue={user?.title} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="profile-1">Upload Profile Image</Label>
                                    <Input id="profile-1" name='profile' type="file" onChange={(e) => setProfile(e.target.files[0])} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="banner-1">Upload Banner Image</Label>
                                    <Input id="banner-1" name='banner' type="file" onChange={(e) => setBanner(e.target.files[0])} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="textarea-1">About Us</Label>
                                    <Textarea id='textarea-1' name='description' placeholder="Type your message here." />
                                </div>
                            </div>
                            <DialogFooter className={'grid md:grid-cols-2'}>
                                <DialogClose asChild>
                                    <Button type='button' className={' hover:bg-green-900 hover:text-white'} variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" className={'border  hover:bg-green-900 hover:text-white'} >Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>

                </Dialog>
                {user?.banner ? (
                    <Link href={'/Banner'} ><img
                        src={user?.banner}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    /></Link>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
                        No Banner Added
                    </div>

                )}
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="">
                    <img
                        src={user?.profile}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-2 border-green-400 shadow object-cover"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
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

            {/* Meta */}
            <div className="bg-white rounded-2xl shadow p-6 flex justify-between text-gray-600 text-sm">
                <p>Joined: {new Date(user?.created_date).toLocaleDateString()}</p>
                <p>User ID: #{user?.id}</p>
            </div>
        </div>

    );
};

export default UserProfile;