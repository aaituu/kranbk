import Link from "next/link";
import { Cog, PackageCheck, Timer, Wrench } from "lucide-react";

const items = [
  {
    icon: PackageCheck,
    title: "Запчасти в наличии",
    text: "Ходовые позиции на башенные краны — со склада в Астане.",
  },
  {
    icon: Timer,
    title: "Поставка под заказ",
    text: "Привезём редкие запчасти на башенные краны и автокраны ZOOMLION.",
  },
  {
    icon: Cog,
    title: "Для кранов ZOOMLION",
    text: "Запчасти для автомобильных кранов марки ZOOMLION.",
  },
  {
    icon: Wrench,
    title: "Помощь в подборе",
    text: "Подберём запчасть по паспорту крана, фото или образцу.",
  },
];

export function PartsSection() {
  return (
    <section id="parts" className="px-3 pt-16 md:px-4 md:pt-24">
      <div className="mx-auto max-w-[1280px] px-1 md:px-10">
        <span className="eyebrow">Запчасти</span>
        <div className="mb-7 mt-2 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[26px] font-semibold text-brand-forest md:text-[30px]">
            Запчасти на башенные краны и автокраны
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-brand-line bg-brand-paper px-6 py-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-mint text-brand-green">
                <item.icon className="h-5 w-5" />
              </span>
              <div className="mt-5 text-[15.5px] font-semibold text-brand-forest">
                {item.title}
              </div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-brand-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 rounded-3xl bg-brand-green px-8 py-9 md:grid-cols-[1.3fr_auto] md:items-center md:px-10">
          <div>
            <h3 className="text-[21px] font-semibold text-white">
              Нужна запчасть или кран в аренду?
            </h3>
            <p className="mt-2 max-w-[560px] text-[14.5px] leading-relaxed text-white/75">
              Пришлите марку крана и описание задачи — подберём технику,
              запчасти и подготовим документы: ЧТО, ПТО, паспорта.
            </p>
          </div>
          <Link
            href="/#contact"
            className="justify-self-start rounded-full bg-brand-red px-7 py-4 text-[15px] font-bold text-white transition-transform hover:scale-[1.03] md:justify-self-end"
          >
            Оставить заявку
          </Link>
        </div>
      </div>
    </section>
  );
}
