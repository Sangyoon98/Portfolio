"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CareerSection from "@/components/CareerSection";
import EducationSection from "@/components/EducationSection";
import AwardsSection from "@/components/AwardsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CrewTalkSection from "@/components/CrewTalkSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main id="top" className="w-full">
        <HeroSection />
        <AboutSection />
        <CareerSection />
        <EducationSection />
        <AwardsSection />
        <CertificationsSection />
        <ActivitiesSection />
        <SkillsSection />
        <ProjectsSection />
        <CrewTalkSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
