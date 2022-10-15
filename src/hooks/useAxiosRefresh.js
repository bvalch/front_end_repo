import { axiosRefresh } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";


const useAxiosRefresh = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosRefresh.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'] || config.headers === undefined) {
                    console.log(config.headers)
                    config.headers['Authorization'] = `Bearer ${auth?.acessToken}`;
                }
                console.log(config.headers)
                return config;
            }, (error) => { return Promise.reject(error) }
        );


        const responseIntercept = axiosRefresh.interceptors.response.use(
            response => { return response },
            async (error) => {
                const prevRequest = error?.config;
                console.log(prevRequest)
                if (error?.response?.status === 403 && !prevRequest._retry) {
                    prevRequest._retry = true;
                    const newAcessToken = await refresh();
                    axiosRefresh.defaults.headers['Authorization'] = `Bearer ${newAcessToken}`;
                    return axiosRefresh;
                }
                return Promise.reject(error)
            }
        );
        return () => {
            axiosRefresh.interceptors.request.eject(requestIntercept)
            axiosRefresh.interceptors.response.eject(responseIntercept)
        }
    }, [auth, refresh])


    return axiosRefresh;
};

export default useAxiosRefresh;