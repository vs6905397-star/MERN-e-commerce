import axios from "axios"

const api = axios.create({
    baseURL:"https://mern-e-commerce-72bl.onrender.com/api",
    withCredentials:true
})

export default api