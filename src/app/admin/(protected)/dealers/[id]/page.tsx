"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function EditDealerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    logo: "",
    isActive: true,
    sortOrder: 0,
  });

  useEffect(() => {
    async function fetchDealer() {
      try {
        const response = await fetch(`/api/dealers/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name || "",
            city: data.city || "",
            address: data.address || "",
            phone: data.phone || "",
            email: data.email || "",
            website: data.website || "",
            logo: data.logo || "",
            isActive: data.isActive ?? true,
            sortOrder: data.sortOrder || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dealer:", error);
      } finally {
        setFetching(false);
      }
    }
    fetchDealer();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/dealers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/dealers");
      }
    } catch (error) {
      console.error("Error updating dealer:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#009246] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Button asChild variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 shrink-0">
          <Link href="/admin/dealers">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Редактирование</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base truncate">{formData.name}</p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-white border-gray-200">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Название компании *
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ООО «Компания»"
                className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-700">
                  Город
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Москва"
                  className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  Телефон
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (777) 800-30-00"
                  className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700">
                Адрес
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="ул. Примерная, д. 1"
                className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@company.ru"
                  className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-gray-700">
                  Сайт
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://company.ru"
                  className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo" className="text-gray-700">
                URL логотипа
              </Label>
              <Input
                id="logo"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="https://..."
                className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortOrder" className="text-gray-700">
                Порядок сортировки
              </Label>
              <Input
                id="sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div>
                <Label className="text-gray-700">Активен</Label>
                <p className="text-gray-500 text-sm">Дилер будет отображаться на сайте</p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button type="submit" disabled={loading} className="bg-[#009246] hover:bg-[#007a3a] text-white w-full sm:w-auto">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить
                  </>
                )}
              </Button>
              <Button asChild variant="ghost" className="text-gray-600 w-full sm:w-auto">
                <Link href="/admin/dealers">Отмена</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
