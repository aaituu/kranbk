"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";

interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  isActive: boolean;
  createdAt: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  
  // Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        all: "true", // Show inactive products in admin
      });
      
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      }

      const response = await fetch(`/api/products?${params}`);
      if (response.ok) {
        const result = await response.json();
        setProducts(result.data);
        setMeta(result.meta);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/products/${deleteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== deleteId));
        // Refresh if we deleted the last item on the page
        if (products.length === 1 && meta.page > 1) {
          fetchProducts(meta.page - 1);
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Продукция</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Управление каталогом продукции</p>
        </div>
        <Button asChild className="bg-[#009246] hover:bg-[#007a3a] text-white w-full sm:w-auto">
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить продукт
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Поиск по названию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-gray-200"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {!loading && (
        <div className="text-sm text-gray-500">
          Показано {products.length} из {meta.total} продуктов
        </div>
      )}

      {/* Products Table */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Загрузка...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {debouncedSearch ? "Продукция не найдена" : "Продукция пока не добавлена"}
              </p>
              {!debouncedSearch && (
                <Button asChild className="mt-4 bg-[#009246] hover:bg-[#007a3a] text-white">
                  <Link href="/admin/products/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить первый продукт
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-gray-50">
                    <TableHead className="text-gray-600 min-w-[200px]">Название</TableHead>
                    <TableHead className="text-gray-600 min-w-[120px]">Категория</TableHead>
                    <TableHead className="text-gray-600 min-w-[100px]">Статус</TableHead>
                    <TableHead className="text-gray-600 text-right min-w-[100px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-900 font-medium">{product.name}</TableCell>
                      <TableCell className="text-gray-600">{product.category || "—"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.isActive ? "default" : "secondary"}
                          className={product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}
                        >
                          {product.isActive ? "Активен" : "Скрыт"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-[#009246] hover:bg-gray-100"
                          >
                            <Link href={`/admin/products/${product.id}`}>
                              <Pencil className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-red-500 hover:bg-gray-100"
                            onClick={() => setDeleteId(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="bg-white border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Удалить продукт?</DialogTitle>
            <DialogDescription className="text-gray-600">
              Это действие нельзя отменить. Продукт будет удалён безвозвратно.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)} className="text-gray-600">
              Отмена
            </Button>
            <Button onClick={handleDelete} className="bg-[#CE2B37] hover:bg-[#b02530] text-white">
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
