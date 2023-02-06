import axios from 'axios'

export const axiosAdminInstance = axios.create({
    baseURL:"/admin"
});

export const axiosUserInstance = axios.create({
    baseURL:"/"
});

