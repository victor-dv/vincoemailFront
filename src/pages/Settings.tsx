import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { User, Mail, Bell, CreditCard, Key } from 'lucide-react'

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Configurações</h1>
        <p className="text-gray-600">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <div className="grid gap-6">
        {/* Informações da Conta */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-yellow-600" />
              Informações da Conta
            </CardTitle>
            <CardDescription>
              Atualize suas informações pessoais e de contato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <Input placeholder="Seu nome" defaultValue="João" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sobrenome</label>
                <Input placeholder="Seu sobrenome" defaultValue="Silva" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <Input type="email" placeholder="seu@email.com" defaultValue="joao@empresa.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Empresa</label>
              <Input placeholder="Nome da empresa" defaultValue="Minha Empresa Ltda" />
            </div>
            <Button>Salvar Alterações</Button>
          </CardContent>
        </Card>

        {/* Configurações de E-mail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-yellow-600" />
              Configurações de E-mail
            </CardTitle>
            <CardDescription>
              Configure as informações do remetente e assinatura padrão
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome do Remetente</label>
                <Input placeholder="Nome que aparecerá nos e-mails" defaultValue="João Silva" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">E-mail do Remetente</label>
                <Input type="email" placeholder="remetente@empresa.com" defaultValue="noreply@empresa.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-mail de Resposta</label>
              <Input type="email" placeholder="resposta@empresa.com" defaultValue="contato@empresa.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Assinatura Padrão</label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Sua assinatura padrão..."
                defaultValue="Atenciosamente,&#10;João Silva&#10;Minha Empresa Ltda&#10;(11) 99999-9999"
                rows={4}
              />
            </div>
            <Button>Salvar Configurações</Button>
          </CardContent>
        </Card>

        {/* Plano e Faturamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-yellow-600" />
              Plano e Faturamento
            </CardTitle>
            <CardDescription>
              Informações sobre seu plano atual e histórico de pagamentos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium">Plano Professional</div>
                <div className="text-sm text-gray-600">
                  Até 50.000 e-mails por mês
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                <div className="text-sm text-gray-600 mt-1">
                  R$ 99,90/mês
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>E-mails enviados este mês</span>
                <span>15.420 / 50.000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '30.84%' }}></div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Alterar Plano</Button>
              <Button variant="outline">Histórico de Pagamentos</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
