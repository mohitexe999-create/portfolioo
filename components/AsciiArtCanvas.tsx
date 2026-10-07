"use client";

import React, { useEffect, useRef } from "react";

// ─── Config (matches 21st.dev params) ─────────────────────────────────────
const CFG = {
  renderMode: "dither" as const,
  cellSize: 9,
  coverage: 100,
  invert: false,
  brightness: 0,
  contrast: 158, // 0-255 extra contrast
  density: 20,
  // shimmer animation
  animated: true,
  animStyle: "shimmer" as const,
  animSpeed: 100,
  animIntensity: 60,
};

// Bayer 8×8 matrix for ordered-dither
const BAYER8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

function getBayer(cx: number, cy: number): number {
  return BAYER8[(cy % 8) * 8 + (cx % 8)] / 64;
}

function applyBC(v: number, brightness: number, contrast: number): number {
  const cf = (259 * (contrast + 255)) / (255 * (259 - contrast));
  v = cf * (v - 0.5) + 0.5;
  v += brightness / 255;
  return Math.max(0, Math.min(1, v));
}

interface Props {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function AsciiArtCanvas({
  src,
  width = 400,
  height = 500,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const off = document.createElement("canvas");
    const img = new Image();
    img.crossOrigin = "anonymous";

    let loaded = false;
    let cw = 0;
    let ch = 0;
    let dpr = 1;
    const t0 = performance.now();

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = rect.width || width;
      ch = rect.height || height;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (now: number) => {
      if (!mountedRef.current) return;
      if (!loaded) {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - t0) / 1000;
      ctx.clearRect(0, 0, cw, ch);

      off.width = Math.max(1, Math.round(cw));
      off.height = Math.max(1, Math.round(ch));
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, off.width, off.height);

      const cellSize = CFG.cellSize;
      const cols = Math.ceil(cw / cellSize);
      const rows = Math.ceil(ch / cellSize);
      const px = octx.getImageData(0, 0, off.width, off.height);
      const pd = px.data;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x0 = Math.round(col * cellSize);
          const y0 = Math.round(row * cellSize);
          const x1 = Math.min(Math.round((col + 1) * cellSize), off.width);
          const y1 = Math.min(Math.round((row + 1) * cellSize), off.height);

          let rSum = 0, gSum = 0, bSum = 0, count = 0;
          for (let sy = y0; sy < y1; sy += 2) {
            for (let sx = x0; sx < x1; sx += 2) {
              const idx = (sy * off.width + sx) * 4;
              rSum += pd[idx];
              gSum += pd[idx + 1];
              bSum += pd[idx + 2];
              count++;
            }
          }
          if (count === 0) continue;

          const r = rSum / count / 255;
          const g = gSum / count / 255;
          const b = bSum / count / 255;

          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          let adjLum = applyBC(lum, CFG.brightness, CFG.contrast);
          if (CFG.invert) adjLum = 1 - adjLum;

          // shimmer: diagonal wave
          const speed = (CFG.animSpeed / 100) * 0.8;
          const intensity = (CFG.animIntensity / 100) * 0.22;
          const wave = Math.sin((col * 0.18 + row * 0.12) + elapsed * speed * 4);
          adjLum = Math.max(0, Math.min(1, adjLum + wave * intensity));

          // density gate
          const densitySkip = (1 - CFG.density / 100) * 0.6;
          if (adjLum < densitySkip) continue;

          const threshold = getBayer(col, row);
          if (adjLum <= threshold) continue;

          const cx2 = col * cellSize + cellSize / 2;
          const cy2 = row * cellSize + cellSize / 2;
          const dotSize = Math.max(0.5, adjLum * cellSize * 0.72);

          let pr = Math.min(255, Math.round(r * 255 * 1.05));
          let pg = Math.min(255, Math.round(g * 255 * 1.05));
          let pb = Math.min(255, Math.round(b * 255 * 1.12));

          if (adjLum > 0.75) {
            pr = Math.round(pr * 0.85 + 220 * 0.15);
            pg = Math.round(pg * 0.85 + 240 * 0.15);
            pb = Math.round(pb * 0.85 + 255 * 0.15);
          }

          ctx.globalAlpha = 0.55 + adjLum * 0.45;
          ctx.fillStyle = `rgb(${pr},${pg},${pb})`;
          ctx.beginPath();
          ctx.arc(cx2, cy2, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(render);
    };

    img.onload = () => { if (mountedRef.current) loaded = true; };
    img.onerror = () => { if (mountedRef.current) loaded = true; };
    img.src = src;

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);
    animRef.current = requestAnimationFrame(render);

    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [src, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
