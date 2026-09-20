'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './digital.module.css';

export default function DigitalPage() {
  const miniProgramVideo = useRef<HTMLVideoElement>(null);
  const websiteVideo = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<'mini' | 'website'>('mini');

  useEffect(() => { document.title = '数字产品体验 — JIANI XU'; }, []);

  function start() {
    const target = project === 'mini' ? miniProgramVideo.current : websiteVideo.current;
    target?.play().catch(() => { /* Native controls remain available. */ });
  }

  const mini = project === 'mini';
  const title = mini ? <>数字产品<br />体验</> : <>网站视觉<br />设计</>;
  const subtitle = mini ? '云纳微信小程序 · 操作录屏' : '云纳官网 · 操作录屏';
  const overview = mini
    ? '我主导云纳微信小程序从 0 到 1 的搭建，负责信息结构、界面视觉与交互流程。以品牌首页、产品浏览和定制入口串联完整的用户操作路径。'
    : '我主导云纳官网从 0 到 1 的视觉设计，负责全站文案、图片内容与页面交互的设计制作，将品牌与产品信息组织成清晰、连贯的网站体验。';

  return <main className={styles.page}>
    <header className={styles.header}>
      <a className={styles.logo} href="/#work">JIANI XU</a>
      <nav aria-label="主导航"><a href="/#work">在职项目</a><a href="mailto:250220669@qq.com">联系</a></nav>
    </header>
    <div className={styles.layout}>
      <aside className={styles.info}>
        <a className={styles.back} href="/#work">← 返回项目首页</a>
        <p className={styles.kicker}>04 / DIGITAL EXPERIENCE</p>
        <div className={styles.projectTabs} role="tablist" aria-label="数字体验项目">
          <button role="tab" aria-selected={mini} onClick={() => { setProject('mini'); setPlaying(false); }}>01 小程序</button>
          <button role="tab" aria-selected={!mini} onClick={() => { setProject('website'); setPlaying(false); }}>02 网站</button>
        </div>
        <h1>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.rule} />
        <h2>基本信息</h2>
        <dl><div><dt>时间</dt><dd>2026</dd></div><div><dt>项目类型</dt><dd>{mini ? '微信小程序' : '品牌官方网站'}</dd></div><div><dt>我的角色</dt><dd>从 0 到 1 主导设计</dd></div><div><dt>负责内容</dt><dd>{mini ? '信息结构 / 视觉 / 交互' : '文案 / 图片 / 交互'}</dd></div></dl>
        <h2>项目概述</h2>
        <p className={styles.description}>{overview}</p>
        <button className={styles.playButton} onClick={start}>播放录屏 <span aria-hidden="true">↗</span></button>
      </aside>
      <section className={styles.stage} aria-label={mini ? '微信小程序操作录屏' : '网站操作录屏'}>
        <div className={styles.stageHeader}><div><span>{mini ? 'INTERFACE / 01' : 'WEBSITE / 02'}</span><h2>{mini ? '小程序体验全览' : '网站体验全览'}</h2></div><span>{mini ? '00:28 · 竖屏录制' : '网站操作录屏 · 横屏'}</span></div>
        <div className={styles.display}>
          {mini ? <><div className={styles.phone}>
            <video ref={miniProgramVideo} controls playsInline preload="metadata" poster="/work/digital/mini-program-cover.jpg" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="云纳微信小程序操作录屏">
              <source src="/work/digital/mini-program-tour.mp4" type="video/mp4" />
              你的浏览器暂不支持播放此视频。
            </video>
          </div><div className={styles.stageText}><span className={styles.dot} /> <span>{playing ? '正在播放' : '点击播放，探索界面'}</span><p>从品牌呈现到产品浏览，<br />沿着真实操作路径观看。</p></div></> : <><div className={styles.laptop}>
            <div className={styles.camera} aria-hidden="true" />
            <div className={styles.laptopScreen}><video ref={websiteVideo} controls playsInline preload="metadata" poster="/work/digital/website-cover.jpg" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="云纳官网操作录屏">
              <source src="/work/digital/website-tour-h264.mp4" type="video/mp4" />
              你的浏览器暂不支持播放此视频。
            </video></div><div className={styles.laptopBase} aria-hidden="true" />
          </div><div className={styles.stageText}><span className={styles.dot} /> <span>{playing ? '正在播放' : '点击播放，浏览网站'}</span><p>从品牌内容到交互细节，<br />完整呈现网页体验。</p></div></>}
        </div>
        <footer className={styles.footer}><span>JIANI XU / PORTFOLIO</span><a href="/#work">返回书架 ↑</a></footer>
      </section>
    </div>
  </main>;
}
