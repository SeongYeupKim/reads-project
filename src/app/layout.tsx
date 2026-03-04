import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "READS — Reading for Evidence And Disciplinary Science",
  description: "중3 과학 읽기 ITS. 옴니버스 단편 소설로 prior knowledge와 과학 교과 소양을 키웁니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
