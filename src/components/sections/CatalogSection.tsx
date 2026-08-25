import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/catalog";

const accents = [
  "bg-brand-red text-white",
  "bg-brand-paper text-brand-forest",
  "bg-brand-lime text-brand-forest",
  "bg-brand-red text-white",
  "bg-brand-paper text-brand-forest",
  "bg-brand-lime text-brand-forest",
  "bg-brand-paper text-brand-forest",
];

function ServiceCard({
  index,
  className = "",
  minHeight = "min-h-[320px]",
}: {
  index: number;
  className?: string;
  minHeight?: string;
}) {
  const service = SERVICES[index];

  return (
    <Link
      href="/#contact"
      className={`group relative overflow-hidden rounded-3xl ${minHeight} ${className}`}
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between gap-3 rounded-2xl bg-brand-green/90 px-5 py-4 backdrop-blur-sm">
        <div className="min-w-0">
          <div className="text-[16.5px] font-semibold leading-snug text-white">
            {service.title}
          </div>
          <div className="mt-0.5 text-[12.5px] text-white/70">
            {service.note}
          </div>
        </div>
        <span
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-sm font-semibold ${accents[index % accents.length]}`}
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function CatalogSection() {
  return (
    <section id="catalog" className="px-3 pt-16 md:px-4 md:pt-24">
      <div className="mx-auto max-w-[1280px] px-1 md:px-10">
        <span className="eyebrow">Наши услуги</span>
        <div className="mb-7 mt-2 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[26px] font-semibold text-brand-forest md:text-[30px]">
            Краны, запчасти и сервис
          </h2>
          <Link
            href="/#contact"
            className="text-sm font-semibold text-brand-forest underline-offset-4 hover:underline"
          >
            Цены — по запросу →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ServiceCard index={0} />
          <ServiceCard index={1} />
          <ServiceCard index={2} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <ServiceCard index={3} minHeight="min-h-[280px]" />
          <ServiceCard index={4} minHeight="min-h-[280px]" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.4fr]">
          <ServiceCard index={5} minHeight="min-h-[260px]" />
          <Link
            href="/products"
            className="group relative flex items-center justify-between gap-6 overflow-hidden rounded-3xl bg-brand-green px-8 py-7 transition-transform hover:scale-[1.01] md:px-10"
          >
            <span className="italia-stripe absolute inset-x-0 top-0 h-1.5" />
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white">
                Собственный металлоцех
              </div>
              <div className="mt-2 text-[20px] font-semibold leading-snug text-white md:text-[22px]">
                Металлоизделия на заказ{" "}
                <span className="serif-italic font-normal">любой сложности</span>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white transition-transform group-hover:scale-[1.04]">
                Смотреть работы <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="relative h-36 w-28 flex-none overflow-hidden rounded-2xl md:h-40 md:w-32">
              <Image
                src="/img/metal-card.webp"
                alt="Изделие металлоцеха SA Consulting"
                fill
                sizes="128px"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-brand-green"
          >
            Наши работы — галерея металлоцеха
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
