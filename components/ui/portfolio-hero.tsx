"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { PillBase } from "@/components/ui/3d-adaptive-navigation-bar";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function Component() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const negSpringX = useTransform(springX, (v) => -v * 0.5);
  const negSpringY = useTransform(springY, (v) => -v * 0.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x * 24);
    mouseY.set(y * 24);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div
      className="min-h-screen text-foreground relative overflow-hidden"
      style={{ color: "hsl(0 0% 100%)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cosmic Background */}
      <CosmicParallaxBg />

      {/* 3D Nav Pill - Top Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <PillBase />
      </div>

      {/* Header */}
      <header className="fixed top-0 right-0 z-40 px-2 pt-6 pb-4 hidden sm:block">
        <nav className="flex items-center justify-end max-w-screen-2xl mx-auto">
          <GooeyText
            texts={[
              "The Goal Is to Become So",
              "Loving",
              "Disciplined",
              "Caring",
              "Successful",
            ]}
            morphTime={1}
            cooldownTime={0.5}
            className="h-16 w-[220px] md:w-[360px] ml-auto mr-2"
            textClassName="!text-[20px] md:!text-[28px] !font-bold !text-neutral-500"
          />
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 min-h-screen flex flex-col">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between px-6 md:px-10 pt-20 gap-8 sm:gap-10">

          {/* Profile — spinning gradient ring + ambient glow */}
          <motion.div
            className="order-first sm:order-last flex-shrink-0 relative"
            style={{ x: springX, y: springY }}
          >
            {/* Ambient glow behind */}
            <div className="absolute -inset-6 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

            {/* Spinning gradient ring */}
            <div className="relative" style={{ padding: "3px" }}>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(#7EB8F7, #818cf8, #c084fc, #38bdf8, #7EB8F7)",
                  animation: "spin-ring 5s linear infinite",
                }}
              />
              <div className="relative w-[110px] h-[110px] sm:w-[140px] sm:h-[220px] md:w-[165px] md:h-[265px] lg:w-[195px] lg:h-[315px] rounded-full overflow-hidden bg-black hover:scale-105 transition-transform duration-500">
                <img src="/profile.jpeg" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Text — glass card */}
          <motion.div
            className="order-last sm:order-first flex-1 min-w-0"
            style={{ x: negSpringX, y: negSpringY }}
          >
            <div className="backdrop-blur-md bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(126,184,247,0.06)]">

              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-400 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to opportunities
              </div>

              {/* Name with shimmer */}
              <BlurText
                text="SHAIK MOHAMMAD MURTUZAA AYAAN"
                delay={50}
                animateBy="words"
                direction="top"
                className="shimmer-text font-bold text-[16px] sm:text-[20px] md:text-[26px] lg:text-[34px] leading-tight tracking-[0.08em] uppercase justify-center sm:justify-start"
                style={{ fontFamily: "var(--font-fira-code), monospace" }}
              />

              {/* Role line */}
              <p className="mt-2 text-[11px] sm:text-[13px] text-neutral-500 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-antic)" }}>
                B.Tech CS Student &nbsp;·&nbsp; Full-Stack Developer
              </p>

              {/* Bio */}
              <p className="mt-4 max-w-[560px] text-[12px] sm:text-[13px] md:text-[14px] text-white/60 leading-relaxed">
                I love learning new technologies and improving my skills every day. Currently exploring Java, Python, and full-stack web development — building projects that solve real-world problems. Passionate about growth, consistency, and becoming a better developer step by step.
              </p>

              {/* Tech stack chips */}
              <div className="flex flex-wrap gap-2 mt-5">
                {["Java", "Python", "React", "Next.js", "TypeScript", "Node.js", "Tailwind"].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-[11px] bg-white/[0.04] border border-white/[0.08] text-neutral-400 hover:border-[#7EB8F7]/60 hover:text-[#7EB8F7] transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <div className="flex-1 flex items-end justify-center pb-20 md:pb-28 px-6">
          <BlurText
            text="future developer"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-[11px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-center tracking-[0.4em] uppercase text-neutral-600"
            style={{ fontFamily: "var(--font-antic)", letterSpacing: "0.4em" }}
          />
        </div>

        {/* Scroll Indicator */}
        <motion.button
          type="button"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
          aria-label="Scroll down"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 md:w-7 md:h-7 text-neutral-600 hover:text-[#7EB8F7] transition-colors duration-300" />
        </motion.button>
      </main>
    </div>
  );
}
