'use client';
import PortfolioImage from '../portfolio-image';

import { useEffect, useRef, useState } from 'react';
import styles from './reader.module.css';
import ProjectSwitch from './project-switch';

const pages = Array.from({ length: 24 }, (_, i) => ({
  src: `/work/culture-full/page-${String(i + 1).padStart(2, '0')}.jpg`,
  label: i === 0 ? '封面' : `第 ${String(i + 1).padStart(2, '0')} 页`,
}));

export default function CultureReader() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const dialog = useRef<HTMLDialogElement>(null);
  const figures = useRef<(HTMLElement | null)[]>([]);
  const opener = useRef<HTMLElement | null>(null);
  const lightbox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = '云纳企业文化及战略规划 — JIANI XU';
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setCurrent(Number((visible[0].target as HTMLElement).dataset.index));
    }, { rootMargin: '-100px 0px -45% 0px', threshold: 0 });
    figures.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (expanded === null) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [expanded]);

  function jump(i: number) {
    setIndexOpen(false);
    setCurrent(i);
    figures.current[i]?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  function open(i: number, el: HTMLElement) {
    opener.current = el;
    setZoom(false);
    setExpanded(i);
  }
  function close() {
    dialog.current?.close();
    setExpanded(null);
    setZoom(false);
    opener.current?.focus({ preventScroll: true });
  }
  function move(delta: number) {
    setExpanded(i => i === null ? null : Math.max(0, Math.min(pages.length - 1, i + delta)));
    setZoom(false);
    lightbox.current?.scrollTo(0, 0);
  }

  return <main className={styles.reader}>
    <div className="site-nav-spacer" aria-hidden="true" />
    <div className={styles.layout}>
      <aside className={styles.info}>
        <a className={`${styles.back} ${styles.switchBack}`} href="/work">← 返回项目</a>
        <ProjectSwitch active="culture" />
        <h1>云纳企业文化<br />及战略规划</h1>
        <p className={styles.english}>CORPORATE CULTURE MANUAL</p>
        <section className={styles.meta}><h2>基本信息</h2><dl>
          <div><dt>时间</dt><dd>2025</dd></div>
          <div><dt>项目类型</dt><dd>企业文化手册</dd></div>
          <div><dt>我的角色</dt><dd>视觉设计 / 版式设计</dd></div>
          <div><dt>视觉方向</dt><dd>现代 / 简洁 / 品牌化</dd></div>
        </dl></section>
        <section className={styles.overview}><h2>项目概述</h2><p>以清晰的内容层级与统一的视觉语言，呈现企业文化与发展方向。通过图文编排，让信息更易阅读，让品牌形象更有凝聚力。</p></section>
        <a className={styles.skip} href="#manual">开始阅读 ↓</a>
      </aside>
      <section id="manual" className={styles.manual} aria-label="手册页面全览">
        <div className={styles.toolbar}><div><h2>手册全览</h2><span>向下滚动浏览 ↓</span></div><button onClick={() => setIndexOpen(v => !v)} aria-expanded={indexOpen} aria-controls="page-index">{String(current + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')} <span aria-hidden="true">☷</span><span className={styles.sr}> 打开页面索引</span></button></div>
        <p className={styles.note}>完整手册 · 共 {pages.length} 页</p>
        {indexOpen && <nav id="page-index" className={styles.index} aria-label="页面索引"><div><strong>跳转页面</strong><button onClick={() => setIndexOpen(false)} aria-label="关闭页面索引">×</button></div>{pages.map((p, i) => <button key={p.src} onClick={() => jump(i)} aria-current={current === i ? 'page' : undefined}><span>{String(i + 1).padStart(2, '0')}</span>{p.label}<span>↗</span></button>)}</nav>}
        <div className={styles.pages}>{pages.map((p, i) => <figure data-index={i} ref={el => { figures.current[i] = el; }} key={p.src} className={styles.figure}>
          {failed[i] ? <div className={styles.error}>此页暂时未能加载。<a href={p.src} target="_blank" rel="noreferrer">打开原图 ↗</a><button onClick={() => setFailed(old => ({ ...old, [i]: false }))}>重试</button></div> : <button className={styles.pageButton} onClick={e => open(i, e.currentTarget)} aria-label={`放大查看${p.label}`}><PortfolioImage src={p.src} alt={`云纳企业文化及战略规划 — ${p.label}`} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(old => ({ ...old, [i]: true }))} /><span className={styles.expand} aria-hidden="true">⤢</span></button>}
          <figcaption><span>{String(i + 1).padStart(2, '0')} / {p.label}</span><span>点击放大</span></figcaption>
        </figure>)}</div>
        <footer className={styles.end}><p>已浏览完当前展示内容</p><div><button onClick={() => jump(0)}>回到封面 ↑</button><a href="/work">返回项目 ↗</a></div></footer>
      </section>
    </div>
    <dialog ref={dialog} className={styles.dialog} aria-label="手册大图阅读器" onCancel={e => { e.preventDefault(); close(); }} onClose={() => { setExpanded(null); opener.current?.focus({ preventScroll: true }); }} onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}>
      {expanded !== null && <><div className={styles.dialogBar}><span>{pages[expanded].label} <small>{expanded + 1} / {pages.length}</small></span><div><button onClick={() => setZoom(v => !v)} aria-pressed={zoom}>{zoom ? '适应窗口' : '放大 150%'}</button><button onClick={close} autoFocus aria-label="关闭大图">关闭 ×</button></div></div>
        <div ref={lightbox} className={`${styles.lightbox} ${zoom ? styles.zoomed : ''}`} onClick={e => { if (e.target === e.currentTarget) close(); }}><PortfolioImage fullResolution src={pages[expanded].src} alt={pages[expanded].label} /></div>
        <div className={styles.dialogBottom}><button disabled={expanded === 0} onClick={() => move(-1)}>← 上一页</button><span>方向键切换 · Esc 关闭</span><button disabled={expanded === pages.length - 1} onClick={() => move(1)}>下一页 →</button></div></>}
    </dialog>
  </main>;
}

