"use client";

// 각 섹션 컴포넌트들을 import
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import CrewTalkSection from "@/components/CrewTalkSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// 메인 페이지 컴포넌트
// Next.js에서는 export default function을 사용하는 것이 일반적입니다
export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Header />

      <main id="top" className="w-full">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <CrewTalkSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
