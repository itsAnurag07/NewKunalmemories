'use client';

import React, { useRef, useEffect, useState } from 'react';

interface InterstitialStatProps {
  stat: string;
  label: string;
  prompt: string;
  bgFrom?: string;
  bgTo?: string;
}

export default function InterstitialStat({
  stat,
  label,
  prompt,
  bgFrom = '#EDE0C4',
  bgTo = '#E2D4B4',
}: InterstitialStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-28 md:py-40 px-6"
      style={{ background: `linear-gradient(to bottom, ${bgFrom}, ${bgTo})` }}
    >
      {/* Grain */}
      <div className="grain-overlay" />

      {/* Decorative horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />

      {/* Ambient circle */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(160,82,45,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Stat */}
        <div
          className={`transition-all duration-1200 ${visible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-8 blur-sm'}`}
          style={{ transitionDelay: '0.1s', transitionDuration: '1s', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
        >
          <p className="stat-numeral">{stat}</p>
        </div>

        {/* Label */}
        <div
          className={`transition-all duration-1000 mt-4 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.3s', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
        >
          <p className="font-mono-label text-xs tracking-memoir text-rust uppercase">
            {label}
          </p>
        </div>

        {/* Decorative rule */}
        <div
          className={`transition-all duration-700 my-8 flex justify-center ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '0.5s' }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-rust/40 to-transparent" />
        </div>

        {/* Prompt */}
        <div
          className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.6s', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
        >
          <p
            className="font-serif-display font-normal text-ink-mid max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', lineHeight: '1.6', fontStyle: 'italic' }}
          >
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
}