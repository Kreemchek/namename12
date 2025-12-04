import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://x-hub.tech"),
  title: "X-HUB — Артерия международных финансов",
  description:
    "Приём платежей, QR-эквайринг, международные переводы, API-интеграции и финмониторинг для легального бизнеса с международными платежами.",
  openGraph: {
    title: "X-HUB — Артерия международных финансов",
    description:
      "Когда мир ставит стены — мы создаём мосты для вашего бизнеса. Подключение, KYB, интеграции и обучение на единой платформе.",
    url: "https://x-hub.tech",
    siteName: "X-HUB",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://x-hub.tech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${onest.variable} ${inter.variable} bg-slate-950 text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
