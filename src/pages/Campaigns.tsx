"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table"
import { Plus, Edit, Trash2, Settings } from "lucide-react"
import Swal from "sweetalert2"
import { Modal } from "../components/ui/Modal"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Select } from "../components/ui/Select"
import { getCampaigns, getTemplates, createCampaign, Campaign, Template, deleteCampaign } from "../service/CampaignService"

export const Campaigns: React.FC = () => {
  const navigate = useNavigate()

  const [editId, setEditId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    templateId: "",
  })

  useEffect(() => {
    getCampaigns().then(setCampaigns)
    getTemplates().then(setTemplates)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateCampaign = async () => {
    try {
      const newCampaign = await createCampaign(formData)
      setCampaigns((prev) => [...prev, newCampaign]) // atualiza a lista sem precisar reload
      Swal.fire("Sucesso!", "Campanha criada com sucesso!", "success")
      setFormData({ name: "", description: "", templateId: "" })
      setIsModalOpen(false)
    } catch (err) {
      Swal.fire("Erro!", "Não foi possível criar a campanha", "error")
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({ name: "", description: "", templateId: "" })
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

  const handleConfigureInputs = (campaignId: string) => {
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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Campanha</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Criada em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.template?.name}</TableCell>
                  <TableCell>
                    {new Date(campaign.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
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
                          }).then(async (result) => {
                            if (result.isConfirmed) {

                              try {
                                await deleteCampaign(campaign.id)
                                Swal.fire({
                                  title: "Deletado!",
                                  text: "Sua campanha foi excluído.",
                                  icon: "success",
                                });

                                const data = await getCampaigns()
                                setCampaigns(data)
                              } catch (error: any) {
                                Swal.fire({
                                  icon: "error",
                                  title: "Erro",
                                  text: error.message
                                })
                              }
                            }
                          })
                        }
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-transparent"
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
              options={templates.map((t) => ({ value: t.id.toString(), label: t.name }))}
              value={formData.templateId}
              onChange={(value) => handleInputChange("templateId", value)}
              placeholder="Selecione um modelo"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleCloseModal} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button
              onClick={handleCreateCampaign}
              className="flex-1"
              disabled={!formData.name || !formData.templateId}
            >
              Criar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
