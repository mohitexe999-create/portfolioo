"use client";

import React, { useEffect, useRef } from "react";

// Generate Fibonacci Sphere coordinates
function generateFibonacciSphere(samples: number) {
  const phi = Math.PI * (3 - Math.sqrt(5));
  const colors = ["#ffffff", "#6fe3bd", "#73a5ff", "#f59e0b", "#f87171", "#a78bfa"];
  return Array.from({ length: samples }, (_, i) => {
    const y = 1 - (i / (samples - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    return {
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
      color: colors[i % colors.length],
    };
  });
}

const SPHERE_MOBILE = generateFibonacciSphere(320);
const SPHERE_DESKTOP = generateFibonacciSphere(560);

function ParticleSphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animId = 0;
    let isVisible = false;
    let lastTime = 0;
    let width = 0;
    let height = 0;
    let particles = SPHERE_DESKTOP;

    const render = (time = 0) => {
      if (!prefersReducedMotion && time - lastTime < 32) {
        animId = window.requestAnimationFrame(render);
        return;
      }
      lastTime = time;
      ctx.clearRect(0, 0, width, height);

      const rot = prefersReducedMotion ? -0.18 : time * 0.000075;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const scale = 0.405 * Math.min(width, height);
      const cx = width / 2;
      const cy = height * 0.51;

      for (const p of particles) {
        const px = p.x * cosR - p.z * sinR;
        const pz = p.x * sinR + p.z * cosR;
        const perspective = 1.95 / (2.65 - 0.42 * pz);
        const sx = cx + px * scale * perspective;
        const sy = cy + p.y * scale * perspective;
        const depthNorm = (pz + 1) / 2;
        const radius = 0.45 + 1.35 * depthNorm;

        ctx.globalAlpha = 0.18 + 0.78 * depthNorm;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!prefersReducedMotion && isVisible) {
        animId = window.requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      window.cancelAnimationFrame(animId);
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      particles = window.innerWidth < 768 ? SPHERE_MOBILE : SPHERE_DESKTOP;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (prefersReducedMotion) {
        render();
      } else if (isVisible) {
        animId = window.requestAnimationFrame(render);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        window.cancelAnimationFrame(animId);
        if (isVisible) animId = window.requestAnimationFrame(render);
      },
      { rootMargin: "12% 0%", threshold: 0 }
    );

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas className="particle-sphere-canvas" ref={canvasRef} aria-hidden="true" />;
}

export default function SkillsOrbitSection() {
  return (
    <section className="skills-orbit-page" id="skills-orbit" aria-labelledby="skills-orbit-title">
      <div className="orbit-grain" aria-hidden="true" />
      
      <div className="orbit-signal-bar" data-orbit-reveal="signal" aria-label="Mohit's capability system">
        <p>
          <span>ACTIVE CONSTELLATION</span>
          <strong>Tools that move ideas.</strong>
        </p>
        <div className="orbit-signal-route" aria-label="Mohit's creative workflow">
          <span>QUESTION</span>
          <i aria-hidden="true">✦</i>
          <span>PROTOTYPE</span>
          <i aria-hidden="true">✦</i>
          <span>INTELLIGENCE</span>
          <i aria-hidden="true">✦</i>
          <span>SHIP</span>
        </div>
        <small>MOHIT SALWAN / AI · CODE · DATA · AUTOMATION</small>
      </div>

      <header className="orbit-page-heading" data-orbit-reveal="heading">
        <span>03 / CAPABILITY MAP</span>
        <h2 id="skills-orbit-title">
          <em className="skills-handoff-target">Skills</em> in Orbit
        </h2>
        <p>
          Languages, frameworks and tools do not sit in separate boxes here. They revolve around the same job: turning an unusual idea into something useful.
        </p>
      </header>

      <div className="orbit-stage" data-orbit-reveal="orbit">
        <div className="skill-orbit-semicircle" aria-label="Technical skills orbiting a particle globe">
          <div className="semi-orbit-globe" aria-hidden="true">
            <ParticleSphereCanvas />
          </div>

          {/* Ring 1 - Inner (18s clockwise) */}
          <div className="semi-orbit-ring semi-orbit-ring-1">
            <div className="semi-orbit-spoke" data-direction="clockwise" style={{ "--start-angle": "-72deg", "--orbit-duration": "24s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="clockwise" style={{ "--counter-offset": "72deg", "--skill-color": "#5fa8e8", "--orbit-duration": "24s" } as React.CSSProperties} title="Python">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                </svg>
                <span>Python</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="clockwise" style={{ "--start-angle": "-36deg", "--orbit-duration": "24s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="clockwise" style={{ "--counter-offset": "36deg", "--skill-color": "#7cb3f3", "--orbit-duration": "24s" } as React.CSSProperties} title="TypeScript">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                </svg>
                <span>TypeScript</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="clockwise" style={{ "--start-angle": "0deg", "--orbit-duration": "24s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="clockwise" style={{ "--counter-offset": "0deg", "--skill-color": "#7fe7ff", "--orbit-duration": "24s" } as React.CSSProperties} title="React">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565z" />
                </svg>
                <span>React</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="clockwise" style={{ "--start-angle": "36deg", "--orbit-duration": "24s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="clockwise" style={{ "--counter-offset": "-36deg", "--skill-color": "#8cd47a", "--orbit-duration": "24s" } as React.CSSProperties} title="Node.js">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z" />
                </svg>
                <span>Node.js</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="clockwise" style={{ "--start-angle": "72deg", "--orbit-duration": "24s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="clockwise" style={{ "--counter-offset": "-72deg", "--skill-color": "#ff8b6b", "--orbit-duration": "24s" } as React.CSSProperties} title="PyTorch">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.005 0L4.952 7.053a9.865 9.865 0 0 0 0 13.9 9.866 9.866 0 0 0 13.9 0 9.866 9.866 0 0 0 .047-13.904l-1.208 3.98c1.527 2.12 1.39 5.09-.419 7.05a7.028 7.028 0 0 1-9.913 0 7.028 7.028 0 0 1 0-9.913l3.997-4.027-.351-2.139zM14.959 1.964a1.136 1.136 0 1 0 1.136 1.136 1.136 1.136 0 0 0-1.136-1.136z" />
                </svg>
                <span>PyTorch</span>
              </span>
            </div>
          </div>

          {/* Ring 2 - Middle (28s counterclockwise) */}
          <div className="semi-orbit-ring semi-orbit-ring-2">
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "-80deg", "--orbit-duration": "28s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "80deg", "--skill-color": "#5eead4", "--orbit-duration": "28s" } as React.CSSProperties} title="Tailwind CSS">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                </svg>
                <span>Tailwind CSS</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "-48deg", "--orbit-duration": "28s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "48deg", "--skill-color": "#fde047", "--orbit-duration": "28s" } as React.CSSProperties} title="JavaScript">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                </svg>
                <span>JavaScript</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "-16deg", "--orbit-duration": "28s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "16deg", "--skill-color": "#f97316", "--orbit-duration": "28s" } as React.CSSProperties} title="HTML">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                </svg>
                <span>HTML</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "16deg", "--orbit-duration": "28s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-16deg", "--skill-color": "#60a5fa", "--orbit-duration": "28s" } as React.CSSProperties} title="MySQL">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622z" />
                </svg>
                <span>MySQL</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "48deg", "--orbit-duration": "28s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-48deg", "--skill-color": "#f87171", "--orbit-duration": "28s" } as React.CSSProperties} title="Java">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.915 0 11.7.215C9.515 2.4 7.47 6.39 6.046 10.483c-1.064 1.024-3.633 2.81-3.711 3.551-.093.87 1.746 2.611 1.55 3.235-.198.625-1.304 1.408-1.014 1.939.1.188.823.011 1.277-.491a13.389 13.389 0 0 0-.017 2.14c.076.906.27 1.668.643 2.232.372.563.956.911 1.667.911.397 0 .727-.114 1.024-.264.298-.149.571-.33.91-.5.68-.34 1.634-.666 3.53-.604 1.903.062 2.872.39 3.559.704.687.314 1.15.664 1.925.664.767 0 1.395-.336 1.807-.9.412-.563.631-1.33.72-2.24.06-.623.055-1.32 0-2.066.454.45 1.117.604 1.213.424.29-.53-.816-1.314-1.013-1.937-.198-.624 1.642-2.366 1.549-3.236-.08-.748-2.707-2.568-3.748-3.586C16.428 6.374 14.308 2.394 12.13.215z" />
                </svg>
                <span>Java</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "80deg", "--orbit-duration": "28s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-80deg", "--skill-color": "#4285f4", "--orbit-duration": "28s" } as React.CSSProperties} title="Google Cloud">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.19 2.96l-4.187 4.187h-.185A6.756 6.756 0 0 0 1.06 13.91a6.754 6.754 0 0 0 6.756 6.755h8.37a6.756 6.756 0 0 0 6.756-6.755 6.75 6.75 0 0 0-4.753-6.45l-.224-.07-1.757-1.757V5.6L12.19 2.96zm0 1.795l2.957 2.956v.527l.383.114a5.01 5.01 0 0 1 3.62 4.817 5.006 5.006 0 0 1-5.006 5.005h-8.37a5.006 5.006 0 0 1-5.005-5.005 5.006 5.006 0 0 1 5.005-5.005h.527l3.89-3.41zM12 8.756a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75z" />
                </svg>
                <span>Google Cloud</span>
              </span>
            </div>
          </div>

          {/* Ring 3 - Outer (38s counterclockwise) */}
          <div className="semi-orbit-ring semi-orbit-ring-3">
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "78.75deg", "--orbit-duration": "38s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-78.75deg", "--skill-color": "#4ade80", "--orbit-duration": "38s" } as React.CSSProperties} title="Supabase">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
                </svg>
                <span>Supabase</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "101.25deg", "--orbit-duration": "38s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-101.25deg", "--skill-color": "#a78bfa", "--orbit-duration": "38s" } as React.CSSProperties} title="Vite">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z" />
                </svg>
                <span>Vite</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "123.75deg", "--orbit-duration": "38s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-123.75deg", "--skill-color": "#ffca28", "--orbit-duration": "38s" } as React.CSSProperties} title="Firebase">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z" />
                </svg>
                <span>Firebase</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "146.25deg", "--orbit-duration": "38s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-146.25deg", "--skill-color": "#58a6ff", "--orbit-duration": "38s" } as React.CSSProperties} title="VS Code">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.86V4.14a1.5 1.5 0 0 0-.85-1.553zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
                </svg>
                <span>VS Code</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "168.75deg", "--orbit-duration": "38s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-168.75deg", "--skill-color": "#f0eadc", "--orbit-duration": "38s" } as React.CSSProperties} title="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>GitHub</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "191.25deg", "--orbit-duration": "38s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-191.25deg", "--skill-color": "#74a8ff", "--orbit-duration": "38s" } as React.CSSProperties} title="Antigravity">
                <strong className="semi-orbit-wordmark" aria-hidden="true">AG</strong>
                <span>Antigravity</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "213.75deg", "--orbit-duration": "38s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-213.75deg", "--skill-color": "#f0eadc", "--orbit-duration": "38s" } as React.CSSProperties} title="Cursor">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
                </svg>
                <span>Cursor</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "236.25deg", "--orbit-duration": "38s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-236.25deg", "--skill-color": "#80e7d5", "--orbit-duration": "38s" } as React.CSSProperties} title="GitHub Copilot">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z" />
                </svg>
                <span>GitHub Copilot</span>
              </span>
            </div>
            <div className="semi-orbit-spoke" data-direction="counterclockwise" style={{ "--start-angle": "258.75deg", "--orbit-duration": "38s" } as React.CSSProperties}>
              <span className="semi-orbit-icon" data-direction="counterclockwise" style={{ "--counter-offset": "-258.75deg", "--skill-color": "#22b8a7", "--orbit-duration": "38s" } as React.CSSProperties} title="Perplexity">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />
                </svg>
                <span>Perplexity</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <aside className="orbit-notes" data-orbit-reveal="notes" aria-label="Qualifications and creative milestones">
        <span className="orbit-note-title">PROOF IN PRACTICE</span>
        <span className="orbit-paper-tag" data-proof="01" style={{ "--tag-turn": "-1.2deg" } as React.CSSProperties}>
          DEEP LEARNING / PYTORCH
        </span>
        <span className="orbit-paper-tag" data-proof="02" style={{ "--tag-turn": "-0.4deg" } as React.CSSProperties}>
          LARGE LANGUAGE MODELS
        </span>
        <span className="orbit-paper-tag" data-proof="03" style={{ "--tag-turn": "0.4deg" } as React.CSSProperties}>
          HACKATHON WINNER
        </span>
        <span className="orbit-paper-tag" data-proof="04" style={{ "--tag-turn": "1.2deg" } as React.CSSProperties}>
          HACKATHON FINALIST
        </span>
      </aside>
    </section>
  );
}
