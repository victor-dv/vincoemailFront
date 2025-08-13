"use client"

import type React from "react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"
import { FileUpload } from "../components/ui/FileUpload"
import { Badge } from "../components/ui/Badge"
import { ArrowLeft, Plus, Trash2, Download, Upload } from "lucide-react"

interface CustomField {
  id: string
  name: string
  type: "text" | "email" | "number" | "date" | "select"
  required: boolean
  options?: string[]
}

export const CampaignInputs: React.FC = () => {
  const { campaignId } = useParams()
  const navigate = useNavigate()

  const [inputMethod, setInputMethod] = useState<"manual" | "file">("manual")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: "1", name: "Nome", type: "text", required: true },
    { id: "2", name: "Email", type: "email", required: true },
  ])

  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})

  const [newField, setNewField] = useState({
    name: "",
    type: "text" as const,
    required: false,
    options: [] as string[],
  })

  const fieldTypes = [
    { value: "text", label: "Texto" },
    { value: "email", label: "Email" },
    { value: "number", label: "Número" },
    { value: "date", label: "Data" },
    { value: "select", label: "Seleção" },
  ]

  const handleAddField = () => {
    if (newField.name.trim()) {
      const field: CustomField = {
        id: Date.now().toString(),
        name: newField.name,
        type: newField.type,
        required: newField.required,
      }

      setCustomFields([...customFields, field])
      setNewField({ name: "", type: "text", required: false, options: [] })
    }
  }

  const handleRemoveField = (fieldId: string) => {
    setCustomFields(customFields.filter((field) => field.id !== fieldId))
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    // Aqui você processaria o arquivo XLSX
    console.log("Arquivo selecionado:", file)
  }

  const handleFileRemove = () => {
    setSelectedFile(null)
  }

  const handleProcessFile = () => {
    if (selectedFile) {
      // Aqui você processaria o arquivo XLSX e extrairia os dados
      console.log("Processando arquivo:", selectedFile.name)
      // Implementar lógica de processamento do XLSX
    }
  }

  const downloadTemplate = () => {
    // Gerar e baixar template XLSX baseado nos campos customizados
    console.log("Baixando template com campos:", customFields)
  }

  const handleFieldValueChange = (fieldId: string, value: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/campaigns")} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Configurar Inputs - Campanha #{campaignId}
            </h1>
            <p className="text-gray-600">Configure os campos de entrada para esta campanha</p>
          </div>
        </div>
      </div>

      {/* Método de Input */}
      <Card>
        <CardHeader>
          <CardTitle>Método de Entrada de Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              variant={inputMethod === "manual" ? "default" : "outline"}
              onClick={() => setInputMethod("manual")}
              className="flex-1"
            >
              Entrada Manual
            </Button>
            <Button
              variant={inputMethod === "file" ? "default" : "outline"}
              onClick={() => setInputMethod("file")}
              className="flex-1"
            >
              Upload de Arquivo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configuração de Campos Customizados */}
      <Card>
        <CardHeader>
          <CardTitle>Campos Personalizados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Lista de campos existentes */}
          <div className="space-y-2">
            {customFields.map((field) => (
              <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{field.name}</span>
                  <Badge variant="outline">{fieldTypes.find((t) => t.value === field.type)?.label}</Badge>
                  {field.required && <Badge className="bg-yellow-600 text-white">Obrigatório</Badge>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveField(field.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Adicionar novo campo */}
          <div className="border-t pt-4 space-y-3">
            <h4 className="font-medium text-gray-900">Adicionar Novo Campo</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                placeholder="Nome do campo"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              />
              <Select
                options={fieldTypes}
                value={newField.type}
                onChange={(value) => setNewField({ ...newField, type: value as any })}
                placeholder="Tipo do campo"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="required" className="text-sm text-gray-700">
                  Obrigatório
                </label>
              </div>
            </div>
            <Button onClick={handleAddField} disabled={!newField.name.trim()}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Campo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload de Arquivo */}
      {inputMethod === "file" && (
        <Card>
          <CardHeader>
            <CardTitle>Upload de Arquivo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Faça upload de um arquivo XLSX, XLS ou CSV com os dados dos destinatários
              </p>
              <Button variant="outline" onClick={downloadTemplate}>
                <Download className="mr-2 h-4 w-4" />
                Baixar Template
              </Button>
            </div>

            <FileUpload onFileSelect={handleFileSelect} onFileRemove={handleFileRemove} selectedFile={selectedFile} />

            {selectedFile && (
              <div className="flex justify-end">
                <Button onClick={handleProcessFile}>
                  <Upload className="mr-2 h-4 w-4" />
                  Processar Arquivo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Entrada Manual */}
      {inputMethod === "manual" && (
        <Card>
          <CardHeader>
            <CardTitle>Entrada Manual de Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customFields.map((field) => (
                <div key={field.id}>
                  {field.type === "select" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.name}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <Select
                        options={field.options?.map((opt) => ({ value: opt, label: opt })) || []}
                        value={fieldValues[field.id] || ""}
                        onChange={(value) => handleFieldValueChange(field.id, value)}
                        placeholder={`Selecione ${field.name}`}
                      />
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.name}
                      label={field.name}
                      required={field.required}
                      value={fieldValues[field.id] || ""}
                      onChange={(e) => handleFieldValueChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button>Salvar Dados</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
