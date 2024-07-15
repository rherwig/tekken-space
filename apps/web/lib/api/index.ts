import axios from 'axios'

export const apiClient = axios.create({
    baseURL: process.env.ORIGIN,
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true,
})
