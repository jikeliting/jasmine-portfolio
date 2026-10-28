/** GPU surface shading. Object-space sampling keeps moss and water fixed to the globe. */
export function createMossSurface() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.0,1.0);}`;
  const fragment = `
    precision highp float;
    uniform vec2 resolution;
    uniform vec2 center;
    uniform float radius;
    uniform float angle;
    uniform float time;
    uniform float ready;
    uniform sampler2D moss;
    float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
    float noise(vec3 p){
      vec3 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
      mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
    }
    void main(){
      vec2 q=(vec2(gl_FragCoord.x,resolution.y-gl_FragCoord.y)-center)/radius;
      q.y=-q.y;
      float rr=dot(q,q);
      if(rr>1.008){gl_FragColor=vec4(0.0);return;}
      vec3 n=vec3(q,sqrt(max(0.0,1.0-rr)));
      vec3 p=vec3(n.x,n.y*cos(angle)+n.z*sin(angle),-n.y*sin(angle)+n.z*cos(angle));
      vec3 weights=pow(abs(p),vec3(5.0)); weights/=max(.001,weights.x+weights.y+weights.z);
      vec3 tex=texture2D(moss,fract(p.yz*1.3+.5)).rgb*weights.x
        +texture2D(moss,fract(p.xz*1.3+.5)).rgb*weights.y
        +texture2D(moss,fract(p.xy*1.3+.5)).rgb*weights.z;
      float coarse=noise(p*7.0), fine=noise(p*170.0);
      vec3 grass=mix(vec3(.32,.43,.20),vec3(.65,.70,.36),coarse);
      // Soft sage grading reduces the photographic texture's yellow saturation.
      tex=mix(tex,vec3(dot(tex,vec3(.25,.55,.20))),.18)*vec3(.95,1.04,1.12);
      grass=mix(grass,tex*.88+vec3(.12,.16,.08),ready*.88);
      float light=.48+.64*max(0.0,dot(normalize(n),normalize(vec3(-.45,.8,1.1))));
      grass*=light*(.94+coarse*.10);
      grass+=vec3(.11,.13,.055)*pow(max(0.0,1.0-n.z),3.0);
      float lon=atan(p.x,p.z),lat=asin(clamp(p.y,-1.0,1.0));
      vec2 lake=vec2((lon-.5)/.4,(lat-.73)/.22);
      float theta=atan(lake.y,lake.x);
      float edge=length(lake)/(1.0+.045*sin(theta*3.0)+.025*cos(theta*5.0));
      float wave=sin(lon*75.0+lat*110.0+time*.75)*sin(lat*53.0-lon*34.0-time*.5);
      vec3 water=mix(vec3(.16,.36,.34),vec3(.54,.70,.61),smoothstep(.0,1.02,edge));
      water+=vec3(.014,.018,.014)*wave;
      float reflection=pow(max(0.0,sin(lat*160.0+lon*25.0+wave*.6+time*.4)),20.0);
      reflection*=exp(-pow((lon-.6)*6.0,2.0))*smoothstep(.3,.9,lat);
      water+=vec3(.55,.54,.37)*reflection*.20;
      water*=.72+.28*light;
      vec3 shore=mix(grass,vec3(.56,.64,.38)*light,.40);
      vec3 color=mix(grass,shore,1.0-smoothstep(1.0,1.08,edge));
      color=mix(color,water,1.0-smoothstep(.96,1.0,edge));
      float fuzz=(noise(p*250.0)-.5)*.004;
      float alpha=1.0-smoothstep(.997+fuzz,1.004+fuzz,sqrt(rr));
      gl_FragColor=vec4(color,alpha);
    }
  `;
  const shaders: WebGLShader[] = [];
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    shaders.push(shader); return shader;
  };
  const vs = compile(gl.VERTEX_SHADER, vertex), fs = compile(gl.FRAGMENT_SHADER, fragment);
  const program = gl.createProgram();
  if (!vs || !fs || !program) { shaders.forEach(shader => gl.deleteShader(shader)); return null; }
  gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { shaders.forEach(shader => gl.deleteShader(shader)); gl.deleteProgram(program); return null; }
  gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniforms = Object.fromEntries(['resolution', 'center', 'radius', 'angle', 'time', 'ready', 'moss'].map(name => [name, gl.getUniformLocation(program, name)]));
  const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([120,145,70,255]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  let ready = 0, disposed = false, lost = false;
  const image = new Image();
  image.onload = () => {
    if (disposed || lost) return;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    ready = 1;
  };
  image.src = '/concepts/elsewhere/moss-texture-v1.webp';
  const lose = () => { lost = true; };
  canvas.addEventListener('webglcontextlost', lose);
  return {
    canvas,
    draw(width: number, height: number, dpr: number, x: number, y: number, radius: number, angle: number, time: number) {
      if (lost || disposed) return false;
      const w = Math.round(width * dpr), h = Math.round(height * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uniforms.resolution, w, h); gl.uniform2f(uniforms.center, x * dpr, y * dpr);
      gl.uniform1f(uniforms.radius, radius * dpr); gl.uniform1f(uniforms.angle, angle);
      gl.uniform1f(uniforms.time, time); gl.uniform1f(uniforms.ready, ready); gl.uniform1i(uniforms.moss, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      return true;
    },
    dispose() {
      disposed = true; image.onload = null; canvas.removeEventListener('webglcontextlost', lose);
      gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader));
    },
  };
}
