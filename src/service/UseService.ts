import axios from "axios"

interface RegisterUseData {
    name: string
    email: string
    username: string
    password: string
}

const URL_API = "http://localhost:8080"

export const registerUser = async (userData:  RegisterUseData) => {
    const response = await axios.post(URL_API + "/user/register", userData)
    return response.data
}