import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "창호의민족 | 대한민국 창호 끝판왕",
  description: "공장 직영, 중간 마진 없는 최저가! 연매출 80억 자체 공장 보유, 10년 무상 품질보증. 창호 전문 기업 창호의민족입니다.",
  keywords: ["창호", "창문", "시스템창호", "PVC창호", "하이샤시", "창호교체", "창호시공", "창호의민족"],
  openGraph: {
    title: "창호의민족 | 대한민국 창호 끝판왕",
    description: "공장 직영, 중간 마진 없는 최저가! 10년 무상 품질보증",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 폰트 */}
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        {/* 나눔명조 폰트 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
