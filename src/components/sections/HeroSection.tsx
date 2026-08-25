import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/company";

const heroChecks = [
  "Краны в наличии и под заказ",
  "Запчасти в наличии и на заказ",
  "ЧТО и ПТО — полный пакет документов",
];

const stats = [
  { value: "РК", label: "аренда и продажа по всему Казахстану" },
  { value: "ZOOMLION", label: "автокраны — продажа и аренда" },
  { value: "ЧТО · ПТО", label: "техническое освидетельствование" },
];

export function HeroSection() {
  return (
    <section className="px-3 pt-3 md:px-4 md:pt-4">
      <div className="mx-auto max-w-[1280px]">
        <div className="overflow-hidden rounded-3xl">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center gap-6 bg-brand-green px-7 py-12 md:px-13 md:py-16">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-brand-mint">
                  {COMPANY.name} · г. {COMPANY.city}
                </span>
              </div>

              <h1 className="text-[34px] font-semibold leading-[1.12] text-white md:text-[44px]">
                Башенные и автомобильные краны{" "}
                <span className="serif-italic font-normal">
                  — продажа и аренда
                </span>
              </h1>

              <p className="max-w-[460px] text-base leading-relaxed text-white/85 md:text-[16.5px]">
                Аренда и продажа башенных кранов, автокранов ZOOMLION и
                автовышек по всей Республике Казахстан. Запчасти, техническое
                освидетельствование и собственный металлоцех — г.{" "}
                {COMPANY.city}.
              </p>

              <div className="mt-1 flex flex-wrap gap-3">
                <Link
                  href="/#catalog"
                  className="rounded-full bg-brand-red px-7 py-4 text-[15px] font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  Наши услуги
                </Link>
                <Link
                  href="/#contact"
                  className="rounded-full border-[1.5px] border-white/50 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Запросить расчёт
                </Link>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/75">
                {heroChecks.map((c) => (
                  <span key={c}>✓ {c}</span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[280px] lg:min-h-[480px]">
              <Image
                src="/img/hero.webp"
                alt="Башенный кран SA Consulting на объекте"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Полоса показателей */}
        <div className="relative z-10 mx-4 -mt-8 grid gap-6 rounded-3xl border border-brand-line border-l-[5px] border-l-brand-red bg-brand-paper px-8 py-6 sm:grid-cols-2 md:mx-14 lg:grid-cols-[1fr_1fr_1fr_1.4fr]">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-brand-forest">
                {s.value}
              </div>
              <div className="mt-1 text-[13.5px] text-brand-muted">
                {s.label}
              </div>
            </div>
          ))}
          <div className="text-[13.5px] leading-relaxed text-brand-muted">
            Изготавливаем металлические изделия любой сложности в собственном
            цехе.{" "}
            <Link
              href="/#contact"
              className="font-semibold text-brand-green underline underline-offset-2"
            >
              Обсудить проект
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
