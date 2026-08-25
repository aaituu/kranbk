"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, MessageSquare, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";

interface Stats {
  products: number;
  dealers: number;
  contacts: number;
}

const quickActions = [
  { label: "Добавить продукт", href: "/admin/products/new", color: "bg-[#009246] hover:bg-[#007a3a]" },
  { label: "Добавить дилера", href: "/admin/dealers/new", color: "bg-gray-600 hover:bg-gray-700" },
  { label: "Просмотреть заявки", href: "/admin/contacts", color: "bg-[#CE2B37] hover:bg-[#b02530]" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Продукция",
      value: stats?.products ?? 0,
      icon: Package,
      href: "/admin/products",
      color: "text-[#009246]",
      bgColor: "bg-[#009246]/10",
    },
    {
      title: "Дилеры",
      value: stats?.dealers ?? 0,
      icon: Users,
      href: "/admin/dealers",
      color: "text-gray-600",
      bgColor: "bg-gray-200",
    },
    {
      title: "Заявки",
      value: stats?.contacts ?? 0,
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "text-[#CE2B37]",
      bgColor: "bg-[#CE2B37]/10",
    },
    // {
    //   title: "Рост",
    //   value: "+15%",
    //   icon: TrendingUp,
    //   href: "/admin",
    //   color: "text-[#009246]",
    //   bgColor: "bg-[#009246]/10",
    // },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
          Панель управления
        </h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
          Добро пожаловать в админ-панель SA Consulting
        </p>
      </div>

      {/* Italian stripe */}
      <div className="h-1 w-32 bg-gradient-to-r from-[#009246] via-white to-[#CE2B37] rounded-full" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    {loading ? (
                      <Loader2 className="w-6 h-6 text-gray-400 mt-2 animate-spin" />
                    ) : (
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                    )}
                  </div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-white font-medium transition-colors text-center text-sm sm:text-base ${action.color}`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Placeholder */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Последняя активность</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#009246]/20 via-white to-[#CE2B37]/20 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">{i}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Активность #{i}</p>
                  <p className="text-gray-500 text-sm">Демо-данные</p>
                </div>
                <span className="text-gray-400 text-sm">Сейчас</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
