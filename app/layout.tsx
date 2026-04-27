import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant | Современная чеченская кухня",
  description:
    "Сайт современного ресторана в Грозном: атмосфера, меню, бронирование, доставка и контакты.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
