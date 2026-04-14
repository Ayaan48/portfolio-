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
        {/* Name + Profile — stacked on mobile, side-by-side on sm+ */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between px-6 md:px-10 pt-24 gap-8 sm:gap-6">
          {/* Profile Picture — parallax shifts forward (same direction as mouse) */}
          <motion.div
            className="order-first sm:order-last flex-shrink-0"
            style={{ x: springX, y: springY }}
          >
            <div className="w-[110px] h-[110px] sm:w-[130px] sm:h-[210px] md:w-[160px] md:h-[260px] lg:w-[190px] lg:h-[310px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Name + Bio — parallax shifts backward (opposite direction for depth) */}
          <motion.div
            className="order-last sm:order-first flex-1 min-w-0 text-center sm:text-left"
            style={{ x: negSpringX, y: negSpringY }}
          >
            <BlurText
              text="SHAIK MOHAMMAD MURTUZAA AYAAN"
              delay={50}
              animateBy="words"
              direction="top"
              className="font-bold text-[16px] sm:text-[20px] md:text-[26px] lg:text-[34px] leading-tight tracking-[0.08em] uppercase justify-center sm:justify-start"
              style={{
                color: "#7EB8F7",
                fontFamily: "var(--font-fira-code), monospace",
                textShadow: "0 0 30px rgba(126, 184, 247, 0.6), 0 0 70px rgba(100, 160, 255, 0.3)",
                WebkitTextStroke: "1px rgba(126,184,247,0.25)",
              }}
            />
            <p className="mt-3 max-w-[560px] md:max-w-[680px] mx-auto sm:mx-0 text-[12px] sm:text-[13px] md:text-[15px] text-white/70 leading-relaxed" style={{ textShadow: "0 0 8px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.15)" }}>
              I&apos;m a B.Tech Computer Science student who loves learning new technologies and improving my skills every day. I&apos;m currently exploring Java, Python, and full-stack web development, and I enjoy building projects that solve real-world problems. I&apos;m deeply passionate about growth, consistency, and continuous learning — always striving to become a better developer step by step.
            </p>
          </motion.div>
        </div>

        {/* Tagline */}
        <div className="flex-1 flex items-end justify-center pb-20 md:pb-28 px-6">
          <BlurText
            text="future developer"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-[12px] sm:text-[15px] md:text-[17px] lg:text-[19px] text-center tracking-[0.3em] uppercase transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
            style={{ fontFamily: "var(--font-antic), sans-serif", letterSpacing: "0.35em" }}
          />
        </div>

        {/* Scroll Indicator */}
        <motion.button
          type="button"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
        </motion.button>
      </main>
    </div>
  );
}
