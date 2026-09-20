'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './digital.module.css';

export default function DigitalPage() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { document.title = '数字产品体验 — JIANI XU'; }, []);

  function start() {
    video.current?.play().catch(() => { /* Native controls remain available. */ });
  }

  return <main className={styles.page}>
    <header className={styles.header}>
      <a className={styles.logo} href="/#work">JIANI XU</a>
      <nav aria-label="主导航"><a href="/#work">在职项目</a><a href="mailto:250220669@qq.com">联系</a></nav>
    </header>
    <div className={styles.layout}>
      <aside className={styles.info}>
        <a className={styles.back} href="/#work">← 返回项目首页</a>
        <p className={styles.kicker}>04 / DIGITAL EXPERIENCE</p>
        <h1>数字产品<br />体验</h1>
        <p className={styles.subtitle}>云纳微信小程序 · 操作录屏</p>
        <div className={styles.rule} />
        <h2>基本信息</h2>
        <dl><div><dt>时间</dt><dd>2026</dd></div><div><dt>项目类型</dt><dd>微信小程序</dd></div><div><dt>展示形式</dt><dd>界面操作录屏</dd></div></dl>
        <h2>项目概述</h2>
        <p className={styles.description}>以实际操作录屏呈现小程序中的品牌界面与产品浏览体验。点击画面即可播放，也可以通过视频控件暂停、拖动进度或进入全屏。</p>
        <button className={styles.playButton} onClick={start}>播放录屏 <span aria-hidden="true">↗</span></button>
      </aside>
      <section className={styles.stage} aria-label="微信小程序操作录屏">
        <div className={styles.stageHeader}><div><span>INTERFACE / 01</span><h2>小程序体验全览</h2></div><span>00:28 · 竖屏录制</span></div>
        <div className={styles.display}>
          <div className={styles.phone}>
            <video ref={video} controls playsInline preload="metadata" poster="/work/digital/mini-program-cover.jpg" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="云纳微信小程序操作录屏">
              <source src="/work/digital/mini-program-tour.mp4" type="video/mp4" />
              你的浏览器暂不支持播放此视频。
            </video>
          </div>
          <div className={styles.stageText}><span className={styles.dot} /> <span>{playing ? '正在播放' : '点击播放，探索界面'}</span><p>从品牌呈现到产品浏览，<br />沿着真实操作路径观看。</p></div>
        </div>
        <footer className={styles.footer}><span>JIANI XU / PORTFOLIO</span><a href="/#work">返回书架 ↑</a></footer>
      </section>
    </div>
  </main>;
}
