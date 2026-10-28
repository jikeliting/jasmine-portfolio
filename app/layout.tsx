import type { Metadata } from 'next';
import './globals.css';
import SiteNavigation from './site-navigation';

export const metadata: Metadata = {
  metadataBase: new URL('https://jianiart.xyz'),
  title: '徐嘉妮｜品牌与产品视觉设计',
  description: '徐嘉妮的个人设计作品集，涵盖企业品牌、销售内容、产品视觉与数字体验。',
  icons: { icon: '/favicon.svg' },
  alternates: { canonical: '/' },
  openGraph: {
    title: '徐嘉妮｜品牌与产品视觉设计',
    description: '企业品牌、销售内容、产品视觉与数字体验。',
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: '/og.png', width: 1733, height: 973, alt: '徐嘉妮个人设计作品集' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '徐嘉妮｜品牌与产品视觉设计',
    description: '企业品牌、销售内容、产品视觉与数字体验。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body><SiteNavigation />{children}</body>
    </html>
  );
}
