"use client";

import React from "react";
import {
  FaJava, FaPython, FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaGithub, FaLinux, FaFigma,
} from "react-icons/fa";
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMysql, SiJavascript, SiVercel,
  SiPostman, SiVscodium, SiExpress, SiMongodb,
} from "react-icons/si";

const row1 = [
  { name: "Java",        icon: <FaJava />,        color: "#f89820" },
  { name: "Python",      icon: <FaPython />,       color: "#3b82f6" },
  { name: "TypeScript",  icon: <SiTypescript />,   color: "#3178c6" },
  { name: "React",       icon: <FaReact />,        color: "#61dafb" },
  { name: "Next.js",     icon: <SiNextdotjs />,    color: "#ffffff" },
  { name: "Node.js",     icon: <FaNodeJs />,       color: "#68a063" },
  { name: "JavaScript",  icon: <SiJavascript />,   color: "#f7df1e" },
];

const row2 = [
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38bdf8" },
  { name: "MySQL",        icon: <SiMysql />,       color: "#00758f" },
  { name: "Git",          icon: <FaGitAlt />,      color: "#f05032" },
  { name: "GitHub",       icon: <FaGithub />,      color: "#e2e8f0" },
  { name: "HTML5",        icon: <FaHtml5 />,       color: "#e34f26" },
  { name: "CSS3",         icon: <FaCss3Alt />,     color: "#1572b6" },
  { name: "Vercel",       icon: <SiVercel />,      color: "#ffffff" },
];

const row3 = [
  { name: "Express.js",  icon: <SiExpress />,     color: "#c0c0c0" },
  { name: "MongoDB",     icon: <SiMongodb />,     color: "#47a248" },
  { name: "Postman",     icon: <SiPostman />,     color: "#ff6c37" },
  { name: "VS Code",     icon: <SiVscodium />,    color: "#007acc" },
  { name: "Linux",       icon: <FaLinux />,       color: "#fcc624" },
  { name: "Figma",       icon: <FaFigma />,       color: "#f24e1e" },
  { name: "REST APIs",   icon: <FaNodeJs />,      color: "#68a063" },
];

function MarqueeRow({
  items,
  reverse = false,
  speed = 28,
}: {
  items: { name: string; icon: React.ReactNode; color: string }[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #090a0f, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #090a0f, transparent)" }} />

      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm whitespace-nowrap group hover:border-white/20 transition-all duration-300"
            style={{ boxShadow: `0 0 0 0 ${tech.color}00` }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${tech.color}30`;
              (e.currentTarget as HTMLDivElement).style.borderColor = `${tech.color}40`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "";
              (e.currentTarget as HTMLDivElement).style.borderColor = "";
            }}
          >
            <span
              className="text-lg transition-colors duration-300"
              style={{ color: tech.color }}
            >
              {tech.icon}
            </span>
            <span className="text-[13px] font-medium text-neutral-400 group-hover:text-neutral-200 transition-colors duration-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      className="w-full py-20 flex flex-col gap-4 relative"
      style={{ background: "#090a0f" }}
    >
      {/* Section label */}
      <div className="flex items-center justify-center mb-6 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neutral-800" />
        <span className="px-4 text-[11px] tracking-[0.3em] uppercase text-neutral-600 font-medium">
          Tech Stack
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neutral-800" />
      </div>

      <MarqueeRow items={row1} speed={30} />
      <MarqueeRow items={row2} speed={24} reverse />
      <MarqueeRow items={row3} speed={27} />
      <MarqueeRow items={[...row1.slice(3), ...row2.slice(0, 4)]} speed={22} reverse />
    </section>
  );
}
