'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import s from './site-navigation.module.css';

const links = [
  { href: '/', label: '首页', key: 'home' },
  { href: '/work', label: '企业宣传项目', key: 'work' },
  { href: '/projects', label: '作品导航', key: 'projects' },
  { href: '/work#about', label: '关于我', key: 'about' },
];

export default function SiteNavigation() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [pathname]);
  const active = pathname === '/work' && ['#about', '#contact'].includes(hash)
    ? hash.slice(1)
    : pathname === '/' || pathname === '/illustration-preview' || pathname === '/dream-preview' ? 'home'
    : ['/projects', '/illustration'].includes(pathname) ? 'projects' : 'work';

  return <header className={s.header}>
    <Link className={s.logo} href="/" onClick={() => setHash('')} aria-label="JIANI XU，返回首页">
      JIANI XU<span>VISUAL DESIGNER</span>
    </Link>
    <nav aria-label="主导航">
      {links.map(link => <Link key={link.key} href={link.href}
        aria-current={active === link.key ? 'page' : undefined}
        onClick={() => setHash(link.href.includes('#') ? '#' + link.href.split('#')[1] : '')}>
        {link.label}
      </Link>)}
    </nav>
  </header>;
}


