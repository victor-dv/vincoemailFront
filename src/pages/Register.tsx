"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, User, Building, Eye, EyeOff } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card } from "../components/ui/Card"
import logo from "../assets/logo.png"
import Swal from "sweetalert2"

import { registerUser } from "../service/UserService"

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                title: "As senhas não coincidem!",
                icon: "error",
                draggable: true
            });
            return
        }
        if (/\s/.test(formData.username)) {
            Swal.fire({
                title: "O username não pode conter espaços!",
                icon: "error",
                draggable: true
            });
            return;
        }

        setIsLoading(true)
        try {
            await registerUser({
                name: formData.name,
                email: formData.email,
                username: formData.username,
                password: formData.password,
            });
            await new Promise(resolve => setTimeout(resolve, 2000));

            Swal.fire({
                title: "Conta criada com sucesso!",
                icon: "success",
                timer: 1700,
                draggable: true
            });
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate("/login");
        } catch (error: any) {
            await new Promise(resolve => setTimeout(resolve, 500));
            Swal.fire({
                title: error.response?.data,
                icon: "error",
                draggable: true
            });

            //alert("Erro ao criar conta: " + (error.response?.data || error.message));
        } finally {
            setIsLoading(false);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8 shadow-xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-rjustify-center mx-auto mb-4">
                        <img src={logo} alt="" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">VincoEmail</h1>
                    <p className="text-gray-600">Crie sua conta</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="pl-10"
                                placeholder="Seu nome completo"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-10"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="pl-10"
                                placeholder="Username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-10 pr-10"
                                placeholder="••••••••"
                                required
                                maxLength={20}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="pl-10 pr-10"
                                placeholder="••••••••"
                                required
                                maxLength={20}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>


                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "Criando conta..." : "Criar conta"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Já tem uma conta?{" "}
                        <Link to="/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
                            Faça login
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    )
}
