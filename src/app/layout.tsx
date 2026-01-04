import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "창호의 민족 | 스마트 팩토리 직영 창호 전문",
    template: "%s | 창호의 민족",
  },
  description: "10년 제조 노하우, 3,500평 스마트 팩토리에서 직접 만드는 고품질 창호. 공장 직영 가격으로 만나보세요. PVC창호, 하이샤시, 시스템창호 전문.",
  keywords: ["창호", "샷시", "창문 교체", "아파트 창호", "PVC창호", "시스템창호", "하이샤시", "창호의민족"],
  authors: [{ name: "(주)현경시스템" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "창호의 민족",
    title: "창호의 민족 | 스마트 팩토리 직영 창호 전문",
    description: "제조의 혁신이 곧 품질의 기준입니다. 10년 제조 노하우와 스마트 팩토리로 고품질 창호를 합리적인 가격에 제공합니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
