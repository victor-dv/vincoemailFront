"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { Progress } from "../components/ui/Progress"
import { Modal } from "../components/ui/Modal"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Select } from "../components/ui/Select"
import { Mail, Eye, MousePointer, Send, Plus } from "lucide-react"

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
  })

  const stats = {
    totalCampaigns: 24,
    totalSent: 15420,
    openRate: 24.5,
    clickRate: 3.2,
    activeCampaigns: 3,
    scheduledCampaigns: 2,
  }

  const emailTemplates = [
    { value: "newsletter", label: "Newsletter Padrão" },
    { value: "promotional", label: "Promocional" },
    { value: "welcome", label: "Boas-vindas" },
    { value: "announcement", label: "Anúncio" },
    { value: "event", label: "Evento" },
  ]

  const recentCampaigns = [
    {
      id: 1,
      name: "Promoção Black Friday 2024",
      status: "active",
      sent: 2500,
      opens: 612,
      clicks: 89,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Newsletter Semanal #45",
      status: "completed",
      sent: 1800,
      opens: 441,
      clicks: 67,
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      name: "Lançamento Produto X",
      status: "scheduled",
      sent: 0,
      opens: 0,
      clicks: 0,
      createdAt: "2024-01-10",
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCreateCampaign = () => {
    // TODO: Integrar com API
    console.log("Nova campanha:", formData)

    // Reset form and close modal
    setFormData({ name: "", description: "", template: "" })
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({ name: "", description: "", template: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral das suas campanhas de email</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Campanhas</CardTitle>
            <Mail className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.totalCampaigns}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">E-mails Enviados</CardTitle>
            <Send className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.totalSent.toLocaleString()}</div>
          </CardContent>
        </Card>



        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Cliques</CardTitle>
            <MousePointer className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.clickRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {/* Campanhas Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-700">Campanhas Recentes</CardTitle>
            <CardDescription>Suas últimas campanhas e seu desempenho</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{campaign.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Badge
                        className={
                          campaign.status === "active"
                            ? "bg-yellow-600 text-white"
                            : campaign.status === "completed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {campaign.status === "active"
                          ? "Ativa"
                          : campaign.status === "completed"
                            ? "Concluída"
                            : "Agendada"}
                      </Badge>
                      <span>•</span>
                      <span>{campaign.sent} enviados</span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium text-yellow-700">{campaign.opens} aberturas</div>
                    <div className="text-gray-600">{campaign.clicks} cliques</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Nova Campanha">
        <div className="space-y-4">
          <Input
            label="Nome da Campanha"
            placeholder="Digite o nome da campanha"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />

          <Textarea
            label="Descrição"
            placeholder="Descreva o objetivo da campanha"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Modelo de Email</label>
            <Select
              options={emailTemplates}
              value={formData.template}
              onChange={(value) => handleInputChange("template", value)}
              placeholder="Selecione um modelo"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleCloseModal} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button onClick={handleCreateCampaign} className="flex-1" disabled={!formData.name || !formData.template}>
              Criar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
