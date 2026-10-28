'use client';

import { useEffect, useRef, type RefObject } from 'react';

type Pointer = { x: number; y: number };

// Soft illustrated water pauses when hidden or off screen.
export default function LiquidWater({ pointer }: {
  pointer: RefObject<Pointer>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1, height = 1, frame = 0, last = 0, time = 0;
    let visible = true, disposed = false, tilt = 0;
    const stars = Array.from({ length: 19 }, (_, i) => ({
      x: (i * .618034) % 1, y: .49 + (i * .173 % .42),
      phase: i * 2.399, size: 3.2 + i % 5 * 1.05,
    }));

    function draw() {
      if (!ctx || width < 8 || height < 8) return;
      ctx.clearRect(0, 0, width, height);
      const swell = Math.sin(time * .78);
      const impact = Math.pow(Math.max(0, Math.sin(time * .78 - .55)), 3);
      const surface = (x: number, layer = 0) => {
        const u = x / width;
        const travel = u * Math.PI * 2 - time * .78 + layer * .55;
        const swellHeight = Math.sin(travel) * .145;
        const returnWave = Math.sin(u * Math.PI * 3 + time * .46 + layer) * .038;
        const crest = Math.max(0, Math.sin(travel + .8)) ** 3 * .037;
        return height * (.27 - swellHeight - crest + returnWave + (u - .5) * tilt * .11) + layer * 12;
      };
      const wavePath = (layer = 0) => {
        const path = new Path2D();
        path.moveTo(-4, surface(0, layer));
        for (let x = 0; x <= width + 12; x += 12) path.lineTo(x, surface(x, layer));
        path.lineTo(width + 12, height + 1); path.lineTo(-4, height + 1); path.closePath();
        return path;
      };
      const distant = ctx.createLinearGradient(0, 0, 0, height);
      distant.addColorStop(0, '#d9f6f244'); distant.addColorStop(1, '#76d8d4bb');
      ctx.fillStyle = distant; ctx.fill(wavePath(-.85));
      const water = wavePath();
      const fill = ctx.createLinearGradient(0, height * .08, 0, height);
      fill.addColorStop(0, '#b5eee4c0'); fill.addColorStop(.3, '#81d8d0ec');
      fill.addColorStop(.7, '#49c8c2f7'); fill.addColorStop(1, '#73ddd3');
      ctx.fillStyle = fill; ctx.fill(water);
      ctx.save(); ctx.clip(water);

      for (const star of stars) {
        const drift = time * .009 + Math.sin(time * .41 + star.phase) * .037;
        const u = ((star.x + drift) % 1.12 + 1.12) % 1.12 - .06;
        const depth = star.y;
        const x = u * width + tilt * 14 + Math.sin(time * .78 + star.phase) * impact * 24;
        const y = depth * height + Math.sin(time * .78 + u * 6.7) * height * .06
          + Math.sin(time * 1.2 + star.phase) * impact * height * .065;
        const r = star.size * Math.min(1.2, width / 700) * (.8 + depth * .5 + impact * .15);
        ctx.save(); ctx.translate(x, y);
        ctx.rotate(star.phase + time * .18 + swell * .35 + impact * Math.sin(star.phase));
        ctx.scale(1, .72 + Math.sin(time * .55 + star.phase) * .2);
        ctx.beginPath();
        for (let p = 0; p < 10; p++) {
          const angle = p * Math.PI / 5 - Math.PI / 2;
          const radius = p % 2 ? r * .44 : r;
          const sx = Math.cos(angle) * radius, sy = Math.sin(angle) * radius;
          if (!p) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        const silver = ctx.createLinearGradient(-r, -r, r, r);
        silver.addColorStop(0, '#ffffff'); silver.addColorStop(.3, '#a6b8bd');
        silver.addColorStop(.48, '#ffffff'); silver.addColorStop(.7, '#647f8d'); silver.addColorStop(1, '#e9f5f5');
        ctx.shadowColor = '#174d6360'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 3;
        ctx.fillStyle = silver; ctx.fill(); ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
        ctx.strokeStyle = '#f4ffff'; ctx.lineWidth = .65; ctx.stroke(); ctx.restore();
      }
      ctx.restore();
    }
    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, .04) : .016;
      last = now; time += dt;
      tilt += (pointer.current.x - tilt) * (1 - Math.exp(-dt * 2));
      draw(); frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame); last = 0;
      if (disposed) return;
      if (reduced.matches) { time = 1.5; tilt = 0; }
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
      else draw();
    }
    const resize = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resize.observe(canvas); observer.observe(canvas);
    reduced.addEventListener('change', sync); document.addEventListener('visibilitychange', sync); sync();
    return () => {
      disposed = true; cancelAnimationFrame(frame);
      resize.disconnect(); observer.disconnect();
      reduced.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync);
    };
  }, [pointer]);
  return <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%' }} />;
}
