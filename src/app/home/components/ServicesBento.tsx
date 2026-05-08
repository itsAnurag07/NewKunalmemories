'use client';

import React, { useEffect, useRef } from 'react';

const qualities = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    label: 'Kindness That Touched All',
    detail: 'Kunal had an extraordinary ability to make everyone around him feel valued, safe, and loved. His kindness was not an act — it was who he was at his core.',
    stat: 'Loved by everyone',
    accent: 'col-span-1 row-span-2',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.09 6.26L20 9.27l-5 3.9L16.18 20 12 16.77 7.82 20 9 13.17l-5-3.9 5.91-1.01z" />
      </svg>
    ),
    label: 'A Proud Superstar Fighter',
    detail: 'He fought every battle in life with dignity and never stopped inspiring the people who loved him. Even in the hardest moments, his spirit never wavered.',
    stat: 'An inspiration to all',
    accent: 'col-span-1',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    label: 'Strength That Carried Others',
    detail: 'Even in difficult moments, Kunal carried a smile that gave strength to others. His presence was a shelter — a safe harbor in any storm.',
    stat: 'Strength in his heart',
    accent: 'col-span-1',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'A Legacy of Love',
    detail: 'His memory lives on through every person he touched. This memorial is a living tribute — a place where his story continues through all of us.',
    stat: 'Forever remembered',
    accent: 'col-span-2',
  },
];

export default function ServicesBento() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.08 }
    );
    sectionRef?.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'linear-gradient(to bottom, #CEBFA0, #C8B898)' }}
    >
      <div className="grain-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent" />
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(160,82,45,0.05) 0%, transparent 65%)' }}
      />
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="reveal flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-rust/50" />
            <span className="font-mono-label text-xs tracking-memoir text-rust uppercase">
              Who He Was
            </span>
          </div>
          <h2
            className="reveal font-serif-display font-normal text-ink leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.01em' }}
          >
            The qualities that made Kunal{' '}
            <span className="italic text-rust">unforgettable.</span>
          </h2>
          <p className="reveal reveal-delay-2 text-base text-ink-mid leading-relaxed font-sans font-light mt-5 max-w-xl">
            Kunal was a man whose courage, strength, and kindness left an indelible mark
            on everyone who crossed his path. These are the qualities we remember and celebrate.
          </p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

          {/* Tile 0 — Kindness (tall, spans 2 rows on lg) */}
          <div
            className={`reveal reveal-delay-1 service-tile p-7 flex flex-col justify-between lg:row-span-2`}
            style={{ minHeight: '320px' }}
          >
            <div>
              <div className="w-10 h-10 rounded-sm bg-rust/12 border border-rust/15 flex items-center justify-center mb-6 text-rust">
                {qualities?.[0]?.icon}
              </div>
              <h3 className="font-serif-display text-xl text-ink mb-3 font-normal">
                {qualities?.[0]?.label}
              </h3>
              <p className="text-sm text-ink-mid leading-relaxed font-sans font-light">
                {qualities?.[0]?.detail}
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-ink/10">
              <p className="font-mono-label text-xs text-rust">
                {qualities?.[0]?.stat}
              </p>
            </div>
          </div>

          {/* Tile 1 — Superstar Fighter */}
          <div className="reveal reveal-delay-2 service-tile p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-rust/12 border border-rust/15 flex items-center justify-center mb-5 text-rust">
                {qualities?.[1]?.icon}
              </div>
              <h3 className="font-serif-display text-xl text-ink mb-3 font-normal">
                {qualities?.[1]?.label}
              </h3>
              <p className="text-sm text-ink-mid leading-relaxed font-sans font-light">
                {qualities?.[1]?.detail}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-ink/10">
              <p className="font-mono-label text-xs text-rust italic">
                {qualities?.[1]?.stat}
              </p>
            </div>
          </div>

          {/* Tile 2 — Strength */}
          <div className="reveal reveal-delay-3 service-tile p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-sm bg-rust/12 border border-rust/15 flex items-center justify-center mb-5 text-rust">
                {qualities?.[2]?.icon}
              </div>
              <h3 className="font-serif-display text-xl text-ink mb-3 font-normal">
                {qualities?.[2]?.label}
              </h3>
              <p className="text-sm text-ink-mid leading-relaxed font-sans font-light">
                {qualities?.[2]?.detail}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-ink/10">
              <p className="font-mono-label text-xs text-rust italic">
                {qualities?.[2]?.stat}
              </p>
            </div>
          </div>

          {/* Tile 3 — Legacy (wide, spans 2 cols) */}
          <div className="reveal reveal-delay-4 service-tile p-7 md:col-span-2 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-10 h-10 rounded-sm bg-rust/12 border border-rust/15 flex items-center justify-center text-rust shrink-0">
              {qualities?.[3]?.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-serif-display text-xl text-ink mb-3 font-normal">
                {qualities?.[3]?.label}
              </h3>
              <p className="text-sm text-ink-mid leading-relaxed font-sans font-light max-w-2xl">
                {qualities?.[3]?.detail}
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-end justify-between self-stretch">
              <p className="font-mono-label text-xs text-rust italic text-right">
                {qualities?.[3]?.stat}
              </p>
              <a
                href="#tributes"
                className="
                  inline-flex items-center gap-2 mt-4
                  px-5 py-2.5 rounded-sm
                  bg-rust text-cream
                  text-sm font-medium font-sans
                  hover:bg-rust-light
                  transition-all duration-300
                  shadow-warm-sm
                  group whitespace-nowrap
                "
              >
                Share your memory
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Values bar */}
        <div className="reveal reveal-delay-5 mt-16 pt-10 border-t border-ink/10 flex flex-wrap gap-8 md:gap-12 items-center justify-center md:justify-start">
          {[
            { label: 'Courage in every step' },
            { label: 'Love in every word' },
            { label: 'Dignity in every battle' },
            { label: 'Forever in our hearts' },
          ]?.map((t) => (
            <div key={t?.label} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rust shrink-0">
                <path d="M12 2l2.09 6.26L20 9.27l-5 3.9L16.18 20 12 16.77 7.82 20 9 13.17l-5-3.9 5.91-1.01z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-ink-mid font-sans">{t?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}