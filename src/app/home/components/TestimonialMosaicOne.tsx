'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function TestimonialMosaicOne() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    const reveals = sectionRef?.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    reveals?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'linear-gradient(to bottom, #E2D4B4, #D8C9A8)' }}>

      {/* Grain */}
      <div className="grain-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent" />
      {/* Section label */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="reveal flex items-center gap-4">
          <div className="w-8 h-px bg-rust/50" />
          <span className="font-mono-label text-xs tracking-memoir text-rust uppercase">
            His Spirit Lives On
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left column: Photo collage ──────────── */}
          <div className="lg:col-span-5 relative">

            {/* Primary photograph */}
            <div
              className="reveal-left photo-card relative"
              style={{ transform: 'rotate(-1.2deg)' }}>

              <AppImage
                src="/assets/images/memorial_collage.png"
                alt="Memorial tribute arrangement with photographs and flowers for Kunal Janjua"
                className="w-full h-72 md:h-80 object-cover sepia-img"
                width={500}
                height={320} />

              {/* Tape strip on photo */}
              <div className="tape-strip absolute -top-2 left-1/3" />
              {/* Caption label */}
              <div className="absolute bottom-3 left-3 bg-vellum/85 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                <p className="font-mono-label text-[10px] text-ink-light tracking-wide">
                  Memories of Kunal
                </p>
              </div>
            </div>

            {/* Secondary small photo, offset */}
            <div
              className="reveal-left reveal-delay-2 photo-card w-40 md:w-48 absolute -bottom-6 -right-4 md:right-0"
              style={{ transform: 'rotate(2.8deg)' }}>

              <AppImage
                src="/assets/images/memorial_diya.png"
                alt="Diya lamp lit in remembrance of Kunal Janjua"
                className="w-full h-28 md:h-32 object-cover sepia-img"
                width={200}
                height={130} />

              <div className="tape-strip absolute -top-1.5 right-4" style={{ transform: 'rotate(3deg)', width: '32px' }} />
            </div>

            {/* Life timeline card */}
            <div
              className="reveal reveal-delay-3 mt-10 service-tile p-5 rounded-sm max-w-xs"
              style={{ transform: 'rotate(0.6deg)' }}>

              <p className="font-mono-label text-[10px] text-rust tracking-memoir uppercase mb-3">
                His Journey
              </p>
              <div className="space-y-2.5">
                {[
                  { year: '1993', note: 'Arrived with courage already in his soul' },
                  { year: '2022', note: 'Found a wonderful partner for life' },
                  { year: '2023', note: 'Welcomed a joyful son into the world' },
                  { year: '∞', note: 'Bid adieu — forever alive in our hearts' }
                ]?.
                  map((item) =>
                    <div key={item?.note} className="flex items-start gap-3">
                      <span className="font-mono-label text-xs text-rust shrink-0 w-10">{item?.year}</span>
                      <div className="w-px h-4 bg-ink/15 shrink-0 mt-0.5" />
                      <span className="text-xs text-ink-mid font-sans leading-relaxed">{item?.note}</span>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* ── Right column: Quote fragments ───────── */}
          <div className="lg:col-span-7 flex flex-col gap-10 lg:pt-8">

            {/* Large opening quote */}
            <div className="reveal reveal-delay-1">
              <blockquote
                className="font-serif-display font-normal text-ink leading-relaxed"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', lineHeight: '1.4' }}>

                "Every story, every laugh, every emotion connected to him will remain a part of my life always."
              </blockquote>
            </div>

            {/* Attribution */}
            <div className="reveal reveal-delay-2 flex items-center gap-4">
              <div className="w-10 h-px bg-rust/40" />
              <div>
                <p className="text-sm font-medium text-ink font-sans">
                  His Wife
                </p>
                <p className="text-xs text-ink-light font-sans italic">
                  In loving memory of Kunal Janjua
                </p>
              </div>
            </div>

            {/* Pull quote fragments */}
            <div className="reveal reveal-delay-3 pull-quote">
              <p className="text-base text-ink-mid leading-relaxed font-sans font-light italic">
                "Kunal was not just a person — he was a proud superstar fighter.
                A man with courage in his soul, strength in his heart, and kindness
                that touched everyone around him. He fought every battle in life with
                dignity and never stopped inspiring the people who loved him."
              </p>
            </div>

            <div className="reveal reveal-delay-4">
              <p className="text-sm text-ink-mid leading-relaxed font-sans max-w-lg">
                Even in difficult moments, he carried a smile that gave strength to others.
                His presence made people feel safe, valued, and loved.
                And though life is taking us far away now, his memories will never fade.
              </p>
            </div>

            {/* Stat row */}
            <div className="reveal reveal-delay-5 flex flex-wrap gap-8 pt-4 border-t border-ink/10">
              {[
                { num: '∞', unit: 'memories', label: 'that will live forever' },
                { num: '1', unit: 'fighter', label: 'a proud superstar' },
                { num: '∞', unit: 'hearts', label: 'touched by his kindness' }]?.
                map((s) =>
                  <div key={s?.label} className="border-l border-rust/30 pl-4">
                    <p className="font-serif-display text-2xl text-ink leading-none">
                      {s?.num}
                      <span className="text-sm text-ink-light font-sans font-normal ml-1">{s?.unit}</span>
                    </p>
                    <p className="text-xs text-ink-light font-sans mt-1">{s?.label}</p>
                  </div>
                )}
            </div>

            {/* Read more link */}
            <div className="reveal reveal-delay-5">
              <a
                href="#gallery"
                className="rust-link text-sm font-medium font-sans flex items-center gap-2 group">

                View his memory gallery
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rust transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);
}