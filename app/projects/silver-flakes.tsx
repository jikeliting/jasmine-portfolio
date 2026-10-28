'use client';
import { useEffect, useRef } from 'react';
type Flake={x:number;y:number;vx:number;vy:number;size:number;angle:number;life:number;rest:boolean};
export default function SilverFlakes(){
  const canvas=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const el=canvas.current,ctx=el?.getContext('2d');if(!el||!ctx)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let w=0,h=0,frame=0,last=0;const flakes:Flake[]=[];
    function resize(){const r=el!.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio,1.5);el!.width=w*d;el!.height=h*d;ctx!.setTransform(d,0,0,d,0,0);flakes.length=0;for(let i=0;i<230;i++)flakes.push({x:Math.random()*w,y:Math.random()*h,vx:0,vy:40+Math.random()*55,size:1+Math.random()*1.7,angle:Math.random()*6,life:1,rest:false});}
    function draw(t:number){
      frame=requestAnimationFrame(draw);if(document.hidden||t-last<33)return;const dt=Math.min((t-last)/1000,.05);last=t;ctx!.clearRect(0,0,w,h);
      for(const f of flakes){
        if(!reduced.matches&&!f.rest){f.y+=f.vy*dt;f.x+=(f.vx+Math.sin(t/1800+f.angle)*8)*dt;f.angle+=dt*.4;if(f.life<1){f.life-=dt*.65;f.vy+=dt*40;if(f.life<=0){f.y=-10;f.x=Math.random()*w;f.vx=0;f.vy=40+Math.random()*55;f.life=1;}}else if(f.y>h-5-Math.random()*17){f.y=h-5-Math.random()*17;f.rest=true;}}
        ctx!.save();ctx!.translate(f.x,f.y);ctx!.rotate(f.angle);ctx!.globalAlpha=f.life*.7;ctx!.fillStyle=f.size>2?'#91a8a6':'#fff';ctx!.fillRect(-f.size/2,-f.size/2,f.size,f.size*.6);ctx!.restore();
      }
      if(!reduced.matches&&Math.random()<.45){const f=flakes.find(f=>f.rest);if(f&&flakes.filter(f=>f.rest).length>150){f.y=0;f.rest=false;}}
    }
    function sweep(e:PointerEvent){if(reduced.matches||(e.type==='pointermove'&&!e.buttons))return;const r=el!.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;for(const f of flakes)if(f.rest&&Math.hypot(f.x-x,f.y-y)<110){f.rest=false;f.life=.99;f.vx=(f.x-x)*3;f.vy=-50-Math.random()*90;}}
    const observer=new ResizeObserver(resize);observer.observe(el);resize();frame=requestAnimationFrame(draw);window.addEventListener('pointerdown',sweep);window.addEventListener('pointermove',sweep);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointerdown',sweep);window.removeEventListener('pointermove',sweep);};
  },[]);
  return <canvas ref={canvas} aria-hidden="true" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}/>;
}
