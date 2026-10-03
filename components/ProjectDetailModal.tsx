"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Project } from "@/lib/projectsData";

interface ProjectDetailModalProps {
  projects: Project[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function ProjectDetailModal({
  projects,
  selectedIndex,
  onClose,
  onSelectIndex,
}: ProjectDetailModalProps) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const currentProject = selectedIndex !== null ? projects[selectedIndex] : null;
  const isOpen = selectedIndex !== null && currentProject !== null;

  const galleryItems = currentProject?.gallery ?? (
    currentProject
      ? [{ src: currentProject.image, alt: currentProject.imageAlt || `${currentProject.name} interface`, label: "FEATURED" }]
      : []
  );

  const activeMedia = galleryItems[galleryIndex] ?? galleryItems[0] ?? { src: "", alt: "", label: "FEATURED" };

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setGalleryIndex(0);
    const nextIdx = (selectedIndex + 1) % projects.length;
    onSelectIndex(nextIdx);
    dialogRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedIndex, projects.length, onSelectIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setGalleryIndex(0);
    const prevIdx = (selectedIndex - 1 + projects.length) % projects.length;
    onSelectIndex(prevIdx);
    dialogRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedIndex, projects.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPos = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    html.classList.add("project-dialog-open");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPos;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      html.classList.remove("project-dialog-open");
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentProject) return null;

  return (
    <div
      className="project-dialog-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        ref={dialogRef}
        className="project-dialog"
        id="project-detail-dialog"
        role="dialog"
        data-lenis-prevent="true"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        style={
          {
            "--dialog-accent": currentProject.accent,
            "--dialog-ratio": currentProject.ratio,
          } as React.CSSProperties
        }
      >
        <div className="project-dialog-grain" aria-hidden="true" />

        <header className="project-dialog-header">
          <span>
            CASE STUDY {currentProject.id} / {String(projects.length).padStart(2, "0")}
          </span>
          <p>{currentProject.stamp}</p>
          <button
            ref={closeButtonRef}
            className="project-dialog-close"
            type="button"
            onClick={onClose}
            aria-label="Close project details"
          >
            CLOSE <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="project-dialog-body">
          {/* Left Media Panel */}
          <div className="project-dialog-media-panel">
            <div className="project-dialog-visual" aria-live="polite">
              <Image
                src={activeMedia.src}
                alt={activeMedia.alt}
                draggable={false}
                width={1200}
                height={750}
                priority
              />
              <span>{activeMedia.label}</span>
            </div>

            {galleryItems.length > 1 && (
              <nav
                className="project-gallery-strip"
                aria-label={`${currentProject.name} screen gallery`}
              >
                {galleryItems.map((item, idx) => (
                  <button
                    key={item.src}
                    type="button"
                    className={idx === galleryIndex ? "is-active" : undefined}
                    aria-pressed={idx === galleryIndex}
                    onClick={() => setGalleryIndex(idx)}
                  >
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Right Copy Panel */}
          <div className="project-dialog-copy">
            <div className="project-dialog-title-block">
              <p>{currentProject.type}</p>
              <h3 id="project-dialog-title">{currentProject.name}</h3>
              <span>{currentProject.stamp}</span>
            </div>

            <dl>
              <div>
                <dt>THE IDEA</dt>
                <dd>{currentProject.description}</dd>
              </div>
              <div>
                <dt>THE SYSTEM</dt>
                <dd>{currentProject.purpose}</dd>
              </div>
            </dl>

            <ul aria-label={`${currentProject.name} technologies`}>
              {currentProject.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>

            {currentProject.metrics && (
              <figure
                className="project-metrics"
                aria-labelledby="project-metrics-title"
              >
                <figcaption>
                  <span id="project-metrics-title">{currentProject.metrics.title}</span>
                  <small>{currentProject.metrics.note}</small>
                </figcaption>

                <div className="project-metrics-legend" aria-hidden="true">
                  <span>
                    <i className="is-original" /> ORIGINAL
                  </span>
                  <span>
                    <i className="is-finetuned" /> FINE-TUNED
                  </span>
                </div>

                <div className="project-metrics-chart">
                  {currentProject.metrics.series.map((item) => (
                    <div
                      key={item.label}
                      className="project-metric-row"
                      aria-label={`${item.label}: original ${item.before} percent, fine-tuned ${item.after} percent`}
                    >
                      <strong>{item.label}</strong>
                      <div className="project-metric-bars">
                        <span
                          className="is-original"
                          style={
                            {
                              "--metric-width": `${Math.min(100, 2 * item.before)}%`,
                            } as React.CSSProperties
                          }
                        >
                          <i /> <b>{item.before}%</b>
                        </span>
                        <span
                          className="is-finetuned"
                          style={
                            {
                              "--metric-width": `${Math.min(100, 2 * item.after)}%`,
                            } as React.CSSProperties
                          }
                        >
                          <i /> <b>{item.after}%</b>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p>{currentProject.metrics.summary}</p>
              </figure>
            )}

            <div className="project-dialog-links">
              {(currentProject.links ?? [{ label: "VISIT THE LIVE PROJECT", href: currentProject.href }]).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav
          className="project-dialog-pagination"
          aria-label="Browse project case studies"
        >
          <button
            type="button"
            className="pagination-btn pagination-prev"
            onClick={handlePrev}
            aria-label="Previous case study"
          >
            ← PREVIOUS
          </button>
          <button
            type="button"
            className="pagination-btn pagination-next"
            onClick={handleNext}
            aria-label="Next case study"
          >
            NEXT →
          </button>
        </nav>
      </section>
    </div>
  );
}
