import axios from "axios"

const API_URL = "http://localhost:8080"

export interface Template {
  id: string | number
  name: string
  description: string
  category: string
  subject: string
  html: string
}

export interface Campaign {
  id: string
  name: string
  description: string
  template: Template
  createdAt: string
}

interface deleteCampaign {
  id: string
}

const URL_API = "http://localhost:8080/"

export const getCampaigns = async (): Promise<Campaign[]> => {
  const res = await axios.get(`${API_URL}/campaigns/`)
  return res.data
}

export const getTemplates = async (): Promise<Template[]> => {
  const res = await axios.get(`${API_URL}/templates`)
  return res.data
}

export const createCampaign = async (campaign: {
  name: string
  description: string
  templateId: string | number
}) => {
  const res = await axios.post(`${API_URL}/campaigns/`, campaign)
  return res.data
}


export const deleteCampaign = async (id: string) => {
    const response = await axios.delete(URL_API + `campaign/${id} `)
    return response.data
}
