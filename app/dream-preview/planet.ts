// One illustrated image, rotated only in the canvas plane.
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };

export function createPlanet(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) return null;
  const illustration = new Image();
  illustration.src = '/concepts/elsewhere/planet-flat-v1.png';
  let width = 1, height = 1, dpr = 1;
  const resize = () => {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  };
  const draw = (flip: number, night: number) => {
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
    context.drawImage(illustration, -radius, -radius, radius * 2, radius * 2);
    context.restore();
    if (night > 0) {
      context.save();
      context.globalCompositeOperation = 'source-atop';
      context.fillStyle = 'rgba(9,22,47,' + night * .55 + ')';
      context.fillRect(0, 0, width, height);
      context.restore();
    }
  };
  return { resize, draw, dispose: () => { illustration.onload = null; } };
}
