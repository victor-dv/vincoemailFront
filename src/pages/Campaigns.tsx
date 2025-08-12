import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Select } from "../components/ui/Select";
import Swal from "sweetalert2";

export const Campaigns: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
  });

  const emailTemplates = [
    { value: "newsletter", label: "Newsletter Padrão" },
    { value: "promotional", label: "Promocional" },
    { value: "welcome", label: "Boas-vindas" },
    { value: "announcement", label: "Anúncio" },
    { value: "event", label: "Evento" },
  ];

  const campaigns = [
    {
      id: 1,
      name: "Envio de email para advogados",
      status: "active",
      template: "newsletter",
      sent: 2500,
      opens: 612,
      clicks: 89,
      createdAt: "2024-01-15",
      description: "Campanha para enviar emails aos advogados.",
    },
    {
      id: 2,
      name: "Envio de emails para varas",
      status: "completed",
      template: "promotional",
      sent: 1800,
      opens: 441,
      clicks: 67,
      createdAt: "2024-01-12",
      description: "Campanha para comunicação com as varas.",
    },
    {
      id: 3,
      name: "Envio de emails para varas",
      status: "completed",
      template: "promotional",
      sent: 1800,
      opens: 441,
      clicks: 67,
      createdAt: "2024-01-12",
      description: "Campanha para comunicação com as varas.",
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-yellow-600 text-white">Ativa</Badge>;
      case "completed":
        return <Badge variant="secondary">Concluída</Badge>;
      case "scheduled":
        return <Badge variant="outline">Agendada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveCampaign = () => {
    if (editingCampaign) {
      console.log("Atualizando campanha:", { id: editingCampaign.id, ...formData });
    } else {
      console.log("Criando nova campanha:", formData);
    }
    setFormData({ name: "", description: "", template: "" });
    setEditingCampaign(null);
    setIsModalOpen(false);
  };

  const handleOpenEditModal = (campaign: any) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      description: campaign.description || "",
      template: campaign.template,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", template: "" });
    setEditingCampaign(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Campanhas
          </h1>
          <p className="text-gray-600">Gerencie suas campanhas</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campanhas</CardTitle>
          <CardDescription>Lista completa das suas campanhas</CardDescription>
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
                    {campaign.name}
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>{campaign.template}</TableCell>
                  <TableCell className="text-right">{campaign.sent}</TableCell>
                  <TableCell className="text-right">{campaign.opens}</TableCell>
                  <TableCell className="text-right">{campaign.clicks}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEditModal(campaign)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
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
                            });
                          }
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCampaign ? "Editar Campanha" : "Nova Campanha"}
      >
        <div className="space-y-4">
          <Input
            label="Nome da Campanha"
            placeholder="Digite o nome"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Textarea
            label="Descrição"
            placeholder="Digite a descrição"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <Select
            options={emailTemplates}
            value={formData.template}
            onChange={(value) => handleInputChange("template", value)}
            placeholder="Selecione um modelo"
          />
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleCloseModal} className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleSaveCampaign}
              className="flex-1"
              disabled={!formData.name || !formData.template}
            >
              {editingCampaign ? "Salvar Alterações" : "Criar"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
