"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table"
import { Plus, Edit, Trash2, Settings } from "lucide-react"
import Swal from "sweetalert2"
import { Modal } from "../components/ui/Modal"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Select } from "../components/ui/Select"

export const Campaigns: React.FC = () => {
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
  })

  const emailTemplates = [
    { value: "newsletter", label: "Newsletter Padrão" },
    { value: "promotional", label: "Promocional" },
    { value: "welcome", label: "Boas-vindas" },
    { value: "announcement", label: "Anúncio" },
    { value: "event", label: "Evento" },
  ]

  const campaigns = [
    {
      id: 1,
      name: "Promoção Black Friday 2024",
      status: "active",
      template: "Promocional",
      sent: 2500,
      opens: 612,
      clicks: 89,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Newsletter Semanal #45",
      status: "completed",
      template: "Newsletter",
      sent: 1800,
      opens: 441,
      clicks: 67,
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      name: "Lançamento Produto X",
      status: "scheduled",
      template: "Lançamento",
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
    console.log("Nova campanha:", formData)
    setFormData({ name: "", description: "", template: "" })
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({ name: "", description: "", template: "" })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-yellow-600 text-white">Ativa</Badge>
      case "completed":
        return <Badge variant="secondary">Concluída</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Agendada</Badge>
      case "draft":
        return <Badge variant="outline">Rascunho</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleConfigureInputs = (campaignId: number) => {
    navigate(`/campaigns/${campaignId}/inputs`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Campanhas</h1>
          <p className="text-gray-600">Gerencie todas as suas campanhas de email marketing</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Lista de campanhas */}
      <Card>
        <CardHeader>
          <CardTitle>Campanhas</CardTitle>
          <CardDescription>Lista completa das suas campanhas de email</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Campanha</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Template</TableHead>
                <TableHead className="text-right">Enviados</TableHead>
                <TableHead className="text-right">Aberturas</TableHead>
                <TableHead className="text-right">Cliques</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{campaign.name}</div>
                      <div className="text-sm text-gray-600">
                        Criada em {new Date(campaign.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>{campaign.template}</TableCell>
                  <TableCell className="text-right">{campaign.sent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.opens.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleConfigureInputs(campaign.id)}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() =>
                          Swal.fire({
                            title: "Você tem certeza?",
                            text: "Não será possível reverter esta ação!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Deletar!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire({
                                title: "Deletado!",
                                text: "Sua campanha foi excluída.",
                                icon: "success",
                              })
                            }
                          })
                        }
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de criação */}
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
