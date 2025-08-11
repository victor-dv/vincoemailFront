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
import { Plus, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Select } from "../components/ui/Select";

export const Campaigns: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      template: "Email Advogados",
      sent: 2500,
      opens: 612,
      clicks: 89,
      openRate: 24.5,
      clickRate: 3.6,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Envio de emails para varas",
      status: "completed",
      template: "Envio para varas",
      sent: 1800,
      opens: 441,
      clicks: 67,
      openRate: 24.5,
      clickRate: 3.7,
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      name: "Envio de emails para clientes",
      status: "scheduled",
      template: "Marketing",
      sent: 0,
      opens: 0,
      clicks: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: "2024-01-10",
    },
    {
      id: 4,
      name: "Pesquisa de Satisfação",
      status: "active",
      template: "Pesquisa",
      sent: 0,
      opens: 0,
      clicks: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: "2024-01-08",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-yellow-600 text-white">Ativa</Badge>;
      case "completed":
        return <Badge variant="secondary">Concluída</Badge>;
      case "scheduled":
        return <Badge variant="outline">Agendada</Badge>;
      case "draft":
        return <Badge variant="outline">Rascunho</Badge>;
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

  const handleCreateCampaign = () => {
    // TODO: Integrar com API
    console.log("Nova campanha:", formData);

    // Reset form and close modal
    setFormData({ name: "", description: "", template: "" });
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", template: "" });
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
          <Plus className="mr-2 h-4 w-4 " />
          Nova Campanha
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campanhas</CardTitle>
          <CardDescription>
            Lista completa das suas campanhas de email
          </CardDescription>
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
                <TableHead className="text-right">Taxa Abertura</TableHead>
                <TableHead className="text-right">Taxa Cliques</TableHead>
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
                        Criada em{" "}
                        {new Date(campaign.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>{campaign.template}</TableCell>
                  <TableCell className="text-right">
                    {campaign.sent.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.opens.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.openRate > 0 ? `${campaign.openRate}%` : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.clickRate > 0 ? `${campaign.clickRate}%` : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nova Campanha"
      >
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
            <label className="block text-sm font-medium text-gray-700">
              Modelo de Email
            </label>
            <Select
              options={emailTemplates}
              value={formData.template}
              onChange={(value) => handleInputChange("template", value)}
              placeholder="Selecione um modelo"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="flex-1 bg-transparent"
            >
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
  );
};
