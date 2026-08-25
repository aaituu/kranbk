"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Неверный email или пароль");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Italian Flag Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/3 bg-gradient-to-b from-[#009246] to-[#007a3a]" />
        <div className="w-1/3 bg-gradient-to-b from-white to-gray-100" />
        <div className="w-1/3 bg-gradient-to-b from-[#CE2B37] to-[#a82330]" />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md mx-4 bg-white/95 backdrop-blur-lg shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Logo */}
          <div className="text-3xl font-serif font-bold">
            <span className="text-[#009246]">MARRI</span>
            <span className="text-gray-400">O</span>
            <span className="text-[#CE2B37]">NI</span>
            <span className="text-gray-500 ml-2 text-xl font-light">DESIGN</span>
          </div>
          
          {/* Italian stripe under logo */}
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#009246] via-white to-[#CE2B37] rounded-full" />
          
          <div>
            <CardTitle className="text-2xl text-gray-900">Вход в админ-панель</CardTitle>
            <CardDescription className="mt-2">
              Введите ваши учётные данные для входа
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-[#009246] focus:ring-[#009246]"
                  placeholder="admin@sa-consulting.kz"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Пароль</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:border-[#009246] focus:ring-[#009246]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#009246] hover:bg-[#007a3a] text-white font-semibold py-6 text-lg"
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-500 hover:text-[#009246] transition-colors">
              ← Вернуться на сайт
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
