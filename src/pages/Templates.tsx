import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Plus, Search, Eye, Edit, Copy, Trash2, Mail } from 'lucide-react'

export const Templates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const templates = [
    {
      id: 1,
      name: "Newsletter Padrão",
      description: "Template para newsletters semanais com seções de notícias e atualizações",
      category: "Newsletter",
      lastUsed: "2024-01-15",
      usageCount: 12
    },
    {
      id: 2,
      name: "Promoção Black Friday",
      description: "Template promocional com destaque para ofertas e descontos especiais",
      category: "Promocional",
      lastUsed: "2024-01-14",
      usageCount: 8
    },
    {
      id: 3,
      name: "Lançamento de Produto",
      description: "Template para anúncio de novos produtos com galeria de imagens",
      category: "Lançamento",
      lastUsed: "2024-01-10",
      usageCount: 5
    },
    {
      id: 4,
      name: "Pesquisa de Satisfação",
      description: "Template para coleta de feedback dos clientes com formulário integrado",
      category: "Pesquisa",
      lastUsed: "2024-01-08",
      usageCount: 3
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Newsletter':
        return 'bg-blue-100 text-blue-800'
      case 'Promocional':
        return 'bg-green-100 text-green-800'
      case 'Lançamento':
        return 'bg-purple-100 text-purple-800'
      case 'Pesquisa':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Modelos de E-mail</h1>
          <p className="text-gray-600">
            Crie e gerencie seus templates de email personalizados
          </p>
        </div>
        <Button>
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
                <Badge className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
              </div>
              <div className="flex items-center justify-center h-full text-gray-400">
                <Mail className="h-12 w-12" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>Usado {template.usageCount} vezes</span>
                <span>Última vez: {new Date(template.lastUsed).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
