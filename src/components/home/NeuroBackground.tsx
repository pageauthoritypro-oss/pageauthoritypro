"use client";

import { useEffect, useRef } from "react";

const VERT = `
precision highp float;
attribute vec4 a_position;
attribute vec2 a_tex_coord;
varying vec2 v_tex_coord;
void main() {
  gl_Position = a_position;
  v_tex_coord = a_tex_coord;
}
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_background;
uniform vec4 u_color;
uniform float u_speed;
uniform float u_phase;
uniform float u_scale;
uniform float u_brightness;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuro_shape(vec2 uv, float t) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = 8.;
  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.);
    sine_acc = rotate(sine_acc, 1.);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer);
    res += (.5 + .5 * cos(layer)) / scale;
    scale *= (1.2);
  }
  return res.x + res.y;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= .5;
  float scale = .75 * u_scale + 1e-4;
  uv *= (.001 * (1. - step(1. - scale, 1.) / scale));
  uv *= u_resolution;
  uv += .5;

  float t = u_time * u_speed + u_phase * 10.;
  float noise = neuro_shape(uv, t);
  noise = u_brightness * pow(noise, 3.);
  noise += pow(noise, 12.);
  noise = max(.0, noise - .5);

  vec3 color = mix(u_background.rgb * u_background.a, u_color.rgb * u_color.a, noise);
  float opacity = mix(u_background.a, u_color.a, noise);
  gl_FragColor = vec4(color, opacity);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[NeuroBackground] shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function NeuroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[NeuroBackground] link error:", gl.getProgramInfoLog(program));
      return;
    }

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const texBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);

    gl.useProgram(program);

    const posLoc  = gl.getAttribLocation(program, "a_position");
    const texLoc  = gl.getAttribLocation(program, "a_tex_coord");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc  = gl.getUniformLocation(program, "u_resolution");

    gl.uniform4fv(gl.getUniformLocation(program, "u_background"),
      [0.00784313725490196, 0.054901960784313725, 0.10980392156862745, 1]);
    gl.uniform4fv(gl.getUniformLocation(program, "u_color"),
      [0.7803921568627451, 0.5764705882352941, 0.23921568627450981, 1]);
    gl.uniform1f(gl.getUniformLocation(program, "u_scale"),      1);
    gl.uniform1f(gl.getUniformLocation(program, "u_speed"),      1);
    gl.uniform1f(gl.getUniformLocation(program, "u_phase"),      1);
    gl.uniform1f(gl.getUniformLocation(program, "u_brightness"), 1);

    let raf = 0;
    let start: number | null = null;

    function resize() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      canvas!.width  = w * devicePixelRatio;
      canvas!.height = h * devicePixelRatio;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(resLoc, canvas!.width, canvas!.height);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function render(ts: number) {
      if (start === null) start = ts;
      gl!.uniform1f(timeLoc, (ts - start) / 1000);

      gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuf);
      gl!.enableVertexAttribArray(posLoc);
      gl!.vertexAttribPointer(posLoc, 2, gl!.FLOAT, false, 0, 0);

      gl!.bindBuffer(gl!.ARRAY_BUFFER, texBuf);
      gl!.enableVertexAttribArray(texLoc);
      gl!.vertexAttribPointer(texLoc, 2, gl!.FLOAT, false, 0, 0);

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(texBuf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
