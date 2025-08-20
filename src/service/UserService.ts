import axios from "axios"

interface RegisterUseData {
    name: string
    email: string
    username: string
    password: string
}
interface LoginUseData {
     email: string
     password: string
}

const URL_API = "http://localhost:8080"

export const registerUser = async (userData:  RegisterUseData) => {
    const response = await axios.post(URL_API + "/user/register", userData)
    return response.data
}

export const loginUser = async (userData: LoginUseData) => {
    const response = await axios.post(URL_API + "/user/login", userData)
    const {access_token} = response.data
    sessionStorage.setItem("jwtToken", access_token)
    return response.data
}