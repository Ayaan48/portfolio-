"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Dot — tight spring, almost instant
  const dotX = useSpring(x, { stiffness: 400, damping: 28 });
  const dotY = useSpring(y, { stiffness: 400, damping: 28 });

  // Ring — looser spring, lags behind for depth
  const ringX = useSpring(x, { stiffness: 120, damping: 18 });
  const ringY = useSpring(y, { stiffness: 120, damping: 18 });

  useEffect(() => {
    // Only enable on mouse devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsTouch(false);
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button'], input, textarea, select, label"));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed pointer-events-none rounded-full border"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          zIndex: 9998,
        }}
        animate={{
          width: hovering ? 50 : 34,
          height: hovering ? 50 : 34,
          opacity: visible ? (hovering ? 0.85 : 0.4) : 0,
          borderColor: hovering
            ? "rgba(255,255,255,0.7)"
            : "rgba(126,184,247,0.55)",
          boxShadow: hovering
            ? "0 0 18px rgba(255,255,255,0.18)"
            : "0 0 10px rgba(126,184,247,0.2)",
        }}
        transition={{ duration: 0.18 }}
      />

      {/* Inner dot — snappy */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          left: dotX,
          top: dotY,
          x: "-50%",
          y: "-50%",
          zIndex: 9999,
        }}
        animate={{
          width: hovering ? 7 : 5,
          height: hovering ? 7 : 5,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "#ffffff" : "#7EB8F7",
          boxShadow: hovering
            ? "0 0 12px #fff, 0 0 24px rgba(255,255,255,0.5)"
            : "0 0 8px #7EB8F7, 0 0 18px rgba(126,184,247,0.5)",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
