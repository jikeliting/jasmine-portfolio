'use client';

import { useEffect, useRef } from 'react';
import { createPlanet, clamp, smooth } from './planet';
import s from './dream-preview.module.css';

const works = [
  { title: '品牌与营销设计', category: '01 / BRAND & MARKETING', text: '从企业品牌、文化画册到营销海报与推广物料，让品牌表达贯穿每一次沟通。', image: '/work/culture-full/page-01.jpg', href: '/work', links: [{ label: '浏览品牌与营销作品', href: '/work' }] },
  { title: '数字体验与动态影像', category: '02 / DIGITAL & MOTION', text: '以小程序、官网与动态影像，探索产品和品牌在屏幕中的表达。', image: '/work/digital/website-cover.jpg', href: '/digital', links: [{ label: '小程序', href: '/digital#mini' }, { label: '官网', href: '/digital#website' }, { label: '视频作品', href: '/digital#motion' }] },
];

export default function DreamPreviewPage() {
  const story = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const root = story.current;
    const surface = canvas.current;
    if (!root || !surface) return;
    const renderer = createPlanet(surface);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, last = 0, progress = 0, target = 0;
    let visible = true;
    const measure = () => {
      const rect = root.getBoundingClientRect();
      target = clamp(-rect.top / Math.max(1, rect.height - innerHeight));
    };
    const resize = () => { renderer?.resize(); measure(); };
    const render = (now: number) => {
      const dt = Math.min((now - last) / 1000 || .016, .05);
      last = now;
      progress = reduced.matches ? target : progress + (target - progress) * (1 - Math.exp(-dt * 12));
      if (Math.abs(progress - target) < .00005) progress = target;
      const flip = smooth((progress - .12) / .34);
      const night = smooth((progress - .14) / .32);
      root.style.setProperty('--night', String(night));
      root.style.setProperty('--title-opacity', String(1 - smooth((progress - .13) / .13)));
      root.style.setProperty('--title-rise', `${reduced.matches ? 0 : -smooth(progress / .12) * 170}px`);
      root.style.setProperty('--cue-opacity', String(1 - smooth(progress / .09)));
      root.style.setProperty('--end-opacity', String(smooth((progress - .94) / .06)));
      root.dataset.night = night > .6 ? 'true' : 'false';
      const end = root.querySelector<HTMLElement>('[data-end]');
      if (end) end.inert = progress < .97;
      cards.current.forEach((card, index) => {
        if (!card) return;
        const slot = .48 / works.length;
        const start = .46 + index * slot;
        const enter = smooth((progress - start) / .06);
        const exit = smooth((progress - start - slot + .06) / .06);
        const opacity = enter * (1 - exit);
        card.style.opacity = String(opacity);
        card.style.transform = reduced.matches ? 'none' : `translateY(${(1 - enter) * 85 - exit * 65}px) scale(${.94 + enter * .06 - exit * .025})`;
        card.inert = opacity < .8;
        card.setAttribute('aria-hidden', String(opacity < .8));
      });
      if (visible && !document.hidden) renderer?.draw(reduced.matches ? (flip > .5 ? 1 : 0) : flip, night, reduced.matches ? 0 : now / 1000);
      frame = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(root);
    resize(); progress = target;
    frame = requestAnimationFrame(render);
    addEventListener('scroll', measure, { passive: true });
    addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      renderer?.dispose();
      removeEventListener('scroll', measure); removeEventListener('resize', resize);
    };
  }, []);

  return <main id="dream-preview" className={s.page}>
    <section ref={story} className={s.story} aria-label="Elsewhere，从白昼花园进入夜空作品集">
      <div className={s.stage}>
        <div className={s.day} />
        <div className={s.night} aria-hidden="true">
          {Array.from({ length: 85 }, (_, i) => <i key={i} style={{ left: `${(i * 61.83) % 100}%`, top: `${(i * 37.17) % 100}%`, width: i % 9 === 0 ? 3 : 1, height: i % 9 === 0 ? 3 : 1, opacity: .25 + (i % 5) * .15 }} />)}
        </div>
        <div className={s.wordmark}><img src="/concepts/elsewhere/wordmark.png" alt="Elsewhere" /><p>A SMALL WORLD OF MY OWN</p></div>
        <canvas ref={canvas} className={s.planet} aria-label="长着郁金香、拥有湖泊的苔藓星球，随滚动在平面内从右往左倒转" role="img" />
        <div className={s.scrollCue}><span>向下看看我的作品</span><small>Explore my work</small><b aria-hidden="true">↓</b></div>
        <a className={s.skip} href="#dream-work-end">跳过开场 ↗</a>
        <div className={s.chapter} aria-hidden="true">ELSEWHERE / SELECTED WORK</div>
        {works.map((work, i) => <article key={work.href} ref={el => { cards.current[i] = el; }} className={s.work} inert aria-hidden="true">
          <a className={s.art} href={work.href} tabIndex={-1} aria-hidden="true"><img src={work.image} alt="" /></a>
          <div className={s.copy}><small>{work.category}</small><h2>{work.title}</h2><p>{work.text}</p><nav className={s.workLinks} aria-label={work.title}>{work.links.map(link => <a key={link.href} href={link.href}>{link.label} <span>↗</span></a>)}</nav></div>
        </article>)}
        <div className={s.end} data-end inert><small>THE DREAM CONTINUES</small><h2>还想去哪里？</h2><nav><a href="/projects">全部作品 ↗</a><a href="/work#about">关于我 ↗</a></nav></div>
      </div>
    </section>
    <footer id="dream-work-end" className={s.footer}><p>徐嘉妮 / JIANI XU</p><nav><a href="/projects">浏览全部作品 ↗</a><a href="/work#contact">联系我 ↗</a></nav></footer>
  </main>;
}

