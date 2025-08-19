"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { Modal } from "../components/ui/Modal"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Select } from "../components/ui/Select"
import { Mail, MousePointer, Send, Plus } from "lucide-react"

// Tipagem para campanha
interface Campaign {
  id: string
  name: string
  description: string
  template: { id: number; name: string; category: string }
  createdAt: string
  status?: "active" | "completed" | "scheduled" | "draft"
  sent?: number
  opens?: number
  clicks?: number
}

// Tipagem para template
interface Template {
  id: number
  name: string
}

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
  })

  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalSent: 0,
    openRate: 0,
    clickRate: 0,
    activeCampaigns: 0,
    scheduledCampaigns: 0,
  })

  // Buscar campanhas e templates do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignRes, templateRes] = await Promise.all([
          fetch("http://localhost:8080/campaigns/"),
          fetch("http://localhost:8080/templates")
        ])
        const campaignsData: Campaign[] = await campaignRes.json()
        const templatesData: Template[] = await templateRes.json()
        setCampaigns(campaignsData)
        setTemplates(templatesData)

        // Calcula os stats
        const totalSent = campaignsData.reduce((acc, c) => acc + (c.sent ?? 0), 0)
        const totalOpens = campaignsData.reduce((acc, c) => acc + (c.opens ?? 0), 0)
        const totalClicks = campaignsData.reduce((acc, c) => acc + (c.clicks ?? 0), 0)
        setStats({
          totalCampaigns: campaignsData.length,
          totalSent,
          openRate: totalSent > 0 ? (totalOpens / totalSent) * 100 : 0,
          clickRate: totalSent > 0 ? (totalClicks / totalSent) * 100 : 0,
          activeCampaigns: campaignsData.filter((c) => c.status === "active").length,
          scheduledCampaigns: campaignsData.filter((c) => c.status === "scheduled").length,
        })
      } catch (err) {
        console.error("Erro ao carregar dados:", err)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateCampaign = async () => {
    if (!formData.template) {
      alert("Selecione um template")
      return
    }

    try {
      const res = await fetch("http://localhost:8080/campaigns/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          templateId: Number(formData.template),
        }),
      })
      if (!res.ok) throw new Error("Erro ao criar campanha")
      const newCampaign = await res.json()
      setCampaigns((prev) => [newCampaign, ...prev])
      setFormData({ name: "", description: "", template: "" })
      setIsModalOpen(false)
    } catch (error) {
      console.error("Erro ao criar campanha:", error)
    }
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
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Campanhas</CardTitle>
            <Mail className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.totalCampaigns}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">E-mails Enviados</CardTitle>
            <Send className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.totalSent.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Cliques</CardTitle>
            <MousePointer className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.clickRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Campanhas Recentes */}
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-700">Campanhas Recentes</CardTitle>
            <CardDescription>Suas últimas campanhas e desempenho</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.slice(0, 5).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{c.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Badge
                        className={
                          c.status === "active"
                            ? "bg-yellow-600 text-white"
                            : c.status === "completed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {c.status ?? "Rascunho"}
                      </Badge>
                      <span>•</span>
                      <span>{c.sent ?? 0} enviados</span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium text-yellow-700">{c.opens ?? 0} aberturas</div>
                    <div className="text-gray-600">{c.clicks ?? 0} cliques</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Criação */}
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
              options={templates.map(t => ({ value: t.id.toString(), label: t.name }))}
              value={formData.template}
              onChange={(value) => handleInputChange("template", value)}
              placeholder="Selecione um template"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleCloseModal} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button
              onClick={handleCreateCampaign}
              className="flex-1"
              disabled={!formData.name || !formData.template}
            >
              Criar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
