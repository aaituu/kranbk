/**
 * Услуги ТОО SA Consulting и галерея выполненных работ металлоцеха.
 */

export type ServiceId =
  | "tower-rent"
  | "tower-sale"
  | "auto-crane"
  | "lift"
  | "parts"
  | "service"
  | "metal";

export interface Service {
  id: ServiceId;
  title: string;
  short: string;
  description: string;
  note: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: "tower-rent",
    title: "Аренда башенных кранов",
    short: "Аренда башенных кранов",
    description:
      "Сдаём башенные краны в аренду на объекты по всей территории Республики Казахстан.",
    note: "по всей Республике Казахстан",
    image: "/img/cat-tower-rent.webp",
  },
  {
    id: "tower-sale",
    title: "Продажа башенных кранов",
    short: "Продажа башенных кранов",
    description:
      "Продажа башенных кранов — подберём кран под задачи и бюджет вашей стройки.",
    note: "в наличии и под заказ",
    image: "/img/cat-tower-sale.webp",
  },
  {
    id: "auto-crane",
    title: "Автокраны ZOOMLION",
    short: "Автокраны ZOOMLION",
    description:
      "Продажа и аренда автомобильных кранов, в том числе кранов марки ZOOMLION.",
    note: "продажа и аренда",
    image: "/img/cat-auto.webp",
  },
  {
    id: "lift",
    title: "Аренда автовышек",
    short: "Аренда автовышек",
    description:
      "Автомобильные вышки и гидравлические подъёмники на базе прицепа — в аренду.",
    note: "гидравлические подъёмники",
    image: "/img/cat-lift.webp",
  },
  {
    id: "parts",
    title: "Запчасти на краны",
    short: "Запчасти",
    description:
      "Запчасти на башенные краны и автокраны ZOOMLION — в наличии и на заказ.",
    note: "в наличии и на заказ",
    image: "/img/cat-parts.webp",
  },
  {
    id: "service",
    title: "ЧТО · ПТО · паспорта",
    short: "Техосвидетельствование",
    description:
      "Частичное и полное техническое освидетельствование, дубликаты паспортов на грузоподъёмные механизмы, аттестат промышленной безопасности.",
    note: "полный пакет документов",
    image: "/img/cat-service.webp",
  },
  {
    id: "metal",
    title: "Металлоизделия на заказ",
    short: "Металлоизделия",
    description:
      "Собственный металлоцех: лазерная резка, гибка на ЧПУ 100 т, сварка, порошковая покраска.",
    note: "собственный цех",
    image: "/img/metal-card.webp",
  },
];

/* ─── Галерея работ металлоцеха ─── */

export type WorkCategoryId =
  | "corpus"
  | "urban"
  | "decor"
  | "stainless"
  | "frames"
  | "cutting";

export interface WorkCategory {
  id: WorkCategoryId;
  title: string;
}

export const WORK_CATEGORIES: WorkCategory[] = [
  { id: "corpus", title: "Корпуса и шкафы" },
  { id: "urban", title: "Городская среда" },
  { id: "decor", title: "Декоративные панели" },
  { id: "stainless", title: "Нержавеющая сталь" },
  { id: "frames", title: "Каркасы и конвейеры" },
  { id: "cutting", title: "Резка и детали" },
];

export interface Work {
  id: string;
  title: string;
  category: WorkCategoryId;
  image: string;
}

const w = (n: number, category: WorkCategoryId, title: string): Work => ({
  id: `work-${String(n).padStart(2, "0")}`,
  title,
  category,
  image: `/works/work-${String(n).padStart(2, "0")}.webp`,
});

export const WORKS: Work[] = [
  w(19, "frames", "Конвейер для снегоуборочных работ"),
  w(23, "decor", "Обшивка вентиляционной системы ЖК"),
  w(12, "urban", "Скамейка и урна — благоустройство ЖК"),
  w(22, "stainless", "Трапы из нержавеющей стали"),
  w(30, "corpus", "Металлический корпус под ключ"),
  w(11, "decor", "Панель с казахским орнаментом"),
  w(28, "urban", "Металлические урны — серия"),
  w(8, "cutting", "Лазерная резка на ЧПУ"),
  w(27, "decor", "Декоративная панель с орнаментом"),
  w(16, "frames", "Сборка конвейера в цехе"),
  w(9, "urban", "Урна с ажурной перфорацией"),
  w(18, "corpus", "Навесной шкаф с дверцей"),
  w(35, "stainless", "Трапы для пищевого производства"),
  w(6, "urban", "Каркас велопарковки"),
  w(15, "frames", "Сварной каркас с полимерной покраской"),
  w(7, "cutting", "Жалюзийные решётки — серия"),
  w(4, "decor", "Решётка с фирменным логотипом"),
  w(17, "corpus", "Корпус для оборудования"),
  w(14, "cutting", "Серийные кронштейны"),
  w(29, "corpus", "Стойка с логотипом заказчика"),
  w(21, "urban", "Скамейка на металлокаркасе"),
  w(25, "cutting", "Жалюзийные решётки"),
  w(31, "corpus", "Корпус оборудования"),
  w(26, "cutting", "Перфорация листового металла"),
  w(2, "cutting", "Лазерная резка плиты"),
  w(32, "corpus", "Корпус с открывающейся крышкой"),
  w(3, "cutting", "Опорные закладные детали"),
  w(33, "corpus", "Мелкосерийные корпуса"),
  w(1, "corpus", "Корпус с порошковой покраской"),
];

export const worksByCategory = (id: WorkCategoryId) =>
  WORKS.filter((item) => item.category === id);

export const workCategoryCount = (id: WorkCategoryId) =>
  worksByCategory(id).length;

export const TOTAL_WORKS = WORKS.length;
