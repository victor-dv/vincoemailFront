import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Eye, EyeOff, User } from 'lucide-react';
import swal from 'sweetalert';
import { registerUser } from '../service/UserService';
import { Select } from '../components/ui/Select';

export const Settings: React.FC = () => {
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const handleCreateUser = async () => {
    if (password !== confirmPassword) {
      swal({ icon: "error", title: "As senhas não coincidem!" })
      return
    }
    try {
      await registerUser({ name, username, email, password, role })
      swal({ icon: "success", title: "Usuário criado com sucesso!" })
      setName("")
      setUsername("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setRole("")
    } catch (err: any) {
      swal({
        icon: "error",
        title: "Erro ao criar usuário",
        text: err.response?.data?.message || "Tente novamente mais tarde",
      })
    }
  }

  const informationAccount = [{
    firstName: "João",
    lastName: "Souza",
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
                <Input placeholder="Digite o nome" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <Input placeholder="Digite o username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <Input type="email" placeholder="Digite o e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Confirmar Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <Select
                options={[
                  { value: "ADMIN", label: "Administrador" },
                  { value: "USER", label: "Usuário" },
                ]}
                value={role}
                onChange={(value) => setRole(value)}
                placeholder="Selecione o tipo de usuário"
              />
            </div>


            <Button onClick={handleCreateUser}>
              Criar conta
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};
