"use client";

import dynamic from "next/dynamic";
import GrainOverlay from "@/components/GrainOverlay";
import StageHero from "@/components/StageHero";
import AboutSection from "@/components/AboutSection";
import SkillsOrbitSection from "@/components/SkillsOrbitSection";
import WorkSection from "@/components/WorkSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactFooter from "@/components/ContactFooter";
import ScrollProgress from "@/components/ScrollProgress";

const SmoothScrollProvider = dynamic(
  () => import("@/components/SmoothScrollProvider"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <GrainOverlay />
      <main className="landing" id="top">
        <StageHero />
        <AboutSection />
        <SkillsOrbitSection />
        <WorkSection />
        <ProjectsSection />
        <ContactFooter />
      </main>
      <ScrollProgress />
    </SmoothScrollProvider>
  );
}
