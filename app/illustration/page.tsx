'use client';

import PortfolioImage from '../portfolio-image';
import { useEffect, useRef, useState } from 'react';
import s from './illustration.module.css';

const works = [
  { src: '/work/illustration/illustration-01.jpg', title: '插画 01', note: '个人插画 / 东方幻想' },
  { src: '/work/illustration/illustration-02.jpg', title: '插画 02', note: '个人插画 / 装饰人物' },
  { src: '/work/illustration/illustration-03.jpg', title: '插画 03', note: '个人插画 / 节日场景' },
  { src: '/work/illustration/illustration-04.jpg', title: '插画 04', note: '角色创作 / Q版人物' },
  { src: '/work/illustration/illustration-05.jpg', title: '插画 05', note: '角色创作 / 三视图' },
  { src: '/work/illustration/illustration-06.jpg', title: '插画 06', note: '个人插画 / 国风图案' },
  { src: '/work/illustration/illustration-07.jpg', title: '插画 07', note: '个人插画 / 剪纸主题' },
  { src: '/work/illustration/illustration-08.jpg', title: '插画 08', note: '角色创作 / 人物插画' },
];

const columns = [
  { items: works.slice(0, 2), className: s.columnOne },
  { items: works.slice(2, 4), className: s.columnTwo },
  { items: works.slice(4, 6), className: s.columnThree },
  { items: works.slice(6, 8), className: s.columnFour },
];

export default function IllustrationPage() {
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (selected !== null && event.key === 'ArrowRight') setSelected(current => current === null ? null : (current + 1) % works.length);
      if (selected !== null && event.key === 'ArrowLeft') setSelected(current => current === null ? null : (current - 1 + works.length) % works.length);
    };
    addEventListener('keydown', close);
    return () => removeEventListener('keydown', close);
  }, [selected]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const story = storyRef.current;
        const stage = stageRef.current;
        if (!story || !stage) return;

        const mobile = matchMedia('(max-width: 760px)').matches;
        if (mobile) {
          wallRef.current?.style.setProperty('--wall-shift', '0px');
          if (progressRef.current) progressRef.current.textContent = '上下滚动，浏览全部插画';
          return;
        }

        const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-nav-height')) || 120;
        const scrollRange = Math.max(1, story.offsetHeight - stage.offsetHeight);
        const travelled = headerHeight - story.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, travelled / scrollRange));
        const shift = Math.round(progress * window.innerHeight * 0.58);
        wallRef.current?.style.setProperty('--wall-shift', `${shift}px`);
        if (progressRef.current) {
          progressRef.current.textContent = progress < 0.05 ? '向下滚动，浏览全部插画' : `${String(Math.min(8, Math.max(1, Math.ceil(progress * works.length)))).padStart(2, '0')} / 08 · 继续滚动`;
        }
      });
    };

    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  }, []);

  function move(step: number) {
    setSelected(current => current === null ? null : (current + step + works.length) % works.length);
  }

  return <main className={s.page}>
    <div className="site-nav-spacer" aria-hidden="true" />

    <section className={s.story} ref={storyRef} aria-label="插画作品瀑布流">
      <div className={s.stage} ref={stageRef}>
        <div className={s.mintBackdrop} aria-hidden="true" />

        <div className={s.waterfall} ref={wallRef}>
          {columns.map((column, columnIndex) => <div className={`${s.column} ${column.className}`} key={column.className}>
            {column.items.map((work, itemIndex) => {
              const workIndex = works.indexOf(work);
              return <article className={s.poster} key={work.src}>
                <button onClick={() => setSelected(workIndex)} aria-label={`放大查看${work.title}，${work.note}`}>
                  <PortfolioImage src={work.src} alt={`${work.title}，${work.note}`} loading={columnIndex === 0 && itemIndex === 0 ? 'eager' : 'lazy'} sizes="(max-width: 760px) 46vw, 20vw" />
                </button>
                <span className={s.posterIndex}>{String(workIndex + 1).padStart(2, '0')} / 08</span>
              </article>;
            })}
          </div>)}
        </div>

        <article className={s.phone} aria-label="插画作品项目介绍">
          <span className={s.notch} aria-hidden="true" />
          <div className={s.phoneTop}><span>JIANI XU</span><span>08 WORKS</span></div>
          <div className={s.phoneCopy}>
            <p className={s.eyebrow}>SELECTED WORKS <i>01</i></p>
            <h1>插画作品</h1>
            <p className={s.english}>Illustration</p>
            <p className={s.description}>以角色创作与东方幻想为线索，记录色彩、想象与日常故事。</p>
          </div>
          <dl className={s.details}>
            <div><dt>创作方向</dt><dd>角色与幻想</dd></div>
            <div><dt>作品数量</dt><dd>08 幅插画</dd></div>
            <div><dt>作品形式</dt><dd>个人创作</dd></div>
          </dl>
          <div className={s.scrollHint}>
            <span className={s.scrollArrow} aria-hidden="true">↓</span>
            <span ref={progressRef}>向下滚动，浏览全部插画</span>
          </div>
        </article>
      </div>
    </section>

    <footer className={s.footer}><span>JIANI XU / ILLUSTRATION</span><a href="#top">回到顶部 ↑</a></footer>

    {selected !== null && <div className={s.lightbox} role="dialog" aria-modal="true" aria-label={`${works[selected].title}大图`} onClick={() => setSelected(null)}>
      <button className={s.close} onClick={() => setSelected(null)} aria-label="关闭">×</button>
      <button className={s.prev} onClick={event => { event.stopPropagation(); move(-1); }} aria-label="上一张">←</button>
      <PortfolioImage fullResolution src={works[selected].src} alt={`${works[selected].title}，${works[selected].note}`} onClick={event => event.stopPropagation()} />
      <button className={s.next} onClick={event => { event.stopPropagation(); move(1); }} aria-label="下一张">→</button>
      <p>{works[selected].title} · {works[selected].note}</p>
    </div>}
  </main>;
}
