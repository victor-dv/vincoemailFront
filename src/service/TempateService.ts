import axios from "axios";

interface CreateTemplate {
    name: string,
    description: string,
    category: string,
    subject: string,
    html: string
}
const URL_API = "http://localhost:8080/"

export const createTemplate = async (templateData: CreateTemplate) => {
    const response = await axios.post(URL_API + "templates", templateData)
    return response.data
}