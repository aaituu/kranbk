"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  Users,
  MessageSquare,
  LogOut,
  Home,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Панель управления" },
  { href: "/admin/products", icon: Package, label: "Продукция" },
  { href: "/admin/dealers", icon: Users, label: "Дилеры" },
  { href: "/admin/contacts", icon: MessageSquare, label: "Заявки" },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Italian flag stripe at top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#009246] via-white to-[#CE2B37]" />
      
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/admin" className="block" onClick={onNavigate}>
          <span className="text-xl font-serif font-bold">
            <span className="text-[#009246]">MARRI</span>
            <span className="text-gray-400">O</span>
            <span className="text-[#CE2B37]">NI</span>
          </span>
          <span className="block text-xs text-gray-500 mt-1 uppercase tracking-widest">
            Админ-панель
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-[#009246] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">На сайт</span>
        </Link>
        
        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full justify-start gap-3 px-4 py-3 h-auto text-[#CE2B37] hover:bg-[#CE2B37]/10 hover:text-[#CE2B37]"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Выйти</span>
        </Button>
      </div>
    </>
  );
}

// Desktop Sidebar
export function AdminSidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex-col">
      <SidebarContent />
    </aside>
  );
}

// Mobile Header with burger menu
export function AdminMobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      {/* Italian flag stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-[#009246] via-white to-[#CE2B37]" />
      
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/admin" className="block">
          <span className="text-xl font-serif font-bold">
            <span className="text-[#009246]">MARRI</span>
            <span className="text-gray-400">O</span>
            <span className="text-[#CE2B37]">NI</span>
          </span>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-white">
            <SheetHeader className="sr-only">
              <SheetTitle>Меню навигации</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <SidebarContent onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
