"use client";

import React, { useRef, useEffect } from "react";

export default function WorkSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted until user interaction
      });
    }
  }, []);

  return (
    <section className="work-page" id="work" aria-label="Animated electric ASCII portrait">
      <div className="work-grain" aria-hidden="true" />
      <a
        className="work-signature"
        href="#top"
        aria-label="Back to the beginning"
        data-work-reveal="signature"
      >
        mohit
        <br />
        salwan
      </a>
      <div className="work-copy" data-work-reveal="copy">
        <h2>
          Curious by nature.
          <br />
          Building by <em>choice.</em>
        </h2>
      </div>
      <figure className="electric-gaze" data-work-reveal="visual">
        <div className="electric-gaze-media">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster="https://assets.21st.dev/ascii-recipes/thumbnails/user_2nElBLvklOKlAURm6W1PTu6yYFh/ae758991-0c3f-4c6a-9296-33784c65d43b.webp"
            aria-label="Live electric ASCII portrait study"
          >
            <source
              src="https://assets.21st.dev/ascii-recipes/videos/user_2nElBLvklOKlAURm6W1PTu6yYFh/c458eb38-7f4e-4272-8711-59a86e20d624.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </figure>
    </section>
  );
}
