"use client";

import { use } from "react";
import { projects, slugMap } from "@/data/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ImageGallery from "@/components/ImageGallery";
import { V4, V4Head, V4Shell } from "@/components/v4/Shell";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const PASTEL: Record<string, string> = { Android: "#cdbfff", iOS: "#ffc2d6", FE: "#b8f0e3", BE: "#ffe3a3", Fullstack: "#bfe4ff" };

function roleTags(role?: string): string[] {
  if (!role) return [];
  const r = role.toLowerCase();
  const tags: string[] = [];
  if (r.includes("android")) tags.push("Android");
  if (r.includes("ios")) tags.push("iOS");
  if (r.includes("frontend") || r.includes("fe")) tags.push("FE");
  if (r.includes("backend") || r.includes("be")) tags.push("BE");
  if (r.includes("fullstack") || r.includes("full stack")) tags.push("Fullstack");
  return tags;
}

function Md({ text }: { text: string }) {
  return (
    <ReactMarkdown
      components={{
        strong: ({ children }) => <strong className="font-semibold text-[#1c1b2e]">{children}</strong>,
        p: ({ children }) => <span>{children}</span>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`${V4.card} p-7 sm:p-9 ${className}`}>
      <h2 className={`${V4.eyebrow} mb-5`}>{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#3a3750]">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c5cff]" />
          <span><Md text={item} /></span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const title = Object.entries(slugMap).find(([, s]) => s === slug)?.[0];
  const project = projects.find((p) => p.title === title);
  if (!project) notFound();

  const tags = roleTags(project.role);
  const github = project.links?.find((l) => l.label.toLowerCase().includes("github"));
  const stores = project.links?.filter((l) => l.label.toLowerCase().includes("play")) ?? [];
  const others = project.links?.filter((l) => !l.label.includes("상세") && l !== github && !stores.includes(l)) ?? [];

  return (
    <V4Shell back={{ href: "/#projects", label: "프로젝트" }}>
      {/* head */}
      <V4Head sub={`${project.period ?? ""}${project.company ? ` · ${project.company}` : ""}`} title={project.title}>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <span key={t} className={V4.pill} style={{ background: PASTEL[t] ?? "#e5e5ef" }}>{t}</span>
          ))}
          {project.status && <span className={`${V4.pill} bg-[#dff6e8] text-[#1f6b45]`}>● {project.status}</span>}
          {project.role && <span className="text-[14px] text-[#7a7690]">{project.role}</span>}
        </div>
        <p className="mt-4 max-w-[760px] text-[18px] leading-relaxed text-[#3a3750] sm:text-[20px]">{project.description}</p>
        {(github || stores.length > 0 || others.length > 0) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {github && <a href={github.href} target="_blank" rel="noopener noreferrer" className={V4.btn}>GitHub ↗</a>}
            {stores.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={V4.btnGhost}>{s.label} ↗</a>)}
            {others.map((o) => <a key={o.href} href={o.href} target="_blank" rel="noopener noreferrer" className={V4.btnGhost}>{o.label} ↗</a>)}
          </div>
        )}
      </V4Head>

      {/* cover */}
      {project.image && (
        <div className={`${V4.card} mt-12 overflow-hidden p-3`}>
          <div className="relative w-full overflow-hidden rounded-2xl bg-[#efedf8]">
            <Image src={project.image} alt={project.title} width={0} height={0} sizes="(max-width: 1180px) 100vw, 1180px" className="h-auto w-full object-contain" priority />
          </div>
        </div>
      )}

      {/* body */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-6">
          {project.overview && (
            <Card title="프로젝트 개요">
              <p className="text-[16px] leading-[1.8] text-[#3a3750]">{project.overview}</p>
            </Card>
          )}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <Card title="담당 업무 · 기여"><Bullets items={project.responsibilities} /></Card>
          )}
          {project.features && project.features.length > 0 && (
            <Card title="주요 기능"><Bullets items={project.features} /></Card>
          )}
          {project.achievements && project.achievements.length > 0 && (
            <Card title="성과 · 개선"><Bullets items={project.achievements} /></Card>
          )}
          {project.experience && project.experience.length > 0 && (
            <Card title="개발 경험"><Bullets items={project.experience} /></Card>
          )}
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          {project.techStack && project.techStack.length > 0 && (
            <Card title="사용 기술">
              <ul className="flex flex-col gap-2.5 text-[14px] leading-relaxed text-[#3a3750]">
                {project.techStack.map((t, i) => <li key={i}><Md text={t} /></li>)}
              </ul>
            </Card>
          )}
          {project.tech && project.tech.length > 0 && (
            <Card title="스택">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => <span key={t} className="rounded-full bg-[#f3f2fa] px-3 py-1.5 text-[13px] font-medium">{t}</span>)}
              </div>
            </Card>
          )}
          {project.team && (
            <Card title="팀 구성"><p className="text-[14px] leading-relaxed text-[#3a3750]">{project.team}</p></Card>
          )}
          {project.presentation && (
            <a href={project.presentation} download className={`${V4.btn} w-full`}>발표자료 PDF 받기</a>
          )}
        </aside>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="mt-8">
          <Card title="화면">
            <ImageGallery images={project.images} title={project.title} />
          </Card>
        </div>
      )}

      <div className="mt-12 flex items-center justify-between text-[14px] text-[#7a7690]">
        <Link href="/#projects" className="hover:text-[#1c1b2e]">← 다른 프로젝트 보기</Link>
        <Link href="/guestbook" className="hover:text-[#1c1b2e]">방명록 남기기 →</Link>
      </div>
    </V4Shell>
  );
}
