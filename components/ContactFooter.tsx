"use client";

import React from "react";

const SOCIALS = [
  {
    index: "01",
    label: "GitHub",
    href: "https://github.com/mohitexe999-create",
    icon: (
      <svg
        style={{ width: "1.05rem", height: "1.05rem", flexShrink: 0 }}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    index: "02",
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        style={{ width: "1.05rem", height: "1.05rem", flexShrink: 0 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    index: "03",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohit-salwan",
    icon: (
      <svg
        style={{ width: "1.05rem", height: "1.05rem", flexShrink: 0 }}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 1.62 1.62c0-.9-.73-1.62-1.62-1.62z" />
      </svg>
    ),
  },
  {
    index: "04",
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg
        style={{ width: "1.05rem", height: "1.05rem", flexShrink: 0 }}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.08-1.1l-.29-.17-3.12.82.83-3.04-.19-.3a8.216 8.216 0 0 1-1.26-4.45c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.12-.22-.19-.47-.32z" />
      </svg>
    ),
  },
  {
    index: "05",
    label: "LeetCode",
    href: "https://leetcode.com/u/Mohit-Salwan",
    icon: (
      <svg
        style={{ width: "1.05rem", height: "1.05rem", flexShrink: 0 }}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
];

export default function ContactFooter() {
  return (
    <footer className="ascii-footer" data-project-reveal="contact-sheet">
      <div className="ascii-footer-grain" aria-hidden="true" />
      
      <div className="ascii-footer-top">
        <span>
          <i aria-hidden="true" /> AVAILABLE FOR IDEAS WITH A POINT OF VIEW
        </span>
        <small>INDIA BASED / BUILDING WORLDWIDE</small>
      </div>

      <div className="ascii-footer-main">
        <div className="ascii-footer-statement">
          <span>THE NEXT SYSTEM STARTS WITH A CONVERSATION</span>
          <p>
            Let&apos;s <span style={{ color: "#f5e9ce" }}>make</span>{" "}
            <span style={{ color: "#FFA102" }}>something</span>
            <br />
            worth <em>remembering.</em>
          </p>
          <div className="ascii-footer-manifest" aria-label="How Mohit works">
            <span>
              <small>01 / THINK</small>
              <b>Clear direction</b>
            </span>
            <span>
              <small>02 / BUILD</small>
              <b>Useful systems</b>
            </span>
            <span>
              <small>03 / SHIP</small>
              <b>Real outcomes</b>
            </span>
          </div>
        </div>

        <aside className="ascii-footer-console" aria-label="Contact details">
          <span className="ascii-footer-console-label">PROJECT INTAKE / OPEN</span>
          <a
            className="ascii-footer-contact"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mohitsalwan%40gmail.com&su=Portfolio%20project%20inquiry&body=Hi%20Mohit%2C%0A%0AI%27d%20like%20to%20start%20a%20conversation%20about%3A%0A%0AProject%20or%20idea%3A%0ATimeline%3A%0ABudget%20range%3A%0A%0AThanks%21"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start a project conversation with Mohit in Gmail"
          >
            <span>START A CONVERSATION</span>
            <strong>mohitsalwan@gmail.com</strong>
            <b aria-hidden="true">↗</b>
          </a>
          <div className="ascii-footer-coordinates">
            <span>
              <small>RESPONSE</small>
              <b>24–48 HOURS</b>
            </span>
            <span>
              <small>WORK MODE</small>
              <b>REMOTE / WORLDWIDE</b>
            </span>
          </div>
        </aside>
      </div>

      <nav className="ascii-footer-socials" aria-label="Mohit Salwan social accounts">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.href === "#" ? undefined : "_blank"}
            rel={social.href === "#" ? undefined : "noopener noreferrer"}
          >
            <small>{social.index}</small>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                fontSize: "clamp(0.78rem, 0.88vw, 0.98rem)",
              }}
            >
              {social.icon}
              {social.label}
            </span>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </nav>

      <div className="ascii-footer-bottom">
        <span>DESIGN / DATA / AI / AUTOMATION</span>
        <span>MOHIT SALWAN © 2026</span>
      </div>
    </footer>
  );
}
