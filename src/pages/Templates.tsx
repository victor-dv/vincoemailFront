"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import { Input } from "../components/ui/Input"
import { Modal } from "../components/ui/Modal"
import { Select } from "../components/ui/Select"
import { Textarea } from "../components/ui/Textarea"
import { Plus, Search, Eye, Edit, Copy, Trash2, Mail } from "lucide-react"
import Swal from "sweetalert2"

export const Templates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subject: "",
    content: "",
  })

  const templates = [
    {
      id: 1,
      name: "Pesquisa de satisfação",
      description: "Envio de emails realizado para pesquisa de satisfação de nossos clientes.",
      category: "Pesquisa",
      lastUsed: "2024-01-15",
      usageCount: 12,
      subject: "Newsletter Semanal - Novidades da Semana",
      content: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  <!-- Cabeçalho -->
  <header style="background-color: #f8f9fa; padding: 20px; text-align: center;">
    <h1 style="color: #333; margin: 0;">Pesquisa de Satisfação</h1>
    <p style="color: #666; margin: 5px 0 0 0;">Sua opinião é muito importante para nós</p>
  </header>

  <!-- Conteúdo -->
  <main style="padding: 30px 20px;">
    <h2 style="color: #333; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
      Como foi sua experiência?
    </h2>
    <p style="color: #555; line-height: 1.6;">
      Queremos saber como foi seu atendimento com a <b>Vinco Leilões</b>. Sua resposta nos ajudará a melhorar nossos serviços e garantir sempre a melhor experiência para você.
    </p>

    <!-- Bloco com os botões -->
    <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #D4AF37; text-align: center;">
      <h3 style="color: #333; margin-top: 0;">Avalie nosso atendimento</h3>
      <p style="color: #555;">Clique em uma das opções abaixo:</p>

      <div style="margin-top: 15px;">
        <a href="https://exemplo.com/pesquisa?nota=10" 
           style="display:inline-block; background-color:#4CAF50; color:white; padding:12px 20px; margin:5px; border-radius:5px; text-decoration:none; font-weight:bold;">
          😊 Bom
        </a>
        <a href="https://exemplo.com/pesquisa?nota=7" 
           style="display:inline-block; background-color:#FFC107; color:white; padding:12px 20px; margin:5px; border-radius:5px; text-decoration:none; font-weight:bold;">
          😐 Médio
        </a>
        <a href="https://exemplo.com/pesquisa?nota=4" 
           style="display:inline-block; background-color:#F44336; color:white; padding:12px 20px; margin:5px; border-radius:5px; text-decoration:none; font-weight:bold;">
          ☹️ Ruim
        </a>
      </div>
    </div>
  </main>

  <!-- Rodapé -->
  <footer style="background-color: #333; color: white; padding: 20px; text-align: center;">
    <p style="margin: 0;">© 2024 Vinco Leilões. Todos os direitos reservados.</p>
    <p style="margin: 5px 0 0 0;">
      <a href="https://vincoleiloes.com.br" style="color:#D4AF37; text-decoration:none;">vincoleiloes.com.br</a>
    </p>
  </footer>
</div>

      `,
    },
    {
      id: 2,
      name: "Emails para advogados",
      description: "Emails realizado para propor serviço aos advogados",
      category: "Promocional",
      lastUsed: "2024-01-14",
      usageCount: 8,
      subject: "🔥 Em busca de Leilão!",
      content: `
       <html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Email Vinco Leilões</title>
    <style>
        body {
            background-color: white;
            font-size: 18px;
            font-family: Arial, sans-serif;
        }
        ul {
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <p>Prezado(a) Dr(a). <b>Nome do Cliente</b>,</p>
    <p>Sou <b>Victor Alberto S. Frazão</b>, leiloeiro especializado em
        leilões de imóveis, veículos e diversos. Entro em contato para apresentar meus serviços e explorar a possibilidade de
        colaborar com seu escritório, especialmente no processo <b>0000000-00.2025.8.26.0000</b>, em trâmite na <b>Vara X</b> da comarca de <b>Cidade Y</b>,
        o qual, futuramente, poderá ser necessário a indicação de um leiloeiro.
    </p>
    <p>Como leiloeiro, tenho vasta experiência na condução de leilões que não apenas
        maximizam os resultados financeiros, mas também garantem que todo o processo seja conduzido de forma transparente e
        eficiente.</p>
    <p>Estamos à disposição para apoiá-lo(a) em quaisquer processos de venda de bens, como:</p>
    <ul>
        <li>Leilões de bens penhorados em processo de execução;</li>
        <li>Falências: Arrecadação, loteamento, sugestão de preço e venda</li>
        <li>Leilões oriundos de contratos de alienações fiduciárias;</li>
        <li>Leilões para auxílio na extinção de condomínio ou cisão de empresas;</li>
        <li>Leilões extrajudiciais de desmobilização de ativos, bens inservíveis ou excedentes.</li>
    </ul>
    <ul>
        <li>
            <b>Novidade:</b> 
            Apresentamos o <b>Leilão Reverso</b> para processos de <b>Recuperação de Empresas</b>. 
            Essa solução estratégica visa a negociação de dívidas, onde credores competem para oferecer os maiores descontos. 
            O credor com a melhor oferta garante a obtenção do crédito, destacando-se na disputa entre credores quirografários.
        </li>
    </ul>
    <p>Será um prazer mantermos contato e explorar futuras parcerias. Estou à disposição para agendarmos um encontro e
        discutir como podemos contribuir com seus processos.</p>
    <p>Com o intuito de facilitar o trabalho, segue em anexo minuta de petição de indicação leiloeiro</p>

    <p><b>Contato:</b></p>
    <ul>
        <li><b>Telefone Coml.: </b>11 2424-8373</li>
        <li><b>WhatsApp Direto: </b>11 9.4766-4827</li>
        <li><b>Site: </b><a href="https://vincoleiloes.com.br/">https://vincoleiloes.com.br/</a></li>
    </ul>

    <p>Atenciosamente,</p>

    <a href="https://vincoleiloes.com.br/">
        <img src="http://sfrazao1.dominiotemporario.com/VincoAssinaturas/VICTOR.png" alt="Assinatura Leiloeiro Victor Frazão" width="80%">
    </a>

    <br><br>

    <span>
        <a href="https://vincoleiloes.com.br/">
            <img src="https://encurtador.com.br/9Vj8p" alt="Banner Vinco Leilões" style="border-radius: 10px;" width="80%">
        </a>
    </span>
</body>
</html>
      `,
    }
  ]

  const categoryOptions = [
    { value: "Newsletter", label: "Newsletter" },
    { value: "Promocional", label: "Promocional" },
    { value: "Lançamento", label: "Lançamento" },
    { value: "Pesquisa", label: "Pesquisa" },
    { value: "Transacional", label: "Transacional" },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Newsletter":
        return "bg-blue-100 text-blue-800"
      case "Promocional":
        return "bg-green-100 text-green-800"
      case "Lançamento":
        return "bg-purple-100 text-purple-800"
      case "Pesquisa":
        return "bg-orange-100 text-orange-800"
      case "Transacional":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({
      name: "",
      description: "",
      category: "",
      subject: "",
      content: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCreateTemplate = () => {
    console.log("Criando template:", formData)
    // Aqui você faria a chamada para a API
    handleCloseModal()
  }

  const handleViewTemplate = (template: any) => {
    setSelectedTemplate(template)
    setIsViewModalOpen(true)
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedTemplate(null)
  }

  const isFormValid = formData.name.trim() && formData.category && formData.subject.trim() && formData.content.trim()

  return (
    <div className="space-y-6">
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
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>Usado {template.usageCount} vezes</span>
                <span>Última vez: {new Date(template.lastUsed).toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleViewTemplate(template)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">
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
                          text: "Seu modelo foi excluída.",
                          icon: "success",
                        });
                      }
                    })
                  }
                  variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Novo Template de E-mail"
      >
        <div className="space-y-4">
          <Input
            label="Nome do Template"
            placeholder="Ex: Newsletter Semanal"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />

          <Textarea
            label="Descrição"
            placeholder="Descreva o propósito deste template..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={3}
          />

          <Select
            placeholder="Selecione uma categoria"
            value={formData.category}
            onChange={(value) => handleInputChange("category", value)}
            options={categoryOptions}
          />

          <Input
            label="Assunto do E-mail"
            placeholder="Ex: Newsletter Semanal - Novidades da Semana"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
          />

          <Textarea
            label="Conteúdo HTML"
            placeholder="Cole aqui o código HTML do seu template..."
            value={formData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            onClick={handleCreateTemplate}
            disabled={!isFormValid}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            Criar Template
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        title="Visualizar Template"
      >
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
                  <p className="text-sm text-gray-600">
                    <strong>Assunto:</strong> {selectedTemplate.subject}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Usado:</strong> {selectedTemplate.usageCount} vezes
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Preview do E-mail</h4>
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>
                      <strong>Assunto:</strong> {selectedTemplate.subject}
                    </span>
                  </div>
                </div>
                <div
                  className="p-4 max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: selectedTemplate.content }}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Código HTML</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{selectedTemplate.content}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleCloseViewModal}>
            Fechar
          </Button>
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
            <Edit className="mr-2 h-4 w-4" />
            Editar Template
          </Button>
        </div>
      </Modal>
    </div>
  )
}
