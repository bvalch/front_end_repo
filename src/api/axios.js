import axios from "axios";
const BASE_URL = 'http://localhost:3500'

export default axios.create({
    baseURL: BASE_URL,

});

export const axiosRefresh = axios.create({
    // baseURL: 'http://localhost:3500',
    baseURL: BASE_URL,

    headers: { 'Content-Type': 'application/json' },
    withCredentials: true

}
);
//     baseURL: 'http://localhost:3500/profile',


