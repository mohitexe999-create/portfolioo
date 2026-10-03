"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/lib/projectsData";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (index: number) => void;
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isDisposed = false;
    let animId = 0;
    let imgElement: HTMLImageElement | null = null;

    const renderAscii = () => {
      if (isDisposed || !imgElement || !imgElement.complete) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Number of columns and rows for sampling
      const cols = Math.min(100, Math.max(48, Math.round(width / 7.2)));
      const rows = Math.min(65, Math.max(30, Math.round(height / 11.5)));

      const offscreen = document.createElement("canvas");
      offscreen.width = cols;
      offscreen.height = rows;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(imgElement, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      const chars = "   ..'',:;irsXA253hMHGS#9B&@";
      const cellW = width / cols;
      const cellH = height / rows;
      const fontSize = Math.min(1.02 * cellH, 1.62 * cellW);

      const brightness: number[] = [];
      for (let i = 0; i < cols * rows; i++) {
        const offset = i * 4;
        const r = imgData[offset];
        const g = imgData[offset + 1];
        const b = imgData[offset + 2];
        brightness.push((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255);
      }

      const sorted = [...brightness].sort((a, b) => a - b);
      const low = sorted[Math.floor(0.04 * sorted.length)] ?? 0;
      const high = sorted[Math.floor(0.96 * sorted.length)] ?? 1;
      const range = Math.max(high - low, 0.08);

      const norm = brightness.map((v) => Math.max(0, Math.min(1, (v - low) / range)));

      ctx.font = `400 ${fontSize}px "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const alpha = imgData[idx * 4 + 3] / 255;
          const val = norm[idx];

          const neighbors = [
            c > 0 ? norm[idx - 1] : val,
            c < cols - 1 ? norm[idx + 1] : val,
            r > 0 ? norm[idx - cols] : val,
            r < rows - 1 ? norm[idx + cols] : val,
          ];
          const avgNeighbor = neighbors.reduce((acc, curr) => acc + curr, 0) / neighbors.length;
          const enhanced = Math.max(0, Math.min(1, val + (val - avgNeighbor) * 0.72));

          const charIdx = Math.min(chars.length - 1, Math.floor(enhanced * chars.length));
          const char = chars[charIdx];
          if (char === " ") continue;

          const tone = Math.round(132 + 118 * enhanced);
          ctx.fillStyle = `rgba(${tone}, ${Math.max(0, tone - 4)}, ${Math.max(0, tone - 10)}, ${
            (0.22 + 0.78 * enhanced) * alpha
          })`;
          ctx.fillText(char, (c + 0.5) * cellW, (r + 0.5) * cellH);
        }
      }
    };

    const triggerRender = () => {
      window.cancelAnimationFrame(animId);
      animId = window.requestAnimationFrame(renderAscii);
    };

    const loadImage = () => {
      if (!imgElement) {
        imgElement = new window.Image();
        imgElement.decoding = "async";
        imgElement.addEventListener("load", triggerRender, { once: true });
        imgElement.src = project.image;
        if (imgElement.complete) {
          triggerRender();
        }
      }
    };

    const resizeObserver = new ResizeObserver(triggerRender);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadImage();
          intersectionObserver.disconnect();
        }
      },
      { rootMargin: "35% 0px", threshold: 0 }
    );
    intersectionObserver.observe(container);

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (imgElement) {
        imgElement.removeEventListener("load", triggerRender);
      }
    };
  }, [project.image]);

  return (
    <article
      className="ascii-project-entry"
      style={
        {
          "--ascii-accent": project.accent,
          "--ascii-ratio": project.ratio,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        className="ascii-project-card"
        aria-haspopup="dialog"
        aria-controls="project-detail-dialog"
        aria-describedby={`project-instruction-${index}`}
        aria-label={`${project.name}. Activate to reveal or open the case study.`}
        onClick={() => onOpen(index)}
      >
        <div ref={containerRef} className="ascii-preview">
          <canvas ref={canvasRef} role="img" aria-label={`${project.name} rendered as ASCII art`} />
          <Image
            className="ascii-source-image"
            src={project.image}
            alt={project.imageAlt || `${project.name} preview`}
            aria-hidden="true"
            loading="lazy"
            draggable={false}
            width={1200}
            height={750}
          />
        </div>

        <span className="ascii-project-meta">
          <b>{project.id}</b>
          <i>{project.stamp}</i>
        </span>

        <span className="ascii-project-title">{project.name}</span>

        <span className="ascii-hover-instruction" id={`project-instruction-${index}`} aria-live="polite">
          <span className="ascii-instruction-desktop">HOVER TO REVEAL / CLICK TO OPEN</span>
          <span className="ascii-instruction-touch">TAP TO OPEN</span>
        </span>
      </button>
    </article>
  );
}
