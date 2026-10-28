'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './digital.module.css';

type Project = 'mini' | 'website' | 'motion';

export default function DigitalPage() {
  const miniProgramVideo = useRef<HTMLVideoElement>(null);
  const websiteVideo = useRef<HTMLVideoElement>(null);
  const productVideo = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project>('mini');
  const [motionKind, setMotionKind] = useState<'test' | 'ai'>('test');

  useEffect(() => {
    document.title = '数字体验与动态影像 — JIANI XU';
    const syncFromUrl = () => {
      miniProgramVideo.current?.pause();
      websiteVideo.current?.pause();
      productVideo.current?.pause();
      setPlaying(false);
      setProject(['#motion', '#motion-ai'].includes(location.hash) ? 'motion' : location.hash === '#website' ? 'website' : 'mini');
      setMotionKind(location.hash === '#motion-ai' ? 'ai' : 'test');
    };
    syncFromUrl();
    window.addEventListener('hashchange', syncFromUrl);
    return () => window.removeEventListener('hashchange', syncFromUrl);
  }, []);

  function start() {
    const target = project === 'motion' ? productVideo.current : project === 'mini' ? miniProgramVideo.current : websiteVideo.current;
    target?.play().catch(() => { /* Native controls remain available. */ });
  }

  function selectProject(next: Project) {
    miniProgramVideo.current?.pause();
    websiteVideo.current?.pause();
    productVideo.current?.pause();
    setPlaying(false);
    setProject(next);
    history.replaceState(null, '', next === 'motion' && motionKind === 'ai' ? '#motion-ai' : `#${next}`);
  }

  function selectMotion(next: 'test' | 'ai') {
    productVideo.current?.pause();
    setPlaying(false);
    setMotionKind(next);
    history.replaceState(null, '', next === 'ai' ? '#motion-ai' : '#motion');
  }
  const motionTitle = motionKind === 'ai' ? 'AI 动画演示' : '产品升温测试展示';
  const motionSource = motionKind === 'ai' ? '/work/digital/product-ai-animation.mp4' : '/work/digital/product-heating-test.mp4';

  const mini = project === 'mini';
  const projectTabs = <nav className={styles.projectTabs} aria-label="数字体验与动态影像分类">
    {([{ id: 'mini', label: '小程序设计' }, { id: 'website', label: '官网设计' }, { id: 'motion', label: '视频作品' }] as const).map(item =>
      <button key={item.id} aria-pressed={project === item.id} onClick={() => selectProject(item.id)}>{item.label}</button>)}
  </nav>;

  if (project === 'motion') return <main className={styles.page}>
    <div className="site-nav-spacer" aria-hidden="true" />
    <div className={styles.layout}>
      <aside className={styles.info}>
        <a className={styles.back} href="/dream-preview">← 返回作品预览</a>
        <p className={styles.kicker}>DIGITAL &amp; MOTION</p>
        {projectTabs}
        <h1>视频作品</h1>
        <p className={styles.subtitle}>产品演示与动态表达</p>
        <div className={styles.rule} />
        <h2>跨部门协助</h2>
        <p className={styles.description}>协助研发部门同事，将测试数据转化为可视化的对外宣传资料。</p>
        <button className={styles.playButton} onClick={start}>播放{motionKind === 'ai' ? ' AI 动画' : '测试视频'} <span aria-hidden="true">↗</span></button>
      </aside>
      <section className={styles.stage} aria-label="视频作品">
        <div className={styles.stageHeader}><div><span>MOTION</span><h2>{motionTitle}</h2></div></div>
        <nav className={`${styles.projectTabs} ${styles.motionTabs}`} aria-label="视频作品选择">
          <button aria-pressed={motionKind === 'test'} onClick={() => selectMotion('test')}>产品测试视频</button>
          <button aria-pressed={motionKind === 'ai'} onClick={() => selectMotion('ai')}>AI 动画演示</button>
        </nav>
        <div className={styles.motionDisplay}>
          <video key={motionKind} className={styles.motionVideo} ref={productVideo} controls playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label={motionTitle}>
            <source src={motionSource} type="video/mp4" />
            你的浏览器暂不支持播放此视频。
          </video>
        </div>
        <footer className={styles.footer}><span>JIANI XU / PORTFOLIO</span><a href="/dream-preview">返回作品预览 ↑</a></footer>
      </section>
    </div>
  </main>;
  const title = mini ? <>数字产品<br />体验</> : <>网站视觉<br />设计</>;
  const subtitle = mini ? '云纳微信小程序 · 操作录屏' : '云纳官网 · 操作录屏';
  const overview = mini
    ? '我主导云纳微信小程序从 0 到 1 的搭建，负责信息结构、界面视觉与交互流程。以品牌首页、产品浏览和定制入口串联完整的用户操作路径。'
    : '我主导云纳官网从 0 到 1 的视觉设计，负责全站文案、图片内容与页面交互的设计制作，将品牌与产品信息组织成清晰、连贯的网站体验。';

  return <main className={styles.page}>
    <div className="site-nav-spacer" aria-hidden="true" />
    <div className={styles.layout}>
      <aside className={styles.info}>
        <a className={styles.back} href="/work">← 返回项目首页</a>
        <p className={styles.kicker}>DIGITAL &amp; MOTION</p>
        {projectTabs}
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
        <div className={styles.stageHeader}><div><span>{mini ? 'INTERFACE / 01' : 'WEBSITE / 02'}</span><h2>{mini ? '小程序体验全览' : '网站体验全览'}</h2></div><span>{mini ? '00:28 · 竖屏录制' : '00:57 · 横屏录制'}</span></div>
        <div className={`${styles.display} ${mini ? '' : styles.displayWebsite}`}>
          {mini ? <><div className={styles.phone}>
            <video ref={miniProgramVideo} controls playsInline preload="metadata" poster="/work/digital/mini-program-cover.jpg" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="云纳微信小程序操作录屏">
              <source src="/work/digital/mini-program-tour.mp4" type="video/mp4" />
              你的浏览器暂不支持播放此视频。
            </video>
          </div><div className={styles.stageText}><span className={styles.dot} /> <span>{playing ? '正在播放' : '点击播放，探索界面'}</span><p>从品牌呈现到产品浏览，<br />沿着真实操作路径观看。</p></div></> : <><div className={styles.laptop}>
            <div className={styles.laptopScreen}><video ref={websiteVideo} controls playsInline preload="metadata" poster="/work/digital/website-cover.jpg" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="云纳官网操作录屏">
              <source src="/work/digital/website-tour-h264.mp4" type="video/mp4" />
              你的浏览器暂不支持播放此视频。
            </video></div><img className={styles.laptopFrame} src="/work/digital/laptop-frame.png" alt="" aria-hidden="true" />
          </div><div className={`${styles.stageText} ${styles.websiteStageText}`}><span className={styles.dot} /> <span>{playing ? '正在播放' : '点击播放，浏览网站'}</span><p>从品牌内容到交互细节，完整呈现网页体验。</p></div></>}
        </div>
        <footer className={styles.footer}><span>JIANI XU / PORTFOLIO</span><a href="/work">返回书架 ↑</a></footer>
      </section>
    </div>
  </main>;
}
