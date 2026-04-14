"use client";

import React, { useState, useRef, useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface NavItem {
  label: string
  id: string
  href?: string
}

export const PillBase: React.FC = () => {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('home')
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevSectionRef = useRef('home')

  const navItems: NavItem[] = [
    { label: 'Home', id: 'home', href: '/' },
    { label: 'About', id: 'about', href: '/about' },
    { label: 'Projects', id: 'projects', href: '/projects' },
    { label: 'Contact', id: 'contact', href: '/contact' },
  ]

  const pillWidth = useSpring(100, { stiffness: 220, damping: 25, mass: 1 })
  const pillShift = useSpring(0, { stiffness: 220, damping: 25, mass: 1 })

  useEffect(() => {
    if (hovering) {
      setExpanded(true)
      pillWidth.set(400)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false)
        pillWidth.set(140)
      }, 600)
    }
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [hovering, pillWidth])

  const handleSectionClick = (sectionId: string, href?: string) => {
    setIsTransitioning(true)
    prevSectionRef.current = sectionId
    setActiveSection(sectionId)
    setHovering(false)
    setTimeout(() => setIsTransitioning(false), 400)
    if (href) router.push(href)
  }

  const activeItem = navItems.find(item => item.id === activeSection)

  return (
    <motion.nav
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative rounded-full"
      style={{
        width: pillWidth,
        height: '40px',
        background: `linear-gradient(135deg, #1a1a1a 0%, #141414 50%, #111111 100%)`,
        boxShadow: expanded
          ? `0 0 0 1px rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`
          : `0 0 0 1px rgba(255,255,255,0.06), 0 2px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
        x: pillShift,
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease-out',
      }}
    >
      {/* Subtle top edge shimmer */}
      <div className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none" style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)' }} />

      {/* Nav content */}
      <div ref={containerRef} className="relative z-10 h-full flex items-center justify-center px-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro", Poppins, sans-serif' }}>
        {!expanded && (
          <div className="flex items-center relative">
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.span
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: [0.4, 0.0, 0.2, 1] }}
                  style={{ fontSize: '13px', fontWeight: 500, color: '#a3a3a3', letterSpacing: '0.45px', whiteSpace: 'nowrap', WebkitFontSmoothing: 'antialiased' }}
                >
                  {activeItem.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}

        {expanded && (
          <div className="flex items-center justify-evenly w-full">
            {navItems.map((item, index) => {
              const isActive = item.id === activeSection
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.08, duration: 0.25, ease: 'easeOut' }}
                  onClick={() => handleSectionClick(item.id, item.href)}
                  className="relative cursor-pointer transition-all duration-200"
                  style={{ fontSize: '13px', fontWeight: isActive ? 600 : 400, color: isActive ? '#ffffff' : '#6b6b6b', letterSpacing: '0.4px', background: 'transparent', border: 'none', padding: '6px 12px', outline: 'none', whiteSpace: 'nowrap', WebkitFontSmoothing: 'antialiased', transform: isActive ? 'translateY(-1px)' : 'translateY(0)' }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = '#a3a3a3'; e.currentTarget.style.transform = 'translateY(-0.5px)' } }}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = '#6b6b6b'; e.currentTarget.style.transform = 'translateY(0)' } }}
                >
                  {item.label}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </motion.nav>
  )
}
