"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";
import logo from "../../../public/logo.png";

const navLinks = [
  { href: "/#catalog", label: "Услуги" },
  { href: "/products", label: "Наши работы" },
  { href: "/#advantages", label: "Преимущества" },
  { href: "/#production", label: "О компании" },
  { href: "/#contact", label: "Контакты" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-center justify-between gap-4 rounded-full border border-brand-line bg-brand-paper/95 py-2.5 pl-4 pr-3 backdrop-blur-md md:pr-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src={logo}
              alt={COMPANY.name}
              width={94}
              height={89}
              className="h-11 w-auto md:h-12"
              priority
            />
            <span className="leading-tight">
              <span className="block text-[15px] font-extrabold tracking-wide text-brand-forest md:text-[16px]">
                {COMPANY.shortName}
              </span>
              <span className="hidden text-[11px] text-brand-muted sm:block">
                {COMPANY.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-medium lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-brand-muted transition-colors hover:bg-brand-mint hover:text-brand-forest"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={COMPANY.phoneHref}
              className="hidden text-[15px] font-bold text-brand-forest md:block"
            >
              {COMPANY.phone}
            </a>
            <Button
              asChild
              variant="outline"
              className="hidden rounded-full border-[1.5px] border-brand-forest bg-transparent px-5 text-sm font-semibold text-brand-forest hover:bg-brand-forest hover:text-white sm:inline-flex"
            >
              <Link href="/#contact">Заказать звонок →</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-brand-forest"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="!w-full border-l border-brand-line bg-brand-paper p-0 sm:!w-80"
              >
                <div className="italia-stripe h-1.5 w-full" />
                <div className="flex h-full flex-col p-6">
                  <div className="mb-8 mt-6 flex items-center gap-3">
                    <Image
                      src={logo}
                      alt={COMPANY.name}
                      width={94}
                      height={89}
                      className="h-14 w-auto"
                    />
                    <span className="text-[17px] font-extrabold tracking-wide text-brand-forest">
                      {COMPANY.shortName}
                    </span>
                  </div>
                  <nav className="flex flex-1 flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl px-4 py-3 text-lg text-brand-forest transition-colors hover:bg-brand-mint"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <a
                    href={COMPANY.phoneHref}
                    className="mt-auto flex items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-4 font-bold text-white"
                  >
                    <Phone className="h-4 w-4" />
                    {COMPANY.phone}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
