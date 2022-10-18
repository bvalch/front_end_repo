import axios, { axiosRefresh } from "../api/axios";

import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";



const useAxiosRefresh = () => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosRefresh.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'] || config.headers === undefined) {
                    // console.log(config.headers)
                    config.headers['Authorization'] = `Bearer ${auth?.acessToken}`;
                }
                // console.log(config)
                return config;
            }, (error) => { return Promise.reject(error) }
        );





        const responseIntercept = axiosRefresh.interceptors.response.use(
            response => { return response },
            async (error) => {
                console.log(error)
                const prevRequest = error.config;
                // console.log(prevRequest._retry)
                if (error?.response?.status === 403 && !prevRequest._retry) {
                    // console.log(error.config)
                    prevRequest._retry = true;
                    const newAcessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAcessToken}`;

                    // console.log(prevRequest)
                    const data = prevRequest.data || null;
                    const method = prevRequest.method
                    const retryURL = error.request.responseURL
                    // console.log(url)
                    // console.log(prevRequest)
                    // return null;

                    return axiosRefresh[method](retryURL,
                        data, {
                        withCredentials: true
                    })
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosRefresh.interceptors.request.eject(requestIntercept)
            axiosRefresh.interceptors.response.eject(responseIntercept)
        };

    }, [refresh, auth])


    return axiosRefresh;
};

export default useAxiosRefresh;


