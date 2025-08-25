import axios from "axios"
import api from "./TokenService"

interface RegisterUseData {
    name: string
    email: string
    username: string
    password: string
    role: string
}
interface LoginUseData {
    email: string
    password: string
}

interface updateUser {
    name: string
    username: string
}

const URL_API = "http://localhost:8080"

export const registerUser = async (userData: RegisterUseData) => {
    const response = await api.post(URL_API + "/user/register", userData)
    return response.data
}

export const loginUser = async (userData: LoginUseData) => {
    const response = await axios.post(URL_API + "/user/login", userData)
    const { access_token } = response.data
    sessionStorage.setItem("jwtToken", access_token)
    return response.data
}


export const updateUser = async (id: string, userData: updateUser) => {

    const response = await api.put(URL_API + `/user/${id}`, userData)
    return response.data

};