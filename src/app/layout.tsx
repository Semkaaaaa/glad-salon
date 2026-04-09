import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Гладь — Студия лазерной эпиляции в Ростове-на-Дону",
  description: "Студия лазерной эпиляции «Гладь» в Ростове-на-Дону. Более 1000 довольных клиентов. Медицинское образование специалистов. Безболезненные процедуры на аппарате MBT ESTHETICIAN 3000 Вт.",
  keywords: ["лазерная эпиляция", "Ростов-на-Дону", "Гладь", "эпиляция", "удаление волос", "безболезненная эпиляция"],
  authors: [{ name: "Гладь" }],
  icons: {
    icon: "/glad-logo.jpg",
  },
  openGraph: {
    title: "Гладь — Студия лазерной эпиляции",
    description: "Лазерная эпиляция в Ростове-на-Дону. Более 1000 довольных клиентов.",
    url: "https://glad-now.ru",
    siteName: "Гладь",
    type: "website",
    images: ["/glad-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Гладь — Студия лазерной эпиляции",
    description: "Лазерная эпиляция в Ростове-на-Дону",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
