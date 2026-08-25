"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Mail, Phone, Calendar, Eye, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  
  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchContacts = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      }
      
      if (status !== "all") {
        params.set("status", status);
      }

      const response = await fetch(`/api/contact?${params}`);
      if (response.ok) {
        const result = await response.json();
        setContacts(result.data);
        setMeta(result.meta);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status]);

  useEffect(() => {
    fetchContacts(1);
  }, [fetchContacts]);

  const handlePageChange = (page: number) => {
    fetchContacts(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Almaty",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Заявки</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
          Обращения от клиентов через форму обратной связи
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Поиск по имени или email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px] border-gray-200">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все заявки</SelectItem>
                  <SelectItem value="unread">Непрочитанные</SelectItem>
                  <SelectItem value="read">Прочитанные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {!loading && (
        <div className="text-sm text-gray-500">
          Показано {contacts.length} из {meta.total} заявок
        </div>
      )}

      {/* Contacts List */}
      {loading ? (
        <div className="p-8 text-center text-gray-500">Загрузка...</div>
      ) : contacts.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {debouncedSearch || status !== "all" 
                ? "Заявки не найдены" 
                : "Заявок пока нет"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              className={`bg-white border-gray-200 hover:border-gray-300 cursor-pointer transition-colors ${
                !contact.isRead ? "border-l-4 border-l-[#009246]" : ""
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {contact.name}
                      </h3>
                      {!contact.isRead && (
                        <Badge className="bg-[#009246]/10 text-[#009246]">
                          Новое
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span className="truncate">{contact.email}</span>
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4 shrink-0" />
                          {contact.phone}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                      {contact.message}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:text-right shrink-0">
                    <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(contact.createdAt)}
                    </div>
                    <button className="flex items-center gap-1 text-[#009246] text-sm hover:text-[#007a3a]">
                      <Eye className="w-4 h-4" />
                      Просмотреть
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}

      {/* Contact Details Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="bg-white border-gray-200 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              Заявка от {selectedContact?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="flex items-center gap-2 text-[#009246] hover:text-[#007a3a]"
                >
                  <Mail className="w-4 h-4" />
                  {selectedContact.email}
                </a>
                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="flex items-center gap-2 text-[#009246] hover:text-[#007a3a]"
                  >
                    <Phone className="w-4 h-4" />
                    {selectedContact.phone}
                  </a>
                )}
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                {formatDate(selectedContact.createdAt)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
