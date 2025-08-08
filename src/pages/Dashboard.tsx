import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Progress } from '../components/ui/Progress'
import { Mail, Users, TrendingUp, Eye, MousePointer, Send, Plus } from 'lucide-react'

export const Dashboard: React.FC = () => {
  const stats = {
    totalCampaigns: 24,
    totalSent: 15420,
    openRate: 24.5,
    clickRate: 3.2,
    activeCampaigns: 3,
    scheduledCampaigns: 2
  }

  const recentCampaigns = [
    {
      id: 1,
      name: "Promoção Black Friday 2024",
      status: "active",
      sent: 2500,
      opens: 612,
      clicks: 89,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Newsletter Semanal #45",
      status: "completed",
      sent: 1800,
      opens: 441,
      clicks: 67,
      createdAt: "2024-01-12"
    },
    {
      id: 3,
      name: "Lançamento Produto X",
      status: "scheduled",
      sent: 0,
      opens: 0,
      clicks: 0,
      createdAt: "2024-01-10"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Visão geral das suas campanhas de email marketing
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Campanhas
            </CardTitle>
            <Mail className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.totalCampaigns}</div>
            <p className="text-xs text-gray-600">
              +2 desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              E-mails Enviados
            </CardTitle>
            <Send className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.totalSent.toLocaleString()}</div>
            <p className="text-xs text-gray-600">
              +12% desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Abertura
            </CardTitle>
            <Eye className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.openRate}%</div>
            <p className="text-xs text-gray-600">
              +2.1% desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Cliques
            </CardTitle>
            <MousePointer className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.clickRate}%</div>
            <p className="text-xs text-gray-600">
              +0.3% desde o mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Campanhas Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-700">Campanhas Recentes</CardTitle>
            <CardDescription>
              Suas últimas campanhas e seu desempenho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{campaign.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Badge 
                        className={
                          campaign.status === 'active' ? 'bg-yellow-600 text-white' : 
                          campaign.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                          'bg-blue-100 text-blue-800'
                        }
                      >
                        {campaign.status === 'active' ? 'Ativa' : 
                         campaign.status === 'completed' ? 'Concluída' : 
                         'Agendada'}
                      </Badge>
                      <span>•</span>
                      <span>{campaign.sent} enviados</span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium text-yellow-700">{campaign.opens} aberturas</div>
                    <div className="text-gray-600">{campaign.clicks} cliques</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-700">Performance Geral</CardTitle>
            <CardDescription>
              Métricas de engajamento das suas campanhas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Taxa de Abertura</span>
                <span className="font-medium text-yellow-700">{stats.openRate}%</span>
              </div>
              <Progress value={stats.openRate} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Taxa de Cliques</span>
                <span className="font-medium text-yellow-700">{stats.clickRate}%</span>
              </div>
              <Progress value={stats.clickRate} />
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Campanhas Ativas</span>
                <Badge>{stats.activeCampaigns}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Campanhas Agendadas</span>
                <Badge className="bg-blue-100 text-blue-800">{stats.scheduledCampaigns}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
