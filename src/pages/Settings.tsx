import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User } from 'lucide-react';
import swal from 'sweetalert';

export const Settings: React.FC = () => {

  const informationAccount = [{
    id: 1,
    firstName: "João",
    lastName: "Souza",
    email: "joao@123.com.br",
    senha: "123456"
  }];

  const user = informationAccount[0]

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
                <Input placeholder="Seu nome" defaultValue={user.firstName} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <Input placeholder="Seu sobrenome" defaultValue={user.lastName} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <Input type="email" placeholder="seu@email.com" defaultValue={user.email} />
            </div>

            <Button onClick={() => swal({
              icon: "success",
              title: "Alterações realizadas com sucesso!"
            })}>
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {/* Informações da Conta */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-yellow-600" />
              Crie uma nova conta
            </CardTitle>
            <CardDescription>
              Crie contas para os usuários da sua empres
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <Input placeholder="Seu nome" defaultValue={user.firstName} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <Input placeholder="Seu sobrenome" defaultValue={user.lastName} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <Input type="email" placeholder="seu@email.com" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <Input type="email" placeholder="seu@email.com" defaultValue={user.senha} />
            </div>

            <Button onClick={() => swal({
              icon: "success",
              title: "Alterações realizadas com sucesso!"
            })}>
              Criar conta
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};
