import { axiosRefresh } from "../api/axios";

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
                    config.headers['Authorization'] = `Bearer ${auth?.acessToken}`;
                }
                return config;
            }, (error) => { return Promise.reject(error) }
        );





        const responseIntercept = axiosRefresh.interceptors.response.use(
            response => { return response },
            async (error) => {
                console.log(error)
                const prevRequest = error.config;
                if (error?.response?.status === 403 && !prevRequest._retry) {
                    prevRequest._retry = true;
                    const newAcessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAcessToken}`;

                    const data = prevRequest.data || null;
                    const method = prevRequest.method
                    const retryURL = error.request.responseURL


                    return axiosRefresh[method](retryURL,
                        data, {
                        withCredentials: true
                    })
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosRefresh.interceptors.request.eject(requestIntercept);
            axiosRefresh.interceptors.response.eject(responseIntercept);
        };

    }, [refresh, auth])


    return axiosRefresh;
};

export default useAxiosRefresh;


