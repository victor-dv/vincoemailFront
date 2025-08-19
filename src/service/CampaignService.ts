import axios from "axios"


interface Template {
    id: number,
    name: string,
    description: string,
    category: string,
    subject: string,
    html: string
}

interface GetAllCampaign {
    name: string,
    description: string,
    template: Template,
    createdAt: string
}

const URL_API = "http://localhost:8080/"

export const getAllCampaign = async (): Promise<GetAllCampaign[]> => {
    const response = await axios.get(URL_API + "campaigns")
    return response.data
}

