import axios from "axios";
import { data } from "react-router-dom";
import api from "./TokenService";

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

interface DeleteTemplate {
    id: number
}
interface UpdateTemplate {
    name: string,
    description: string,
    category: string,
    subject: string,
    html: string
}

const URL_API = "http://localhost:8080/"

export const createTemplate = async (templateData: CreateTemplate) => {
    const response = await api.post(URL_API + "templates", templateData)
    return response.data
}

export const getAllTemplates = async () => {
    const response = await api.get(URL_API + "templates")
    return response.data
}

export const deleteTemplates = async (id: number) => {
    const response = await api.delete(URL_API + `templates/${id} `)
    return response.data
}

export const updateTemplates = async (id: number, data: CreateTemplate) => {
  const response = await api.put(`${URL_API}templates/${id}`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.data;
};

