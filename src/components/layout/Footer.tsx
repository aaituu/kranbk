import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/company";
import { SERVICES } from "@/lib/catalog";
import logo from "../../../public/logo.png";

export function Footer() {
  return (
    <footer className="px-3 pb-4 pt-16 md:px-4 md:pt-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="rounded-3xl bg-brand-green px-8 pb-9 pt-12 md:px-11">
          <div className="grid gap-9 border-b border-white/15 pb-9 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src={logo}
                  alt={COMPANY.name}
                  width={94}
                  height={89}
                  className="h-14 w-auto rounded-lg bg-white px-1.5 py-1.5"
                />
                <span className="text-[17px] font-extrabold tracking-wide text-white">
                  {COMPANY.shortName}
                </span>
              </div>
              <p className="mt-4 max-w-[280px] text-[13.5px] leading-relaxed text-white/65">
                {COMPANY.tagline}: продажа, аренда, запчасти и
                техосвидетельствование. Собственный металлоцех, г.{" "}
                {COMPANY.city}.
              </p>
              <span className="italia-stripe mt-4 inline-block h-2.5 w-11 rounded-sm" />
            </div>

            <div>
              <div className="mb-4 text-[12px] tracking-[0.16em] text-white/50">
                УСЛУГИ
              </div>
              <div className="flex flex-col gap-2.5 text-sm text-white/85">
                {SERVICES.slice(0, 6).map((s) => (
                  <Link key={s.id} href="/#catalog" className="hover:text-white">
                    {s.short}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 text-[12px] tracking-[0.16em] text-white/50">
                ТЕЛЕФОНЫ
              </div>
              <div className="flex flex-col gap-2.5 text-sm text-white/85">
                {COMPANY.extraPhones.map((p) => (
                  <a key={p.label} href={p.href} className="hover:text-white">
                    {p.label}
                  </a>
                ))}
                <a
                  href={COMPANY.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp · {COMPANY.phone}
                </a>
              </div>
            </div>

            <div>
              <div className="mb-4 text-[12px] tracking-[0.16em] text-white/50">
                КОНТАКТЫ
              </div>
              <a
                href={COMPANY.phoneHref}
                className="text-lg font-semibold text-white"
              >
                {COMPANY.phone}
              </a>
              <div className="mt-1 text-sm text-white/70">
                {COMPANY.address}
              </div>
              <Link
                href="/#contact"
                className="mt-4 inline-block rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white"
              >
                Заказать звонок
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-2 pt-5 text-[12.5px] text-white/50">
            <span>
              © {COMPANY.name}, {new Date().getFullYear()}
            </span>
            <span>Башенные и автомобильные краны · Металлоизделия</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
