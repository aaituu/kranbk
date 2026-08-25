import Image from "next/image";
import { ABOUT_TEXT, COMPANY } from "@/lib/company";
import logo from "../../../public/logo.png";

const tags = [
  { label: "Лазерная резка", tone: "mint" },
  { label: "Гибка на ЧПУ — 100 т", tone: "mint" },
  { label: "Порошковая покраска", tone: "red" },
];

export function ProductionSection() {
  return (
    <section id="production" className="px-3 pt-16 md:px-4 md:pt-24">
      <div className="mx-auto max-w-[1280px] px-1 md:px-10">
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <div className="relative aspect-[16/11] overflow-hidden rounded-3xl">
            <Image
              src="/img/production-plant.webp"
              alt="Металлоцех ТОО SA Consulting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rotate-2 scale-110 object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-3xl border border-brand-line bg-brand-paper px-8 py-10 md:px-10">
            <span className="eyebrow">О компании</span>
            <h2 className="text-[24px] font-semibold text-brand-forest md:text-[27px]">
              Краны, запчасти и собственный металлоцех в Астане
            </h2>
            {ABOUT_TEXT.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-[14.5px] leading-relaxed text-brand-muted"
              >
                {p}
              </p>
            ))}
            <div className="mt-1 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t.label}
                  className={`rounded-full px-4 py-2 text-[12.5px] font-semibold ${
                    t.tone === "red"
                      ? "bg-brand-redsoft text-brand-red"
                      : "bg-brand-mint text-brand-green"
                  }`}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { name: "production-1", pos: "object-center" },
            { name: "production-2", pos: "object-center" },
            { name: "production-3", pos: "object-[center_25%]" },
          ].map(({ name, pos }) => (
            <div
              key={name}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl"
            >
              <Image
                src={`/img/${name}.webp`}
                alt="Производство ТОО SA Consulting"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className={`object-cover ${pos}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-6 rounded-3xl border border-brand-line bg-brand-paper px-8 py-8 sm:flex-row">
          <div className="relative h-24 w-24 flex-none overflow-hidden rounded-full bg-white">
            <Image
              src={logo}
              alt={COMPANY.name}
              fill
              sizes="96px"
              className="object-contain p-2"
            />
          </div>
          <div>
            <p className="serif-italic text-[17px] leading-relaxed text-brand-forest">
              «Будем рады видеть вас в числе наших партнёров»
            </p>
            <div className="mt-2 text-[14px] font-semibold text-brand-forest">
              {COMPANY.name}
            </div>
            <div className="text-[13px] text-brand-muted">
              г. {COMPANY.city} · {COMPANY.phone}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
