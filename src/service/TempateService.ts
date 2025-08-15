import axios from "axios";

interface CreateTemplate {
    name: string,
    description: string,
    category: string,
    subject: string,
    html: string
}

interface GetAllTemplate {
    name: string,
    description: string,
    category: string
    subject: string,
    html: string,
}

const URL_API = "http://localhost:8080/"

export const createTemplate = async (templateData: CreateTemplate) => {
    const response = await axios.post(URL_API + "templates", templateData)
    return response.data
}

export const getAllTemplates = async () => {
    const response = await axios.get(URL_API + "templates")
    return response.data
}