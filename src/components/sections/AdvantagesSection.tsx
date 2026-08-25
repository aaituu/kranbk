import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  Shield,
  FileCheck,
  BadgeCheck,
  Paintbrush,
  Layers,
  Wrench,
  PackageCheck,
} from "lucide-react";

const card =
  "rounded-3xl border border-brand-line bg-brand-paper px-6 py-5 flex flex-col";

const iconBox =
  "flex h-10 w-10 items-center justify-center rounded-xl";

export function AdvantagesSection() {
  return (
    <section id="advantages" className="px-3 pt-16 md:px-4 md:pt-24">
      <div className="mx-auto max-w-[1280px] px-1 md:px-10">
        <span className="eyebrow">Преимущества</span>
        <h2 className="mb-7 mt-2 text-[26px] font-semibold text-brand-forest md:text-[32px]">
          Почему с нами удобно работать
        </h2>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Левая колонка */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="flex min-h-[300px] flex-col justify-between rounded-3xl bg-brand-green px-8 py-8 lg:min-h-[380px]">
              <div className="flex items-start justify-between">
                <div className="text-[56px] font-extrabold leading-none text-white lg:text-[68px]">
                  РК
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Truck className="h-6 w-6 text-white" />
                </span>
              </div>
              <div>
                <div className="text-[17px] font-semibold text-white">
                  Работаем по всему Казахстану
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/70">
                  Сдаём краны в аренду и поставляем технику на объекты по всей
                  территории Республики Казахстан.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className={card}>
                <div className="flex items-center justify-between">
                  <div className="text-[19px] font-extrabold text-brand-green">
                    ZOOMLION
                  </div>
                  <span className={`${iconBox} bg-brand-mint text-brand-green`}>
                    <Layers className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-6 text-[14px] font-semibold leading-snug text-brand-forest">
                  Автокраны — продажа и аренда
                </div>
              </div>
              <div className={card}>
                <div className="flex items-center justify-between">
                  <div className="text-[19px] font-extrabold text-brand-red">
                    100 т
                  </div>
                  <span className={`${iconBox} bg-brand-redsoft text-brand-red`}>
                    <Wrench className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-6 text-[14px] font-semibold leading-snug text-brand-forest">
                  Гибка листового металла на ЧПУ-станке
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-brand-line bg-brand-paper px-7 py-6 sm:flex-row sm:items-center">
              <div>
                <div className="text-[15.5px] font-semibold text-brand-forest">
                  Запчасти на башенные краны и автокраны
                </div>
                <div className="mt-1 text-[13px] text-brand-muted">
                  В наличии на складе · поставка под заказ
                </div>
              </div>
              <Link
                href="/#contact"
                className="flex-none rounded-full bg-brand-red px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
              >
                Запросить запчасти →
              </Link>
            </div>
          </div>

          {/* Средняя колонка */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <div className={card}>
              <div className="flex items-center justify-between">
                <div className="text-[21px] font-extrabold text-brand-green">
                  ЧТО
                </div>
                <span className={`${iconBox} bg-brand-mint text-brand-green`}>
                  <Shield className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-6 text-[14px] font-semibold leading-snug text-brand-forest">
                Частичное техническое освидетельствование
              </div>
            </div>

            <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-3xl">
              <Image
                src="/img/adv-ornament.webp"
                alt="Панель с орнаментом — работа металлоцеха SA Consulting"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
            </div>

            <div className={card}>
              <div className="flex items-center justify-between">
                <span className={`${iconBox} bg-brand-mint text-brand-green`}>
                  <FileCheck className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-5 text-[14px] font-semibold leading-snug text-brand-forest">
                Дубликаты паспортов на грузоподъёмные механизмы
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <div className="rounded-3xl bg-brand-red px-7 py-6">
              <div className="flex items-center justify-between">
                <div className="text-[21px] font-extrabold text-white">ПТО</div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <BadgeCheck className="h-5 w-5 text-white" />
                </span>
              </div>
              <div className="mt-5 text-[14px] font-semibold leading-snug text-white">
                Полное техническое освидетельствование кранов
              </div>
            </div>

            <div className="flex-1 rounded-3xl bg-brand-mint px-7 py-6">
              <div className="flex items-center justify-between">
                <div className="text-[21px] font-extrabold text-brand-green">
                  Аттестат
                </div>
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green text-white shadow-lg">
                  <BadgeCheck className="h-9 w-9" />
                </span>
              </div>
              <div className="mt-5 text-[14px] font-semibold leading-snug text-brand-forest">
                Поможем получить аттестат в области промышленной безопасности
              </div>
            </div>

            <div className={`${card} flex-1`}>
              <div className="flex items-center justify-between">
                <span className={`${iconBox} bg-brand-mint text-brand-green`}>
                  <PackageCheck className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-5 text-[14px] font-semibold leading-snug text-brand-forest">
                Краны и автовышки — в наличии и под заказ
              </div>
            </div>

            <div className="flex-1 rounded-3xl bg-brand-green px-7 py-6">
              <div className="flex items-center justify-between">
                <div className="text-[21px] font-extrabold text-white">
                  RAL
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Paintbrush className="h-5 w-5 text-white" />
                </span>
              </div>
              <div className="mt-5 text-[14px] font-semibold leading-snug text-white">
                Порошковая покраска изделий в любой цвет
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
