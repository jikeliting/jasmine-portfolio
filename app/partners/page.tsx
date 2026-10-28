'use client';
import PortfolioImage from '../portfolio-image';

import { useEffect, useRef, useState } from 'react';
import styles from '../culture/reader.module.css';

const pages = Array.from({ length: 25 }, (_, i) => ({
  src: `/work/partners-full/page-${String(i + 1).padStart(2, '0')}.jpg`,
  label: i === 0 ? '封面' : `第 ${String(i + 1).padStart(2, '0')} 页`,
}));

export default function PartnersReader() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const figures = useRef<(HTMLElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const lightbox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = '云纳招商手册 — JIANI XU';
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setCurrent(Number((visible[0].target as HTMLElement).dataset.index));
    }, { rootMargin: '-100px 0px -45% 0px' });
    figures.current.forEach(element => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (expanded === null) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [expanded]);

  function jump(index: number) {
    setIndexOpen(false);
    setCurrent(index);
    figures.current[index]?.scrollIntoView({
      block: 'start',
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }
  function open(index: number, element: HTMLElement) {
    opener.current = element;
    setZoom(false);
    setExpanded(index);
  }
  function close() {
    dialog.current?.close();
    setExpanded(null);
    setZoom(false);
    opener.current?.focus({ preventScroll: true });
  }
  function move(delta: number) {
    setExpanded(index => index === null ? null : Math.max(0, Math.min(pages.length - 1, index + delta)));
    setZoom(false);
    lightbox.current?.scrollTo(0, 0);
  }

  return <main className={`${styles.reader} ${styles.partnersTheme}`}>
    <div className="site-nav-spacer" aria-hidden="true" />
    <div className={styles.layout}>
      <aside className={styles.info}>
        <a className={styles.back} href="/work">← 返回项目</a>
        <h1>云纳<br />招商手册</h1>
        <p className={styles.english}>YUNNA PARTNERSHIP MANUAL</p>
        <section className={styles.meta}><h2>基本信息</h2><dl>
          <div><dt>时间</dt><dd>2026</dd></div>
          <div><dt>项目类型</dt><dd>招商与品牌传播手册</dd></div>
          <div><dt>我的角色</dt><dd>视觉设计 / 版式设计</dd></div>
          <div><dt>视觉方向</dt><dd>自然 / 温暖 / 商务</dd></div>
        </dl></section>
        <section className={styles.overview}><h2>项目概述</h2><p>从品牌认知、产品体系到合作模式，梳理面向潜在合作伙伴的阅读路径。以自然场景与清晰的信息编排，呈现产品应用和合作价值。</p></section>
        <a className={styles.skip} href="#partners-manual">开始阅读 ↓</a>
      </aside>
      <section id="partners-manual" className={styles.manual} aria-label="招商手册页面全览">
        <div className={styles.toolbar}><div><h2>手册全览</h2><span>向下滚动浏览 ↓</span></div><button onClick={() => setIndexOpen(value => !value)} aria-expanded={indexOpen} aria-controls="partners-page-index">{String(current + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')} <span aria-hidden="true">☷</span></button></div>
        <p className={styles.note}>完整手册 · 共 {pages.length} 页</p>
        {indexOpen && <nav id="partners-page-index" className={styles.index} aria-label="页面索引"><div><strong>跳转页面</strong><button onClick={() => setIndexOpen(false)} aria-label="关闭页面索引">×</button></div>{pages.map((page, index) => <button key={page.src} onClick={() => jump(index)} aria-current={current === index ? 'page' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{page.label}<span>↗</span></button>)}</nav>}
        <div className={styles.pages}>{pages.map((page, index) => <figure data-index={index} ref={element => { figures.current[index] = element; }} key={page.src} className={styles.figure}>
          {failed[index] ? <div className={styles.error}>此页暂时未能加载。<a href={page.src} target="_blank" rel="noreferrer">打开原图 ↗</a><button onClick={() => setFailed(old => ({ ...old, [index]: false }))}>重试</button></div> : <button className={styles.pageButton} onClick={event => open(index, event.currentTarget)} aria-label={`放大查看${page.label}`}><PortfolioImage src={page.src} alt={`云纳招商手册 — ${page.label}`} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(old => ({ ...old, [index]: true }))} /><span className={styles.expand} aria-hidden="true">⤢</span></button>}
          <figcaption><span>{String(index + 1).padStart(2, '0')} / {page.label}</span><span>点击放大</span></figcaption>
        </figure>)}</div>
        <footer className={styles.end}><p>已浏览完整手册</p><div><button onClick={() => jump(0)}>回到封面 ↑</button><a href="/work">返回项目 ↗</a></div></footer>
      </section>
    </div>
    <dialog ref={dialog} className={styles.dialog} aria-label="招商手册大图阅读器" onCancel={event => { event.preventDefault(); close(); }} onClose={() => { setExpanded(null); opener.current?.focus({ preventScroll: true }); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }}>
      {expanded !== null && <><div className={styles.dialogBar}><span>{pages[expanded].label} <small>{expanded + 1} / {pages.length}</small></span><div><button onClick={() => setZoom(value => !value)} aria-pressed={zoom}>{zoom ? '适应窗口' : '放大 150%'}</button><button onClick={close} autoFocus>关闭 ×</button></div></div><div ref={lightbox} className={`${styles.lightbox} ${zoom ? styles.zoomed : ''}`}><PortfolioImage fullResolution src={pages[expanded].src} alt={pages[expanded].label} /></div><div className={styles.dialogBottom}><button disabled={expanded === 0} onClick={() => move(-1)}>← 上一页</button><span>方向键切换 · Esc 关闭</span><button disabled={expanded === pages.length - 1} onClick={() => move(1)}>下一页 →</button></div></>}
    </dialog>
  </main>;
}
