"use client";

import React, { useEffect, useRef, useCallback } from "react";

export default function ScrollProgress() {
  const railRef = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const docHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    const scrollable = docHeight - viewHeight;
    if (scrollable <= 0) return;

    const progress = window.scrollY / scrollable;
    const railWidth = rail.offsetWidth;
    const markerX = progress * railWidth;

    rail.style.setProperty("--scroll-progress-x", `${markerX}px`);

    // Calculate section positions
    const sections = [
      { id: "about", varName: "--about-progress" },
      { id: "skills-orbit", varName: "--skills-progress" },
      { id: "work", varName: "--work-progress" },
      { id: "projects", varName: "--projects-progress" },
    ];

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        const sectionProgress = el.offsetTop / docHeight;
        rail.style.setProperty(section.varName, String(sectionProgress));
      }
    }
  }, []);

  useEffect(() => {
    update();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    // Recalculate after images load
    const timer = setTimeout(update, 1500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, [update]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-rail" ref={railRef}>
        <div className="scroll-progress-marker" />
        <span className="scroll-progress-page scroll-progress-page-start" />
        <span className="scroll-progress-page scroll-progress-page-about" />
        <span className="scroll-progress-page scroll-progress-page-skills" />
        <span className="scroll-progress-page scroll-progress-page-work" />
        <span className="scroll-progress-page scroll-progress-page-projects" />
      </div>
    </div>
  );
}
