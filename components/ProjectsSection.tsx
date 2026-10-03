"use client";

import React, { useState } from "react";
import { PROJECTS } from "@/lib/projectsData";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";

export default function ProjectsSection() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedProjectIndex(index);
  };

  const handleClose = () => {
    setSelectedProjectIndex(null);
  };

  return (
    <>
      <section className="projects-page ascii-projects" id="projects" aria-labelledby="projects-title">
        <div className="projects-grain" aria-hidden="true" />
        
        <header className="ascii-masthead" data-project-reveal="masthead">
          <a href="#top" aria-label="Back to the beginning">
            mohit
            <br />
            salwan
          </a>
          <p>PROJECTS</p>
        </header>

        <div className="ascii-intro" data-project-reveal="intro">
          <span>REAL SITES, SEEN DIFFERENTLY.</span>
          <h2 id="projects-title">
            The work <span style={{ color: '#e64016ff' }}>behind</span>
            <br />
            the <em>experiments.</em>
          </h2>
          <p>
            Selected experiments where code, design and curiosity become useful things. Reveal the interface, then open a project to see the thinking behind it.
          </p>
        </div>

        <div className="ascii-project-grid" data-project-reveal="feature">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </section>

      <ProjectDetailModal
        projects={PROJECTS}
        selectedIndex={selectedProjectIndex}
        onClose={handleClose}
        onSelectIndex={setSelectedProjectIndex}
      />
    </>
  );
}
