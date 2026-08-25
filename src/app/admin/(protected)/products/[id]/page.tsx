"use client";

import { useState, useEffect, use, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    price: "",
    isActive: true,
    sortOrder: 0,
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name || "",
            description: data.description || "",
            category: data.category || "",
            image: data.image || "",
            price: data.price?.toString() || "",
            isActive: data.isActive ?? true,
            sortOrder: data.sortOrder || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setFetching(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Upload file
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, image: data.url }));
        setImagePreview(null); // Clear preview, use actual URL
      } else {
        const error = await response.json();
        alert(error.error || "Ошибка загрузки файла");
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Ошибка загрузки файла");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(formData.price) : null,
        }),
      });

      if (response.ok) {
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
          <Link href="/admin/products">
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
              <Label htmlFor="name" className="text-gray-700">Название *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Название продукта"
                className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700">Описание</Label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Описание продукта..."
                className="bg-white border-gray-300 text-gray-900 focus:border-[#009246] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700">Категория</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Premium, Classic..."
                  className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700">Цена</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="bg-white border-gray-300 text-gray-900 focus:border-[#009246]"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-gray-700">Изображение</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {imagePreview || formData.image ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                  <Image
                    src={imagePreview || formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-[#009246] hover:text-[#009246] transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8" />
                      <span>Нажмите для загрузки изображения</span>
                      <span className="text-sm">JPEG, PNG, WebP, GIF (макс. 5MB)</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortOrder" className="text-gray-700">Порядок сортировки</Label>
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
                <p className="text-gray-500 text-sm">Продукт будет отображаться на сайте</p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading || uploading}
                className="bg-[#009246] hover:bg-[#007a3a] text-white w-full sm:w-auto"
              >
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
                <Link href="/admin/products">Отмена</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
