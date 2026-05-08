'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function TestimonialMosaicTwo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    sectionRef?.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'linear-gradient(to bottom, #D8C9A8, #CEBFA0)' }}>

      <div className="grain-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent" />
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-[50vw] h-[50vw] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(160,82,45,0.07) 0%, transparent 65%)' }} />

      {/* Section label */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="reveal flex items-center gap-4 justify-end">
          <span className="font-mono-label text-xs tracking-memoir text-rust uppercase">
            A Farewell Celebration
          </span>
          <div className="w-8 h-px bg-rust/50" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left: Quote fragments ────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-10 order-2 lg:order-1">

            {/* Opening quote */}
            <div className="reveal">
              <blockquote
                className="font-serif-display font-normal text-ink leading-relaxed"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', lineHeight: '1.45' }}>

                "This farewell is not just goodbye — it is a celebration of his life, his spirit, and the beautiful impact he left on all of us."
              </blockquote>
            </div>

            {/* Attribution */}
            <div className="reveal reveal-delay-1 flex items-center gap-4">
              <div className="w-10 h-px bg-rust/40" />
              <div>
                <p className="text-sm font-medium text-ink font-sans">
                  From the Heart
                </p>
                <p className="text-xs text-ink-light font-sans italic">
                  A call to remember, honor, and celebrate Kunal Janjua
                </p>
              </div>
            </div>

            {/* Second fragment */}
            <div className="reveal reveal-delay-2 pull-quote">
              <p className="text-base text-ink-mid leading-relaxed font-sans font-light italic">
                "Please come, share your words for Kunal, and help me keep his memories
                alive forever in my heart. Every story, every laugh, every emotion connected
                to him will remain a part of my life always."
              </p>
            </div>

            {/* Third fragment */}
            <div className="reveal reveal-delay-3">
              <p className="text-sm text-ink-mid leading-relaxed font-sans max-w-lg">
                This memorial is not just a page — it is a living tribute. A place where
                everyone who knew Kunal can share their words, their memories, and their love.
                His story will continue through all of us who carry his memory forward.
              </p>
            </div>

            {/* Candle ceremony info card */}
            <div
              className="reveal reveal-delay-4 service-tile p-5 rounded-sm max-w-sm"
              style={{ transform: 'rotate(-0.5deg)' }}>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-rust/15 border border-rust/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rust">
                    <path d="M12 2C8 7 6 10 6 14a6 6 0 1 0 12 0c0-4-2-7-6-12z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-ink font-sans">Farewell Gathering</p>
                  <p className="font-mono-label text-[10px] text-ink-light">Celebrating his life & legacy</p>
                </div>
              </div>
              {/* Invitation details */}
              <div className="space-y-2 mt-3">
                <p className="text-xs text-ink-mid font-sans leading-relaxed">
                  A moment where everyone who knew Kunal can share a few words, memories, or a small speech about him.
                </p>
                <p className="text-xs text-rust font-sans italic">
                  Every memory shared keeps his spirit alive.
                </p>
              </div>
            </div>

            {/* Share tribute link */}
            <div className="reveal reveal-delay-5">
              <a href="#tributes" className="rust-link text-sm font-medium font-sans flex items-center gap-2 group">
                Write your tribute for Kunal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rust transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: Photo collage ─────────────────── */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">

            {/* Primary photo */}
            <div
              className="reveal-right photo-card"
              style={{ transform: 'rotate(1.4deg)' }}>

              <AppImage
                src="/assets/images/kunal.jpeg"
                alt="Portrait of Kunal Janjua"
                className="w-full h-72 md:h-80 object-cover sepia-img"
                width={500}
                height={320} />

              <div className="tape-strip absolute -top-2 right-1/3" style={{ transform: 'rotate(2deg)' }} />
              <div className="absolute bottom-3 right-3 bg-vellum/85 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                <p className="font-mono-label text-[10px] text-ink-light tracking-wide">
                  In loving memory · Kunal Janjua
                </p>
              </div>
            </div>

            {/* Secondary photo */}
            <div
              className="reveal-right reveal-delay-2 photo-card w-36 md:w-44 absolute -bottom-4 -left-3 md:-left-6"
              style={{ transform: 'rotate(-2.5deg)' }}>

              <AppImage
                src="/assets/images/memorial_collage.png"
                alt="Photographs and memories of Kunal Janjua"
                className="w-full h-28 object-cover sepia-img"
                width={180}
                height={112} />

              <div className="tape-strip absolute -top-1.5 left-4" style={{ transform: 'rotate(-2deg)', width: '30px' }} />
            </div>

            {/* Qualities card */}
            <div
              className="reveal reveal-delay-4 mt-10 service-tile p-4 rounded-sm max-w-xs ml-auto"
              style={{ transform: 'rotate(-0.8deg)' }}>

              <p className="font-mono-label text-[10px] text-rust tracking-memoir uppercase mb-3">
                What Made Kunal Special
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Courage in his soul',
                  'Strength in his heart',
                  'Kindness in every action',
                  'A smile that healed']?.
                  map((item) =>
                    <div key={item} className="flex items-start gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-rust mt-1.5 shrink-0" />
                      <span className="text-[11px] text-ink-mid font-sans leading-relaxed">{item}</span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}