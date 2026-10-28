'use client';
import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import PortfolioImage from '../portfolio-image';
import s from './projects.module.css';
import SilverFlakes from './silver-flakes';

const projects = [
  {id:'illustration',name:'插画',image:'/work/illustration/illustration-02.jpg',href:'/illustration'},
  {id:'motion',name:'动态海报',image:'/concepts/motion-flowers-v1.webp',href:'/concepts/motion-flowers-v1.webp'},
];

export default function ProjectsPage() {
  const [hover,setHover]=useState<string|null>(null);
  const [pinned,setPinned]=useState<string|null>(null);
  const [selected,setSelected]=useState<string|null>(null);
  const [turn,setTurn]=useState(0);
  const [position,setPosition]=useState(0);
  const [dragging,setDragging]=useState(false);
  const drag=useRef<{id:number;x:number;y:number;start:number;step:number;moved:boolean}|null>(null);
  const suppressClick=useRef(false);
  const project=projects.find(p=>p.id===selected);
  function choose(index:number){
    const next=Math.max(0,Math.min(projects.length-1,index));
    const id=projects[next].id;
    setPosition(next);setPinned(id);setHover(null);
    if(id!==selected){setSelected(id);setTurn(n=>n+1);}
  }
  function startDrag(e:PointerEvent<HTMLDivElement>){
    if(!e.isPrimary||e.button!==0)return;
    suppressClick.current=false;
    drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,start:position,step:Math.max(110,e.currentTarget.clientWidth*.25),moved:false};
  }
  function moveDrag(e:PointerEvent<HTMLDivElement>){
    const d=drag.current;if(!d||d.id!==e.pointerId)return;
    const dx=e.clientX-d.x,dy=e.clientY-d.y;
    if(!d.moved){
      if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){drag.current=null;return;}
      if(Math.abs(dx)<7)return;
      d.moved=true;setDragging(true);setHover(null);e.currentTarget.setPointerCapture(e.pointerId);
    }
    setPosition(Math.max(0,Math.min(projects.length-1,d.start-dx/d.step)));
  }
  function endDrag(e:PointerEvent<HTMLDivElement>,cancel=false){
    const d=drag.current;if(!d||d.id!==e.pointerId)return;
    drag.current=null;setDragging(false);
    if(d.moved){suppressClick.current=true;choose(cancel?Math.round(d.start):Math.round(Math.max(0,Math.min(projects.length-1,d.start-(e.clientX-d.x)/d.step))));}
    if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
  }
  return <main className={s.page} onKeyDown={e=>{if(e.key==='Escape'){setPinned(null);setHover(null);}}}>
    <SilverFlakes/>
    <header className={s.heading}><span>SELECTED WORK / 02</span><h1>作品导航</h1><p>A little world of ideas.</p></header>
    <section className={s.stage} aria-label="选择项目并翻阅作品">
      <div className={s.tiles} data-dragging={dragging} aria-label="左右拖动选择项目" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={e=>endDrag(e)} onPointerCancel={e=>endDrag(e,true)} onClickCapture={e=>{if(suppressClick.current){e.preventDefault();e.stopPropagation();suppressClick.current=false;}}}
        onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();choose(Math.round(position)+(e.key==='ArrowRight'?1:-1));}}}>
        {projects.map((p,i)=>{const angle=(i-position)*.56;return <button key={p.id} className={s.tile} style={{'--arc-x':Math.sin(angle),'--arc-y':1-Math.cos(angle),'--arc-angle':`${angle*180/Math.PI}deg`} as CSSProperties} data-active={!dragging&&(hover??pinned)===p.id} aria-label={`预览${p.name}`} aria-pressed={pinned===p.id}
        onPointerEnter={e=>{if(e.pointerType!=='touch'&&!drag.current)setHover(p.id);}} onPointerLeave={()=>setHover(null)}
        onFocus={e=>{if(e.currentTarget.matches(':focus-visible'))setHover(p.id);}} onBlur={()=>setHover(null)} onClick={()=>choose(i)}>
        <span className={s.bubble}>{p.name}</span><PortfolioImage src={p.image} sizes="150px" alt="" draggable={false}/>
      </button>;})}</div>
      <span className={s.dragHint}>← 左右拖动切换 →</span>
      <div className={s.bookSpace}><a className={s.book} href={project?.href} aria-label={project?(selected==='motion'?'查看动态海报概念封面':'打开插画作品'):'请先选择上方项目'} aria-disabled={!project} tabIndex={project?0:-1}>
        <img className={s.realBook} src="/concepts/navigation-book-v2.webp" width={1100} height={733} alt="立体展开的作品集书本，米白纸页上排有海岸和植物照片" decoding="async"/>
        {project&&<span key={turn} className={s.photoLeaf} aria-hidden="true"><img src="/concepts/navigation-book-v2.webp" alt=""/></span>}
      </a></div>
    </section>
    <footer className={s.footer}>JIANI XU © 2026</footer>
  </main>;
}
