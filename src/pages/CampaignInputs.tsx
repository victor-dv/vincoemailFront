"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import * as XLSX from "xlsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { ArrowLeft, Upload, FileSpreadsheet, Send, AlertCircle, CheckCircle } from "lucide-react"

interface ImportedData {
  [key: string]: any
}

interface ImportState {
  data: ImportedData[]
  columns: string[]
  fileName: string
  isLoading: boolean
  error: string | null
  success: string | null
}

export const CampaignInputs: React.FC = () => {
  const { campaignId } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [importState, setImportState] = useState<ImportState>({
    data: [],
    columns: [],
    fileName: "",
    isLoading: false,
    error: null,
    success: null,
  })

  const [editingCell, setEditingCell] = useState<{ row: number; column: string } | null>(null)
  const [editingValue, setEditingValue] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImportState((prev) => ({ ...prev, isLoading: true, error: null, success: null }))

    try {
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: "array" })

      // Pegar primeira aba
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]

      // Converter para JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

      if (jsonData.length === 0) {
        throw new Error("Arquivo vazio ou sem dados válidos")
      }

      // Primeira linha como cabeçalho
      const headers = jsonData[0].map((header: any) => String(header).trim()).filter(Boolean)

      if (headers.length === 0) {
        throw new Error("Nenhum cabeçalho válido encontrado")
      }

      // Converter linhas de dados
      const dataRows = jsonData
        .slice(1)
        .filter((row) => row.some((cell) => cell !== undefined && cell !== null && String(cell).trim() !== ""))
        .map((row, index) => {
          const rowData: ImportedData = { _id: index }
          headers.forEach((header, colIndex) => {
            rowData[header] = row[colIndex] !== undefined ? String(row[colIndex]).trim() : ""
          })
          return rowData
        })

      setImportState({
        data: dataRows,
        columns: headers,
        fileName: file.name,
        isLoading: false,
        error: null,
        success: `${dataRows.length} registros importados com sucesso!`,
      })
    } catch (error) {
      console.error("[v0] Erro ao processar arquivo:", error)
      setImportState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Erro ao processar arquivo",
      }))
    }

    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const startEditing = (row: number, column: string) => {
    const currentValue = importState.data[row][column] || ""
    setEditingCell({ row, column })
    setEditingValue(String(currentValue))
  }

  const saveEdit = () => {
    if (!editingCell) return

    setImportState((prev) => ({
      ...prev,
      data: prev.data.map((row, index) =>
        index === editingCell.row ? { ...row, [editingCell.column]: editingValue } : row,
      ),
    }))

    setEditingCell(null)
    setEditingValue("")
  }

  const cancelEdit = () => {
    setEditingCell(null)
    setEditingValue("")
  }

  const handleSendData = async () => {
    if (importState.data.length === 0) return

    setIsSending(true)
    setImportState((prev) => ({ ...prev, error: null, success: null }))

    try {
      const response = await fetch("/api/importar-clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignId,
          fileName: importState.fileName,
          columns: importState.columns,
          data: importState.data.map((row) => {
            const { _id, ...cleanRow } = row
            return cleanRow
          }),
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      setImportState((prev) => ({
        ...prev,
        success: `Dados enviados com sucesso! ${result.message || ""}`,
      }))
    } catch (error) {
      console.error("[v0] Erro ao enviar dados:", error)
      setImportState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Erro ao enviar dados para o servidor",
      }))
    } finally {
      setIsSending(false)
    }
  }

  const clearData = () => {
    setImportState({
      data: [],
      columns: [],
      fileName: "",
      isLoading: false,
      error: null,
      success: null,
    })
    setEditingCell(null)
    setEditingValue("")
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
              Importar Clientes - Campanha {campaignId}
            </h1>
            <p className="text-gray-600">Importe dados de planilhas Excel (.xlsx) e edite antes de enviar</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-700 flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5" />
            Importar Arquivo Excel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-yellow-800">
            <p>
              <strong>Instruções:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Selecione um arquivo Excel (.xlsx)</li>
              <li>A primeira linha será usada como cabeçalho das colunas</li>
              <li>Dados serão carregados da primeira aba da planilha</li>
              <li>Você pode editar os dados antes de enviar</li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={importState.isLoading}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              {importState.isLoading ? "Processando..." : "Selecionar Arquivo"}
            </Button>

            {importState.fileName && (
              <div className="flex items-center text-sm text-gray-600">
                <FileSpreadsheet className="mr-1 h-4 w-4" />
                {importState.fileName}
              </div>
            )}

            {importState.data.length > 0 && (
              <Button
                variant="outline"
                onClick={clearData}
                className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
              >
                Limpar Dados
              </Button>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="hidden" />
        </CardContent>
      </Card>

      {/* Status Messages */}
      {importState.error && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="pt-4">
            <div className="flex items-center text-red-700">
              <AlertCircle className="mr-2 h-5 w-5" />
              <span>{importState.error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {importState.success && (
        <Card className="border-green-300 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center text-green-700">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>{importState.success}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Table */}
      {importState.data.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-900">Dados Importados ({importState.data.length} registros)</CardTitle>
            <Button
              onClick={handleSendData}
              disabled={isSending || importState.data.length === 0}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSending ? "Enviando..." : "Enviar Dados"}
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto max-h-96 border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 border-b w-16">#</th>
                    {importState.columns.map((column) => (
                      <th key={column} className="px-4 py-3 text-left font-medium text-gray-700 border-b min-w-32">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {importState.data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-500 font-mono text-xs">{rowIndex + 1}</td>
                      {importState.columns.map((column) => {
                        const isEditing = editingCell?.row === rowIndex && editingCell?.column === column
                        const value = row[column] || ""

                        return (
                          <td key={column} className="px-4 py-2">
                            {isEditing ? (
                              <Input
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveEdit()
                                  if (e.key === "Escape") cancelEdit()
                                }}
                                onBlur={saveEdit}
                                className="h-8 text-sm"
                                autoFocus
                              />
                            ) : (
                              <div
                                className="cursor-pointer hover:bg-yellow-50 p-1 rounded min-h-6 flex items-center"
                                onClick={() => startEditing(rowIndex, column)}
                                title="Clique para editar"
                              >
                                {value || <span className="text-gray-400 italic text-xs">Clique para editar</span>}
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {importState.data.length === 0 && !importState.isLoading && (
        <Card className="text-center py-12">
          <CardContent>
            <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum arquivo importado</h3>
            <p className="text-gray-600 mb-4">Selecione um arquivo Excel para começar a importação de clientes</p>
            <Button onClick={() => fileInputRef.current?.click()} className="bg-yellow-600 hover:bg-yellow-700">
              <Upload className="mr-2 h-4 w-4" />
              Selecionar Arquivo Excel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
