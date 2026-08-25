import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '林知夏｜视觉与体验设计',
  description: '品牌、数字产品与视觉叙事设计作品集',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
