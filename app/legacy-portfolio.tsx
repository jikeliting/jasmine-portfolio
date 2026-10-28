'use client';
import PortfolioImage from './portfolio-image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { posterItems } from './portfolio-data';
type Work = {id:string;title:string;color:string;ink:string;width:number;height:number;cover?:string;pages:string[];rotated?:boolean};
const works:Work[]=[
{id:'culture',title:'企业文化手册',color:'#f6f5ef',ink:'#008258',width:100,height:94,cover:'/work/culture-cover-2025.png',pages:['/work/culture-06.jpg','/work/culture-13.jpg','/work/culture-17.jpg','/work/culture-24.jpg']},
{id:'brand',title:'品牌手册',color:'#0739df',ink:'#fff',width:132,height:84,cover:'/work/tob-02.jpg',pages:['/work/tob-06.jpg','/work/tob-14.jpg'],rotated:true},
{id:'sales',title:'销售手册',color:'#76efd1',ink:'#080b0a',width:98,height:89,cover:'/work/toc-01.jpg',pages:['/work/toc-04.jpg','/work/toc-11.jpg','/work/toc-16.jpg'],rotated:true},
{id:'partners',title:'招商手册',color:'#ff592b',ink:'#fff',width:82,height:82,cover:'/work/partners-full/page-01.jpg',pages:[]},
{id:'recruitment',title:'招聘计划',color:'#effa27',ink:'#090909',width:76,height:97,pages:[]},
{id:'posters',title:'海报与营销物料',color:'#f58cd0',ink:'#111',width:58,height:82,cover:posterItems[0].src,pages:posterItems.slice(1).map(item=>item.src)}
];
const digital:Work={id:'mini',title:'微信小程序',color:'#90b8e3',ink:'#10151e',width:132,height:84,pages:[]};
const all=[...works,digital];
export default function Home({initialProject}:{initialProject?:string}){
const [selected,setSelected]=useState<string|null>(null);
const [visualPosition,setVisualPosition]=useState(0);
const motion=useRef({position:0,velocity:0});
const wheelInput=useRef({amount:0,time:0});
const [project,setProject]=useState<Work|null>(()=>all.find(p=>p.id===initialProject)??null),[category,setCategory]=useState('work'),[hover,setHover]=useState<string|null>(null),[view,setView]=useState('overview'),[active,setActive]=useState<number|null>(null),[position,setPosition]=useState(initialProject==='posters'?0:2),[ratios,setRatios]=useState<Record<string,number>>({}),[reading,setReading]=useState<string|null>(null),[info,setInfo]=useState(false);
const shelf=useRef<HTMLDivElement>(null),home=useRef<HTMLButtonElement>(null),dialog=useRef<HTMLDialogElement>(null),about=useRef<HTMLDialogElement>(null),wheel=useRef(0),touch=useRef<number|null>(null),drag=useRef<{x:number;scroll:number;moved:boolean}|null>(null);
const shown=category==='work'?works:[digital];
const files=project?[project.cover,...project.pages].filter((p):p is string=>!!p):[];
const slots=Math.max(7,files.length);
const poster=project?.id==='posters'?posterItems[position]:null;
useEffect(()=>{const sync=()=>{const id=location.hash.replace('#project/','');setProject(all.find(p=>p.id===id)??null);setView('overview');setPosition(id==='posters'?0:2);setActive(null);setReading(null);};sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);
useEffect(()=>{if(reading)dialog.current?.showModal();},[reading]);
useEffect(()=>{if(info)about.current?.showModal();},[info]);
useEffect(()=>{
if(project?.id!=='posters')return;
let frameId=0,last=performance.now();
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduced){motion.current={position,velocity:0};setVisualPosition(position);return;}
const tick=(now:number)=>{
const dt=Math.min((now-last)/1000,.032);last=now;
const state=motion.current;
// Preserve velocity when a new wheel step changes the destination mid-flight.
const error=state.position-position;
const decay=Math.exp(-18*dt);
const impulse=state.velocity+18*error;
state.position=position+(error+impulse*dt)*decay;
state.velocity=(state.velocity-18*impulse*dt)*decay;
if(Math.abs(state.position-position)<.001&&Math.abs(state.velocity)<.01){state.position=position;state.velocity=0;setVisualPosition(position);return;}
setVisualPosition(state.position);frameId=requestAnimationFrame(tick);
};
frameId=requestAnimationFrame(tick);
return()=>cancelAnimationFrame(frameId);
},[position,project?.id]);
function open(p:Work){setSelected(old=>old===p.id?null:p.id);setHover(null);}
function back(){location.hash='work';requestAnimationFrame(()=>home.current?.focus());}
function move(step:number){setPosition(old=>{const next=Math.max(0,Math.min(slots-1,old+step));setActive(next);return next;});}
function frame(i:number):CSSProperties {const offset=i-(project?.id==='posters'?visualPosition:position);return {'--offset':offset,'--ratio':files[i]?(ratios[files[i]]??.75):.75,'--depth':Math.max(.62,1-Math.min(1,Math.abs(offset))*.16-Math.abs(offset)*.025),zIndex:30-Math.round(Math.abs(offset))} as CSSProperties;}
return <main className={project?'portfolio is-project':'portfolio'}>
{!project&&<section className="shelf-screen">
<div className="site-nav-spacer" aria-hidden="true" />
<div className="home-heading"><h1>设计项目档案</h1><p>SELECTED DESIGN WORKS</p><div className="category-switch" aria-label="作品类型"><button aria-pressed={category==='work'} onClick={()=>{setCategory('work');setHover(null);setSelected(null);}}>企业宣传项目</button><button aria-pressed={category==='digital'} onClick={()=>{setCategory('digital');setHover(null);setSelected(null);}}>数字体验</button></div></div>
<div ref={shelf} className="shelf-viewport" onWheel={e=>{if(shelf.current&&shelf.current.scrollWidth>shelf.current.clientWidth)shelf.current.scrollLeft+=e.deltaY;}} onPointerDown={e=>{if(e.pointerType==='mouse')drag.current={x:e.clientX,scroll:e.currentTarget.scrollLeft,moved:false};}} onPointerMove={e=>{const d=drag.current;if(d&&e.buttons===1){const dx=e.clientX-d.x;if(Math.abs(dx)>6)d.moved=true;if(d.moved)e.currentTarget.scrollLeft=d.scroll-dx;}}} onPointerUp={()=>{setTimeout(()=>{drag.current=null;},0);}} onPointerLeave={()=>{drag.current=null;}}>
<div className="book-row" key={category}>{shown.map((p,i)=><div key={p.id} className={`book-slot ${p.id==='posters'?'poster-slot':''} ${(hover??selected)===p.id?'expanded':''}`} style={{'--book-width':`${p.width}px`,'--book-height':`${p.height}%`,'--color':p.color,'--ink':p.ink} as CSSProperties} onMouseEnter={()=>setHover(p.id)} onMouseLeave={()=>setHover(null)}>
<button className={`spine ${p.rotated?'rotated':''} spine-${p.id}`} onFocus={()=>setHover(p.id)} onBlur={()=>setHover(null)} onClick={e=>{if(drag.current?.moved){e.preventDefault();return;}open(p);}} aria-expanded={(hover??selected)===p.id} aria-label={`${selected===p.id?'收起':'展开'}${p.title}`}>
<span className="spine-meta"><b>{String(i+1).padStart(2,'0')}</b><i/><small>YUNNA</small></span><strong className="spine-title">{p.title}</strong><span className="spine-mark" aria-hidden="true">{['Ⅲ','✣','◯●','Ⅲ','✱','✣'][i]}</span>{p.id==='posters'&&<span className="paperclip" aria-hidden="true"/>}</button>
{p.id==='posters'?<div className="poster-fan" aria-hidden="true">{[posterItems[5].src,posterItems[7].src].map((src,n)=><PortfolioImage key={src} src={src} alt="" style={{'--sheet':n} as CSSProperties}/>)}</div>:<div className="book-preview" aria-hidden="true">{p.cover?<PortfolioImage src={p.cover} alt=""/>:<span>{p.title}<small>作品整理中</small></span>}<div className="preview-caption">{p.title}<span>再次点击收起</span></div></div>}
{p.id==='culture'&&<a className="culture-entry" href="/culture">阅读手册 ↗</a>}
</div>)}</div></div>
<div className="shelf-footer"><span>悬停展开 · 点击固定 <b>⟶</b></span><div className="shelf-controls"><button aria-label="向左浏览书架" onClick={()=>shelf.current?.scrollBy({left:-240,behavior:'smooth'})}>←</button><small>滑动浏览</small><button aria-label="向右浏览书架" onClick={()=>shelf.current?.scrollBy({left:240,behavior:'smooth'})}>→</button></div></div></section>}
{project&&<section className={`project-screen ${view==='index'?'index-mode':''} ${project.id==='posters'?'poster-project':''}`} aria-label={`${project.title}项目空间`} onKeyDown={e=>{if(reading)return;if(e.key==='Escape')back();if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();move(-1);}}}>
<button className="back-link" onClick={back}>← 返回项目首页</button>
<div className={`project-label ${active!==null||poster?'visible':''}`} aria-live="polite"><h1>{poster?poster.group:`云纳${project.title}${active!==null&&active>0&&files[active]?` · 内页 ${active}`:''}`}</h1><p>{poster?`${poster.title} · ${poster.credit}`:'云纳 / 2025'}</p>{active!==null&&!files[active]&&<small>内容整理中</small>}</div>
<div className="glass-stage" tabIndex={0} aria-label="项目页面，使用鼠标滚轮、左右方向键或滑动浏览" onWheel={e=>{if(view==='index')return;e.preventDefault();const delta=Math.abs(e.deltaY)>=Math.abs(e.deltaX)?e.deltaY:e.deltaX;if(project.id==='posters'){const input=wheelInput.current;const now=performance.now();if(now-input.time>180||Math.sign(delta)!==Math.sign(input.amount))input.amount=0;input.time=now;input.amount+=delta*(e.deltaMode===1?32:e.deltaMode===2?600:1);if(Math.abs(input.amount)>=60){move(input.amount>0?1:-1);input.amount=0;}return;}if(Math.abs(delta)>8){const now=Date.now();if(now-wheel.current>480){wheel.current=now;move(delta>0?1:-1);}}}} onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touch.current!==null){const d=touch.current-e.changedTouches[0].clientX;if(Math.abs(d)>35)move(d>0?1:-1);}touch.current=null;}}>
{Array.from({length:slots},(_,i)=>i).filter(i=>project.id!=='posters'||view==='index'||Math.abs(i-visualPosition)<4).map(i=><button key={`${project.id}-${i}`} className={`glass-panel ${(project.id==='posters'?position===i:active===i)?'active':''} ${files[i]?'has-cover':''}`} style={frame(i)} onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)} onFocus={()=>setActive(i)} onBlur={()=>setActive(null)} onClick={()=>{setActive(i);if(project.id==='posters'&&i!==position){setPosition(i);return;}setPosition(i);if(files[i])setReading(files[i]);}} aria-label={files[i]?`${project.id==='posters'?posterItems[i].title:i===0?project.title:`内页 ${i}`}，${project.id==='posters'&&i!==position?'点击选中，再次点击放大':'点击放大'}`:`待整理页面 ${i+1}`}>
{files[i]&&(view==='index'||Math.abs(i-visualPosition)<4||project.id!=='posters')&&<PortfolioImage src={files[i]} decoding="async" alt={project.id==='posters'?posterItems[i].title:i===0?project.title:`${project.title}内页 ${i}`} loading={Math.abs(i-position)<2?'eager':'lazy'} onLoad={e=>{const im=e.currentTarget;const ratio=im.naturalWidth/im.naturalHeight;setRatios(old=>old[files[i]]===ratio?old:{...old,[files[i]]:ratio});}}/>}{view==='index'&&<span className="index-caption">{String(i+1).padStart(2,'0')} / {project.id==='posters'?posterItems[i]?.title:files[i]?i===0?'封面':`内页 ${i}`:'待整理'}</span>}</button>)}
</div><div className="space-controls"><button aria-label="上一张" disabled={position===0} onClick={()=>move(-1)}>←</button><span>{String(position+1).padStart(2,'0')} / {String(slots).padStart(2,'0')}</span><button aria-label="下一张" disabled={position===slots-1} onClick={()=>move(1)}>→</button></div><div className="view-switch"><button aria-pressed={view==='overview'} onClick={()=>setView('overview')}>项目概览</button><i/><button aria-pressed={view==='index'} onClick={()=>setView('index')}>页面索引</button></div></section>}
{reading&&<dialog ref={dialog} className="reader" onClose={()=>setReading(null)} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}><button className="reader-close" onClick={()=>dialog.current?.close()} autoFocus>关闭 ×</button><PortfolioImage fullResolution src={reading} alt="作品完整页面"/>{posterItems.find(item=>item.src===reading)?.relatedImages?.map(src=><PortfolioImage fullResolution key={src} src={src} alt="同一项目的封面与封底设计" style={{marginTop:24}}/>)}</dialog>}
{info&&<dialog ref={about} className="about-overlay" onClose={()=>setInfo(false)}><button onClick={()=>about.current?.close()} autoFocus>关闭 ×</button><h2>徐嘉妮 / JIANI XU</h2><p>品牌与产品视觉设计师。工作覆盖企业品牌、销售手册、宣传物料与微信小程序，从信息结构出发，将内容转化为清楚、好看、能够被使用的视觉设计。</p><a href="mailto:250220669@qq.com">250220669@qq.com ↗</a></dialog>}
</main>;
}
