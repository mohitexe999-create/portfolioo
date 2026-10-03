"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function StageHero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="stage is-active" aria-label="Mohit Salwan portfolio">
      <div className="grain" aria-hidden="true" />
      <svg
        className="signal-thread"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          pathLength={1}
          d="M -20 548 C 104 468, 220 582, 350 506 C 418 466, 412 401, 448 338 C 501 244, 630 242, 684 330 C 739 421, 669 520, 568 518 C 468 516, 410 436, 438 350 C 483 211, 695 206, 796 326 C 874 419, 901 171, 1020 68"
        />
      </svg>

      <header className="masthead">
        <a
          className="wordmark"
          href="mailto:mohitsalwan@gmail.com"
          aria-label="Email Mohit Salwan"
        >
          <b>
            mohit
            <br />
            salwan
          </b>
        </a>
        <div className="signal" aria-label="Portfolio status">
          <i />
          <i />
          <i />
        </div>
      </header>

      <div className="hero-copy" data-reveal="headline">
        <h1 aria-label="Ideas Into Systems">
          <span className="lockup-i" aria-hidden="true">
            I
          </span>
          <span className="ideas-rest" aria-hidden="true">
            deas
          </span>
          <span className="into-rest" aria-hidden="true">
            nto<span className="title-label">MOHIT SALWAN</span>
          </span>
          <span className="systems-word" aria-hidden="true">
            Systems
          </span>
        </h1>
      </div>

      <figure
        className="cutout guitar"
        aria-label="Interactive paper cutout: Acoustic guitar"
        style={{
          transform: `translate3d(${offset.x * 0.5}px, ${offset.y * 0.5}px, 0)`,
        }}
      >
        <Image
          alt="Acoustic guitar cutout"
          draggable={false}
          width={1536}
          height={1024}
          priority
          src="/cutouts/guitar.webp"
        />
      </figure>

      <figure
        className="cutout keyboard"
        aria-label="Interactive paper cutout: Mechanical keyboard"
        style={{
          transform: `translate3d(${-offset.x * 0.4}px, ${offset.y * 0.4}px, 0)`,
        }}
      >
        <Image
          alt="Mechanical keyboard cutout"
          draggable={false}
          width={1536}
          height={1024}
          priority
          src="/cutouts/keyboard.webp"
        />
      </figure>

      <figure
        className="cutout headphones"
        aria-label="Interactive paper cutout: Nothing Headphone (1) wireless headphones"
        style={{
          transform: `translate3d(${offset.x * 0.6}px, ${-offset.y * 0.6}px, 0)`,
        }}
      >
        <Image
          alt="Nothing Headphone cutout"
          draggable={false}
          width={1254}
          height={1254}
          src="/cutouts/nothing-headphones.webp"
        />
      </figure>

      <figure
        className="cutout sampler"
        aria-label="Interactive paper cutout: Music sampler"
        style={{
          transform: `translate3d(${-offset.x * 0.5}px, ${-offset.y * 0.5}px, 0)`,
        }}
      >
        <Image
          alt="Music sampler cutout"
          draggable={false}
          width={1536}
          height={1024}
          src="/cutouts/sampler.webp"
        />
      </figure>

      <figure
        className="cutout watch"
        aria-label="Interactive paper cutout: Mohit's watch"
        style={{
          transform: `translate3d(${offset.x * 0.2}px, ${offset.y * 0.2}px, 0)`,
        }}
      >
        <Image
          alt="Watch cutout"
          draggable={false}
          width={1500}
          height={340}
          src="/cutouts/watch.webp"
        />
      </figure>

      <a
        className="contact-chip"
        href="https://mail.google.com/mail/?view=cm&fs=1&to=mohitsalwan%40gmail.com&su=Portfolio%20project%20inquiry&body=Hi%20Mohit%2C%0A%0AI%27d%20like%20to%20start%20a%20conversation%20about%3A%0A%0AProject%20or%20idea%3A%0ATimeline%3A%0ABudget%20range%3A%0A%0AThanks%21"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Start a project conversation with Mohit in Gmail"
      >
        <span>OPEN FOR IDEAS</span>
        <b>↗</b>
      </a>

      <a className="scroll-cue" href="#about">
        <span>MEET MOHIT</span>
        <i>↓</i>
      </a>
    </section>
  );
}
