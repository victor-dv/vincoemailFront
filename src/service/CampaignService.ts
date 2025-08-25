import axios from "axios"
import { data } from "react-router-dom"

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
interface updateCampaign {
  name: string,
  description: string,
  template: Template
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

export const updateCampaign = async (
  id: string | number,
  campaign: {
    name: string
    description: string
    templateId: string | number
  }
) => {
  const res = await axios.put(`${API_URL}/campaigns/${id}`, campaign)
  return res.data
}

export const getCampaignStats = async (id: string) => {
  const res = await fetch(`/campaigns/${id}/`);
  if (!res.ok) throw new Error("Erro ao buscar estatísticas da campanha");
  return res.json();
};