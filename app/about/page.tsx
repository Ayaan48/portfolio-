"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { ExternalLink, Download } from "lucide-react";
import { PillBase } from "@/components/ui/3d-adaptive-navigation-bar";

const skills = [
  "Java", "Python", "TypeScript", "React", "Next.js",
  "Node.js", "Tailwind CSS", "HTML/CSS", "Git", "MySQL",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Ayaan48",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.55-1.38-1.34-1.75-1.34-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.8 1.3 3.48.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayaan48",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:mohammadmuzu445@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const [contactOpen, setContactOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen text-white" style={{ backgroundColor: "hsl(0 0% 0%)" }}>

        {/* Nav pill */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <PillBase />
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-16">

          {/* Hero block */}
          <section className="flex flex-col sm:flex-row items-start gap-8">
            <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl shrink-0">
              <img src="/profile.jpeg" alt="Ayaan" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#C3E41D" }}>
                Shaik Mohammad Murtuzaa Ayaan
              </h1>
              <p className="text-neutral-400 text-sm tracking-widest uppercase">
                B.Tech Computer Science Student
              </p>
              <p className="text-neutral-300 leading-relaxed max-w-xl">
                I&apos;m a Computer Science student who loves learning new technologies and improving skills every day.
                Currently exploring Java, Python, and full-stack web development — building projects that solve real-world problems.
                Passionate about growth, consistency, and becoming a better developer step by step.
              </p>

              {/* Social icon buttons */}
              <div className="flex items-center gap-3 mt-2">
                {socialLinks.map(({ label, icon, href }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:border-neutral-600 hover:text-white transition-all"
                        >
                          {icon}
                        </a>
                      ) : (
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-neutral-800 bg-neutral-900 text-neutral-600 cursor-not-allowed opacity-50">
                          {icon}
                        </span>
                      )}
                    </TooltipTrigger>
                    <TooltipContent className="bg-neutral-900 border-neutral-800 text-white text-xs">
                      {href ? label : `${label} (not available)`}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </section>

          <div className="h-px bg-neutral-900" />

          {/* Skills */}
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-neutral-400 tracking-widest uppercase">
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-neutral-800 text-neutral-400 hover:border-[#C3E41D] hover:text-[#C3E41D] transition-colors cursor-default px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <div className="h-px bg-neutral-900" />

          {/* Currently exploring */}
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-neutral-400 tracking-widest uppercase">
              Currently Exploring
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Java", desc: "Data structures, OOP, and backend development." },
                { title: "Python", desc: "Scripting, automation, and data exploration." },
                { title: "Full-Stack Web", desc: "React, Next.js, Node.js, and databases." },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-neutral-900 bg-neutral-950 p-4 flex flex-col gap-2 hover:border-neutral-700 transition-colors"
                >
                  <span className="text-sm font-semibold text-white">{title}</span>
                  <span className="text-xs text-neutral-500 leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="h-px bg-neutral-900" />

          {/* CTA */}
          <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-neutral-300 font-medium">Interested in working together?</p>
              <p className="text-neutral-600 text-sm">Feel free to reach out anytime.</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                download="Ayaan_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 transition-all"
              >
                <Download className="size-4" /> Resume
              </a>
              <button
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-black transition-colors hover:opacity-90"
                style={{ backgroundColor: "#C3E41D" }}
              >
                Get in touch <ExternalLink className="size-4" />
              </button>
            </div>
          </section>

        </div>

        {/* Contact popup */}
        {contactOpen && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            onClick={() => setContactOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
              className="relative z-10 w-[320px] rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setContactOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
              >
                ✕
              </button>

              <h3 className="text-white font-semibold text-lg mb-1">Get in touch</h3>
              <p className="text-neutral-500 text-xs mb-5">Choose how you&apos;d like to connect.</p>

              <div className="flex flex-col gap-3">
                {socialLinks.map(({ label, icon, href }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-600 hover:text-white transition-all"
                    >
                      <span className="text-neutral-400">{icon}</span>
                      <span className="text-sm font-medium">{label}</span>
                    </a>
                  ) : (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-900 bg-neutral-950 text-neutral-600 cursor-not-allowed opacity-50"
                    >
                      <span>{icon}</span>
                      <span className="text-sm font-medium">{label}</span>
                      <span className="ml-auto text-xs">not available</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </TooltipProvider>
  );
}
