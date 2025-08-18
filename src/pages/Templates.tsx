"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import { Plus, Search, Eye, Edit, Trash2, Mail } from "lucide-react";
import Swal from "sweetalert2";
import { createTemplate, getAllTemplates, deleteTemplates, updateTemplates } from "../service/TempateService";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";

export const Templates: React.FC = () => {
  // Variáveis de estado
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subject: "",
    html: "",
  });


  const categoryOptions = [
    { value: "Newsletter", label: "Newsletter" },
    { value: "Promocional", label: "Promocional" },
    { value: "Lançamento", label: "Lançamento" },
    { value: "Pesquisa", label: "Pesquisa" },
    { value: "Transacional", label: "Transacional" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Newsletter":
        return "bg-blue-100 text-blue-800";
      case "Promocional":
        return "bg-green-100 text-green-800";
      case "Lançamento":
        return "bg-purple-100 text-purple-800";
      case "Pesquisa":
        return "bg-orange-100 text-orange-800";
      case "Transacional":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Buscar templates do backend
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getAllTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Erro ao buscar templates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  // Filtrar templates pela busca
  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funções de modais
  const handleOpenModal = () => setIsModalOpen(true);
  const handleOpenEditModal = (template: any) => {
    setFormData({
      name: template.name,
      description: template.description,
      category: template.category,
      subject: template.subject,
      html: template.html,
    });
    setEditId(template.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", category: "", subject: "", html: "" });
    setIsEditing(false);
    setEditId(null);
  };

  const handleOpenViewModal = (template: any) => {
    setSelectedTemplate(template);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.name.trim() &&
    formData.category &&
    formData.subject.trim() &&
    formData.html.trim();

  // Criar template
  const handleCreateTemplate = async () => {
    try {
      const newTemplate = await createTemplate({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        subject: formData.subject,
        html: formData.html,
      });

      Swal.fire({
        icon: "success",
        title: "Template criado!",
        text: `O template "${newTemplate.name}" foi criado com sucesso.`,
      });

      handleCloseModal();

      // Atualiza lista
      const data = await getAllTemplates();
      setTemplates(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error.response?.data?.message || "Não foi possível criar o template",
      });
    }
  };

  //Modal de editar
  const handleUpdateTemplate = async () => {
    if (!editId) return
    try {
      const updated = await updateTemplates(editId, formData)

      Swal.fire({
        icon: "success",
        title: "Atualizado!",
        text: `O template "${updated.name}" foi atualizado com sucesso.`,
      })

      handleCloseModal()

      // Atualizar lista
      const data = await getAllTemplates()
      setTemplates(data)
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error.response?.data?.message || "Não foi possível atualizar o template",
      })
    }
  }


  if (loading) {
    return <p>Carregando templates...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Modelos de E-mail</h1>
          <p className="text-gray-600">Crie e gerencie seus templates de email personalizados</p>
        </div>
        <Button onClick={handleOpenModal}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>

      {/* Busca */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Lista de templates */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-100 relative rounded-t-lg">
              <div className="absolute top-2 right-2">
                <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
              </div>
              <div className="flex items-center justify-center h-full text-gray-400">
                <Mail className="h-12 w-12" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription className="text-sm">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => handleOpenViewModal(template)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEditModal(template)}
                >
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
                          await deleteTemplates(template.id)
                          Swal.fire({
                            title: "Deletado!",
                            text: "Seu modelo foi excluído.",
                            icon: "success",
                          });

                          const data = await getAllTemplates()
                          setTemplates(data)
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nenhum template */}
      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="mt-8  justify-center ">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Nenhum template encontrado</h3>
              <p className="text-gray-600 mt-2">Tente ajustar sua busca ou crie um novo template</p>
              <Button className="mt-4" onClick={handleOpenModal}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Template
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de criação */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Novo Template de E-mail">
        <div className="space-y-4">
          <Input label="Nome do Template" placeholder="Ex: Newsletter Semanal" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
          <Textarea label="Descrição" placeholder="Descreva o propósito deste template..." value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} rows={3} />
          <Select placeholder="Selecione uma categoria" value={formData.category} onChange={(value) => handleInputChange("category", value)} options={categoryOptions} />
          <Input label="Assunto do E-mail" placeholder="Ex: Newsletter Semanal - Novidades da Semana" value={formData.subject} onChange={(e) => handleInputChange("subject", e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo HTML
            </label>
            <CodeMirror
              value={formData.html}
              height="300px"
              extensions={[html()]}
              onChange={(value) => handleInputChange("html", value)}
              className="rounded-lg border border-gray-300"
            />
          </div>        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleCloseModal}>Cancelar</Button>
          <Button
            onClick={isEditing ? handleUpdateTemplate : handleCreateTemplate}
            disabled={!isFormValid}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            {isEditing ? "Salvar Alterações" : "Criar Template"}
          </Button>
        </div>
      </Modal>

      {/* Modal de visualização */}
      <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal} title="Visualizar Template">
        {selectedTemplate && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedTemplate.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(selectedTemplate.category)}>{selectedTemplate.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600"><strong>Assunto:</strong> {selectedTemplate.subject}</p>
                  <p className="text-sm text-gray-600"><strong>Usado:</strong> {selectedTemplate.usageCount || 0} vezes</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Preview do E-mail</h4>
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span><strong>Assunto:</strong> {selectedTemplate.subject}</span>
                  </div>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto" dangerouslySetInnerHTML={{ __html: selectedTemplate.html }} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Código HTML</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{selectedTemplate.html}</code></pre>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleCloseViewModal}>Fechar</Button>
          <Button
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
            onClick={() => {
              handleCloseViewModal();
              handleOpenEditModal(selectedTemplate);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar Template
          </Button>
        </div>
      </Modal>
    </div>
  );
};
