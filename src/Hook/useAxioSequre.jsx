import axios from "axios";
import useAxios_public from "./useAxios_public";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUserData } from "@/Redux/userSlice";
import { useEffect } from "react";

const instance = axios.create({
    baseURL: 'http://localhost:7000',
    withCredentials: true,
});

const useAxioSequre = () => {
const axiosPublic = useAxios_public();
const dispatch = useDispatch();
const router = useRouter();
const userData = useSelector(state => state.user?.userData)
    useEffect(() => {
        instance.interceptors.response.use((response) => {
            return response;
        }, async (erro) => {
            // console.log("axios Error", erro)
            const status = erro?.response?.status;
            if (status === 401 || status === 403) {
                const res = await axiosPublic.post(`/api/signOut/${userData?.email}`, {});
                dispatch(setUserData(null))
                return router.push('/SignUp');
            }
            return Promise.reject(erro)
        })
    }, [])

};

export default useAxioSequre;