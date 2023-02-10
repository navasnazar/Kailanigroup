import axios from 'axios'

export const axiosAdminInstance = axios.create({
    baseURL:"http://localhost:8000/admin"
});

export const axiosUserInstance = axios.create({
    baseURL:"http://localhost:8000/"
});

