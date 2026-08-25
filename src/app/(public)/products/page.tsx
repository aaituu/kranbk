"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  TOTAL_WORKS,
  WORKS,
  WORK_CATEGORIES,
  type WorkCategoryId,
  workCategoryCount,
} from "@/lib/catalog";

function WorksView() {
  const params = useSearchParams();
  const initial = params.get("category") as WorkCategoryId | null;
  const [active, setActive] = useState<WorkCategoryId | "all">(
    initial && WORK_CATEGORIES.some((c) => c.id === initial) ? initial : "all",
  );

  const items = useMemo(
    () =>
      active === "all"
        ? WORKS
        : WORKS.filter((item) => item.category === active),
    [active],
  );

  return (
    <>
      <Header />
      <main className="px-3 pt-8 md:px-4 md:pt-10">
        <div className="mx-auto max-w-[1280px] px-1 md:px-10">
          <span className="eyebrow">Наши работы</span>
          <h1 className="mt-2 text-[28px] font-semibold text-brand-forest md:text-[36px]">
            Галерея{" "}
            <span className="serif-italic font-normal">металлоцеха</span>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-brand-muted">
            {TOTAL_WORKS} выполненных работ: лазерная резка, гибка на ЧПУ 100 т,
            сварка и порошковая покраска. Изготовим металлические изделия всех
            видов — по чертежам и образцам.
          </p>

          {/* Фильтр по категориям */}
          <div className="mt-7 flex flex-wrap gap-2">
            <button
              onClick={() => setActive("all")}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active === "all"
                  ? "bg-brand-green text-white"
                  : "border border-brand-line bg-brand-paper text-brand-muted hover:bg-brand-mint"
              }`}
            >
              Все · {TOTAL_WORKS}
            </button>
            {WORK_CATEGORIES.filter((c) => workCategoryCount(c.id) > 0).map(
              (c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    active === c.id
                      ? "bg-brand-green text-white"
                      : "border border-brand-line bg-brand-paper text-brand-muted hover:bg-brand-mint"
                  }`}
                >
                  {c.title} · {workCategoryCount(c.id)}
                </button>
              ),
            )}
          </div>

          {/* Сетка работ */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-brand-line bg-brand-paper"
              >
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-5 py-4">
                  <h2 className="text-[15px] font-semibold leading-snug text-brand-forest">
                    {item.title}
                  </h2>
                  <div className="mt-1 text-[12.5px] text-brand-green">
                    {WORK_CATEGORIES.find((c) => c.id === item.category)?.title}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 rounded-3xl bg-brand-green px-8 py-9 md:grid-cols-[1.3fr_auto] md:items-center md:px-10">
            <div>
              <h2 className="text-[21px] font-semibold text-white">
                Нужно изделие по вашим чертежам?
              </h2>
              <p className="mt-2 max-w-[560px] text-[14.5px] leading-relaxed text-white/75">
                Пришлите чертёж, фото или образец — рассчитаем стоимость и
                сроки. Работаем с любыми объёмами, от единичных изделий до
                серий.
              </p>
            </div>
            <Link
              href="/#contact"
              className="justify-self-start rounded-full bg-brand-red px-7 py-4 text-[15px] font-bold text-white transition-transform hover:scale-[1.03] md:justify-self-end"
            >
              Запросить расчёт
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-brand-muted">
          Загружаем галерею…
        </div>
      }
    >
      <WorksView />
    </Suspense>
  );
}
