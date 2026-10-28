'use client';

import { useEffect, useRef } from 'react';
import s from './preview.module.css';

const vertexSource = `
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = position * .5 + .5;
  gl_Position = vec4(position, 0., 1.);
}`;

// Distort only the free braid and its tips in the original artwork coordinates.
// The face, eyes, hand, body, sail and hull retain their original pixels.
const fragmentSource = `
precision highp float;
uniform sampler2D artwork;
uniform float time;
varying vec2 uv;
void main() {
  vec2 size = vec2(1223., 1286.);
  vec2 p = vec2(uv.x, 1. - uv.y) * size;
  float tip = smoothstep(930., 1190., p.x);
  float lowerEdge = mix(585., 746., smoothstep(970., 1115., p.x));
  float band = smoothstep(433., 474., p.y) * (1. - smoothstep(lowerEdge - 24., lowerEdge, p.y));
  float strength = tip * band;
  float breeze = sin(time * 1.35 - (p.x - 930.) * .008);
  float flutter = sin(time * 2.1 - p.x * .019 + p.y * .007);
  vec2 offset = vec2(3.5 * breeze, 16. * breeze + 4. * flutter) * strength;
  vec2 source = p - offset;
  vec2 sampleUV = vec2(source.x / size.x, 1. - source.y / size.y);
  if (sampleUV.x < 0. || sampleUV.x > 1. || sampleUV.y < 0. || sampleUV.y > 1.) {
    gl_FragColor = vec4(0.);
  } else {
    gl_FragColor = texture2D(artwork, sampleUV);
  }
}`;

export default function WindSailboat() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current, wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    const program = gl.createProgram();
    if (!program) return;
    for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
      const shader = gl.createShader(type);
      if (!shader) { gl.deleteProgram(program); shaders.forEach(item => gl.deleteShader(item)); return; }
      shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteProgram(program); shaders.forEach(item => gl.deleteShader(item)); return;
      }
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program); shaders.forEach(item => gl.deleteShader(item)); return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer(), texture = gl.createTexture();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program, 'artwork'), 0);
    const clock = gl.getUniformLocation(program, 'time');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const image = new Image();
    let ready = false, disposed = false, visible = true, frame = 0, last = 0, time = 0;
    function draw() {
      if (!ready || gl!.isContextLost()) return;
      gl!.uniform1f(clock, time); gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }
    function tick(now: number) {
      if (!last || now - last >= 32) {
        time += last ? Math.min((now - last) / 1000, .06) : 0;
        last = now; draw();
      }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame); last = 0;
      const animate = ready && !reduced.matches && !gl!.isContextLost();
      wrapper!.dataset.wind = animate ? 'on' : 'off';
      if (animate && visible && !document.hidden) { draw(); frame = requestAnimationFrame(tick); }
    }
    const resize = new ResizeObserver(() => {
      const scale = Math.min(wrapper.clientWidth / 1223, wrapper.clientHeight / 1286) * Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(1223 * scale));
      canvas.height = Math.max(1, Math.round(1286 * scale));
      gl.viewport(0, 0, canvas.width, canvas.height); draw();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const lost = () => { ready = false; sync(); };
    canvas.addEventListener('webglcontextlost', lost);
    image.onload = () => {
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, texture); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      ready = true; sync();
    };
    image.src = '/work/archive/sailing-girl-v1.png';
    resize.observe(wrapper); observer.observe(wrapper);
    reduced.addEventListener('change', sync); document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true; image.onload = null; cancelAnimationFrame(frame);
      resize.disconnect(); observer.disconnect();
      canvas.removeEventListener('webglcontextlost', lost);
      reduced.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync);
      gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program);
      shaders.forEach(shader => gl.deleteShader(shader));
    };
  }, []);
  return <div ref={wrapperRef} className={s.windBoat}>
    <img src="/work/archive/sailing-girl-v1.png" draggable={false} fetchPriority="high"
      alt="金色长麻花辫少女站在纸雕小船上举手眺望，长辫与发梢随风轻轻飘动" />
    <canvas ref={canvasRef} aria-hidden="true"/>
  </div>;
}
