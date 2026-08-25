import Image from "next/image";
import { WHY_CHOOSE } from "@/lib/company";

export function WhyChooseSection() {
  return (
    <section className="px-3 pt-16 md:px-4 md:pt-24">
      <div className="mx-auto max-w-[1280px] px-1 md:px-10">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-3xl border border-brand-line bg-brand-paper px-8 py-9 md:px-10">
            <span className="eyebrow">Клиентам и партнёрам</span>
            <h2 className="mb-6 mt-2 text-[24px] font-semibold text-brand-forest md:text-[28px]">
              Почему выбирают нас
            </h2>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {WHY_CHOOSE.map((item) => (
                <li key={item.accent} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-red" />
                  <span className="text-[14.5px] leading-relaxed text-brand-muted">
                    <strong className="font-semibold text-brand-forest">
                      {item.accent}
                    </strong>{" "}
                    {item.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="relative min-h-[220px] overflow-hidden rounded-3xl">
              <Image
                src="/img/why-bench.webp"
                alt="Благоустройство жилого комплекса — работа металлоцеха"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[220px] overflow-hidden rounded-3xl">
              <Image
                src="/img/why-panel.webp"
                alt="Декоративная панель с орнаментом — работа металлоцеха"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
