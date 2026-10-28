'use client';

import { useRef, type PointerEvent } from 'react';
import LiquidWater from './liquid-water';
import s from './preview.module.css';

export default function IllustrationPreviewPage() {
  const pointer = useRef({ x: 0, y: 0 });

  function followPointer(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((event.clientX - rect.left) / rect.width - .5) * 2,
      y: ((event.clientY - rect.top) / rect.height - .5) * 2,
    };
  }

  return <main className={s.page}>
    <section className={s.scene} aria-label="徐嘉妮视觉设计作品集首页"
      onPointerMove={followPointer}
      onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}>
      

      <div className={s.paperSky} aria-hidden="true">
        <span className={s.sun} />
        <svg className={s.doodle} viewBox="0 0 1400 900" preserveAspectRatio="none">
          <path d="M967 204c56-19 126-17 174 8s106 27 158 7M989 218c56-10 112-6 159 15s99 22 145 8M68 629c34-24 66-20 97-5s63 17 103-1" />
          <path d="m1170 143 7-21 6 21 21 6-21 7-6 21-7-21-21-7Zm-796 44 4-11 3 11 11 3-11 4-3 11-4-11-11-4Z" />
          <path d="M961 128q14-14 27-1q13-13 27 1M1067 90q10-10 20 0q10-10 20 0" />
        </svg>
        <span className={s.script}>a little world of my own</span>
      </div>

      <div className={s.intro}>
        <p className={s.eyebrow}>JIANI&apos;S PORTFOLIO <span>2026</span></p>
        <h1>让想象，<br />自由航行。</h1>
        <p className={s.description}>品牌、数字体验与个人创作。<br />从日常出发，探索设计的更多可能。</p>
        <div className={s.links}>
          <a href="/work">企业宣传项目 <span aria-hidden="true">↗</span></a>
          <a href="/projects">作品导航 <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <div className={s.water} aria-hidden="true">
        <LiquidWater pointer={pointer} />
      </div>
      <div className={s.waterCaption} aria-hidden="true">
        <span>follow the little wonders</span>
        <small>VISUAL DESIGN &amp; IMAGINATION</small>
      </div>

      <footer className={s.labelBar}>
        <a href="/projects"><b>徐嘉妮作品集</b><span>JIANI XU / PORTFOLIO</span></a>
        <p>SELECTED WORKS · 2025—2026</p>
        <a className={s.enter} href="/work"><span>一起启航</span><em aria-hidden="true">₍ᐢ. ̫.ᐢ₎</em><i aria-hidden="true">↗</i></a>
      </footer>
    </section>
  </main>;
}
