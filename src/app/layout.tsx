import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sa-consulting.kz"),
  title: {
    default:
      "SA Consulting — башенные и автомобильные краны в Казахстане: продажа, аренда, запчасти",
    template: "%s | SA Consulting",
  },
  description:
    "Продажа и аренда башенных кранов, автокранов ZOOMLION и автовышек по всему Казахстану. Запчасти в наличии и на заказ, ЧТО и ПТО, дубликаты паспортов, собственный металлоцех в Астане.",
  keywords: [
    "башенные краны",
    "аренда башенного крана",
    "автокран ZOOMLION",
    "продажа кранов",
    "запчасти на башенные краны",
    "аренда автовышки",
    "техническое освидетельствование ЧТО ПТО",
    "металлоизделия на заказ",
    "Астана",
    "Казахстан",
  ],
  openGraph: {
    title: "SA Consulting — башенные и автомобильные краны",
    description:
      "Продажа и аренда башенных и автомобильных кранов ZOOMLION, автовышки, запчасти, ЧТО/ПТО и собственный металлоцех. г. Астана, работаем по всему Казахстану.",
    type: "website",
    locale: "ru_RU",
    siteName: "SA Consulting",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
