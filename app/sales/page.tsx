'use client';
import { useEffect,useRef,useState } from 'react';
import styles from '../culture/reader.module.css';

const pages=Array.from({length:20},(_,i)=>({src:`/work/sales-full/page-${String(i+1).padStart(2,'0')}.jpg`,label:i===0?'封面':`第 ${String(i+1).padStart(2,'0')} 页`}));

export default function SalesReader(){
 const [current,setCurrent]=useState(0),[expanded,setExpanded]=useState<number|null>(null),[zoom,setZoom]=useState(false),[indexOpen,setIndexOpen]=useState(false);
 const figures=useRef<(HTMLElement|null)[]>([]),dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLElement|null>(null),lightbox=useRef<HTMLDivElement>(null);
 useEffect(()=>{document.title='智能采暖产品销售手册 — JIANI XU';const observer=new IntersectionObserver(es=>{const v=es.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(v[0])setCurrent(Number((v[0].target as HTMLElement).dataset.index));},{rootMargin:'-100px 0px -45% 0px'});figures.current.forEach(el=>el&&observer.observe(el));return()=>observer.disconnect();},[]);
 useEffect(()=>{if(expanded===null)return;dialog.current?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};},[expanded]);
 function jump(i:number){setIndexOpen(false);setCurrent(i);figures.current[i]?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 function open(i:number,el:HTMLElement){opener.current=el;setExpanded(i);setZoom(false);}
 function close(){dialog.current?.close();setExpanded(null);setZoom(false);opener.current?.focus({preventScroll:true});}
 function move(d:number){setExpanded(i=>i===null?null:Math.max(0,Math.min(pages.length-1,i+d)));setZoom(false);lightbox.current?.scrollTo(0,0);}
 return <main className={`${styles.reader} ${styles.salesTheme}`}>
  <header className={styles.header}><a className={styles.logo} href="/#work">JIANI XU</a><nav aria-label="主导航"><a href="/#work">Projects</a><button onClick={()=>setIndexOpen(v=>!v)} aria-expanded={indexOpen}>页面索引</button><a href="mailto:250220669@qq.com">Contact</a></nav></header>
  <div className={styles.layout}><aside className={styles.info}><a className={styles.back} href="/#work">← 返回项目</a><h1>智能采暖产品<br/>销售手册</h1><p className={styles.english}>SMART HEATING PRODUCT SALES MANUAL</p>
   <section className={styles.meta}><h2>基本信息</h2><dl><div><dt>时间</dt><dd>2025—2026</dd></div><div><dt>项目类型</dt><dd>ToC 产品销售手册</dd></div><div><dt>我的角色</dt><dd>视觉设计 / 版式设计 / 信息整理</dd></div><div><dt>视觉方向</dt><dd>现代 / 清晰 / 产品导向</dd></div></dl></section>
   <section className={styles.overview}><h2>项目概述</h2><p>围绕智能采暖产品的功能、优势与使用场景，重新组织产品信息与阅读路径。通过清晰的层级和统一的视觉语言，帮助用户更快速地理解产品价值。</p></section><a className={styles.skip} href="#sales-manual">开始阅读 ↓</a></aside>
   <section id="sales-manual" className={styles.manual} aria-label="销售手册页面全览"><div className={styles.toolbar}><div><h2>手册全览</h2><span>向下滚动浏览 ↓</span></div><button onClick={()=>setIndexOpen(v=>!v)} aria-expanded={indexOpen}>{String(current+1).padStart(2,'0')} / {String(pages.length).padStart(2,'0')} <span>☷</span></button></div><p className={styles.note}>完整手册 · 共 {pages.length} 页</p>
    {indexOpen&&<nav className={styles.index} aria-label="页面索引"><div><strong>跳转页面</strong><button onClick={()=>setIndexOpen(false)}>×</button></div>{pages.map((p,i)=><button key={p.src} onClick={()=>jump(i)} aria-current={current===i?'page':undefined}><span>{String(i+1).padStart(2,'0')}</span>{p.label}<span>↗</span></button>)}</nav>}
    <div className={styles.pages}>{pages.map((p,i)=><figure data-index={i} ref={el=>{figures.current[i]=el;}} key={p.src} className={styles.figure}><button className={styles.pageButton} onClick={e=>open(i,e.currentTarget)} aria-label={`放大查看${p.label}`}><img src={p.src} alt={`智能采暖产品销售手册 — ${p.label}`} loading={i<2?'eager':'lazy'} decoding="async"/><span className={styles.expand}>⤢</span></button><figcaption><span>{String(i+1).padStart(2,'0')} / {p.label}</span><span>点击放大</span></figcaption></figure>)}</div>
    <footer className={styles.end}><p>已浏览完整手册</p><div><button onClick={()=>jump(0)}>回到封面 ↑</button><a href="/#work">返回项目 ↗</a></div></footer></section></div>
  <dialog ref={dialog} className={styles.dialog} aria-label="销售手册大图阅读器" onCancel={e=>{e.preventDefault();close();}} onClose={()=>{setExpanded(null);opener.current?.focus({preventScroll:true});}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}}}>{expanded!==null&&<><div className={styles.dialogBar}><span>{pages[expanded].label} <small>{expanded+1} / {pages.length}</small></span><div><button onClick={()=>setZoom(v=>!v)} aria-pressed={zoom}>{zoom?'适应窗口':'放大 150%'}</button><button onClick={close} autoFocus>关闭 ×</button></div></div><div ref={lightbox} className={`${styles.lightbox} ${zoom?styles.zoomed:''}`}><img src={pages[expanded].src} alt={pages[expanded].label}/></div><div className={styles.dialogBottom}><button disabled={expanded===0} onClick={()=>move(-1)}>← 上一页</button><span>方向键切换 · Esc 关闭</span><button disabled={expanded===pages.length-1} onClick={()=>move(1)}>下一页 →</button></div></>}</dialog>
 </main>;
}
