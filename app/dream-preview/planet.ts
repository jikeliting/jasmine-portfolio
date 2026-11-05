// One illustrated image, rotated only in the canvas plane.
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };

export function createPlanet(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) return null;
  const illustration = new Image();
  illustration.src = '/concepts/elsewhere/planet-flat-v1.png';
  const flowerSurface = document.createElement('canvas');
  flowerSurface.width = 768; flowerSurface.height = 768;
  const flowerContext = flowerSurface.getContext('2d');
  let original: ImageData | null = null, animated: ImageData | null = null;
  const petals: { index: number; strength: number; phase: number; x: number; y: number }[] = [];
  illustration.onload = () => {
    if (!flowerContext) return;
    flowerContext.drawImage(illustration, 0, 0, 768, 768);
    original = flowerContext.getImageData(0, 0, 768, 768);
    animated = new ImageData(new Uint8ClampedArray(original.data), 768, 768);
    // Color-select only pink and cream petals; green stems and moss stay fixed.
    for (let y = 30; y < 330; y++) for (let x = 45; x < 420; x++) {
      const index = (y * 768 + x) * 4;
      const [r,g,b,a] = original.data.subarray(index, index + 4);
      const pink = r > 170 && r - g > 30 && b > g * .65;
      const cream = r > 210 && g > 180 && b > 135 && r > g && r - b < 105;
      if (a > 240 && (pink || cream)) petals.push({ index, strength: pink ? .9 : .6, phase: x / 85 + y / 100, x, y });
    }
  };
  let width = 1, height = 1, dpr = 1;
  let geometry = { cx: 0, cy: 0, radius: 1, flip: 0 };
  let previousPointer: { x: number; y: number; time: number } | null = null;
  const gusts: { x: number; y: number; time: number; force: number; direction: number }[] = [];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointerMove = (event: PointerEvent) => {
    if (reduced.matches || event.pointerType === 'touch' || geometry.flip > .1) return;
    const box = canvas.getBoundingClientRect(), now = performance.now() / 1000;
    const px = event.clientX - box.left, py = event.clientY - box.top;
    if (px < 0 || px > width || py < 0 || py > height) { previousPointer = null; return; }
    if (previousPointer) {
      const dx = px - previousPointer.x, dy = py - previousPointer.y;
      const speed = Math.hypot(dx, dy) / Math.max(.008, now - previousPointer.time);
      const angle = geometry.flip * Math.PI, x = px - geometry.cx, y = py - geometry.cy;
      const u = ((x * Math.cos(angle) - y * Math.sin(angle)) / geometry.radius + 1) * 384;
      const v = ((x * Math.sin(angle) + y * Math.cos(angle)) / geometry.radius + 1) * 384;
      if (speed > 20 && u > 30 && u < 440 && v > 20 && v < 350) {
        gusts.push({ x: u, y: v, time: now, force: Math.min(7, speed / 160), direction: dx < 0 ? -1 : 1 });
        if (gusts.length > 12) gusts.shift();
      }
    }
    previousPointer = { x: px, y: py, time: now };
  };
  const pointerLeave = () => { previousPointer = null; };
  canvas.parentElement?.addEventListener('pointermove', pointerMove);
  canvas.parentElement?.addEventListener('pointerleave', pointerLeave);
  const resize = () => {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  };
  const draw = (flip: number, night: number, time = 0) => {
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    if (!illustration.complete || !illustration.naturalWidth || flip >= .999) return;
    const mobile = width <= 700;
    const radius = Math.min(width * (mobile ? .8 : .52), height * .69) * (1 - flip * .18);
    const cx = width * .5;
    const cy = height * ((mobile ? 1.02 : 1.12) - flip * 1.9);
    context.save();
    context.globalAlpha = 1 - smooth((flip - .78) / .22);
    context.translate(cx, cy);
    context.rotate(-flip * Math.PI);
    if (!time) context.drawImage(illustration, -radius, -radius, radius * 2, radius * 2);
    else {
      if (original && animated && flowerContext) {
        for (const petal of petals) {
          let disturbance = 0;
          for (const gust of gusts) {
            const age = Math.max(0, time - gust.time);
            const distance = Math.hypot(petal.x - gust.x, petal.y - gust.y);
            disturbance += Math.exp(-distance * distance / 1800) * Math.exp(-age * 2.5) * Math.sin(age * 12) * gust.force * gust.direction;
          }
          const shift = Math.max(-10, Math.min(10, Math.sin(time * 1.3 + petal.phase) * petal.strength * 1.6 + disturbance));
          const sourceX = Math.max(0, Math.min(766, petal.x + shift));
          const left = Math.floor(sourceX), blend = sourceX - left;
          const source = (petal.y * 768 + left) * 4;
          for (let c = 0; c < 3; c++) animated.data[petal.index+c] = original.data[source+c] * (1-blend) + original.data[source+4+c] * blend;
        }
        flowerContext.putImageData(animated, 0, 0);
        context.drawImage(flowerSurface, -radius, -radius, radius * 2, radius * 2);
      } else context.drawImage(illustration, -radius, -radius, radius * 2, radius * 2);      context.save();
      context.beginPath();
      context.ellipse(radius * .45, -radius * .41, radius * .18, radius * .12, .65, 0, Math.PI * 2);
      context.clip();
      for (let i = 0; i < 12; i++) {
        const phase = (time * .12 + i / 12) % 1;
        context.strokeStyle = `rgba(255,255,235,${Math.sin(phase * Math.PI) * .13})`;
        context.lineWidth = .8;
        context.beginPath();
        context.ellipse(radius * .43, -radius * .43, radius * (.02 + phase * .24), radius * (.008 + phase * .085), .65, 0, Math.PI * 2);
        context.stroke();
      }
      context.restore();
    }
    context.restore();
    if (night > 0) {
      context.save();
      context.globalCompositeOperation = 'source-atop';
      context.fillStyle = 'rgba(9,22,47,' + night * .55 + ')';
      context.fillRect(0, 0, width, height);
      context.restore();
    }
  };
  return { resize, draw, dispose: () => { illustration.onload = null; canvas.parentElement?.removeEventListener('pointermove', pointerMove); canvas.parentElement?.removeEventListener('pointerleave', pointerLeave); } };
}




