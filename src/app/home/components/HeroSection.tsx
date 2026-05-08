'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('[data-hero-reveal]');
    if (!els) return;
    els.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(20px)';
      htmlEl.style.filter = 'blur(6px)';
      htmlEl.style.transition = `opacity 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.18 + 0.2}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.18 + 0.2}s, filter 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.18 + 0.2}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          htmlEl.style.opacity = '1';
          htmlEl.style.transform = 'translateY(0)';
          htmlEl.style.filter = 'blur(0)';
        });
      });
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FAF6EE 0%, #F5ECD7 60%, #EDE0C4 100%)' }}>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Ambient warm glow top-right */}
      <div
        className="absolute top-0 right-0 w-[55vw] h-[55vw] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(160,82,45,0.08) 0%, transparent 65%)'
        }} />

      {/* Ambient warm glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vw] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(212,196,168,0.4) 0%, transparent 70%)'
        }} />

      {/* Main content grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-20 pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[75vh]">

          {/* ── Left: Photograph Collage ──────────────── */}
          <div
            data-hero-reveal
            className="relative flex items-center justify-center order-2 lg:order-1">

            {/* Decorative aged-paper border */}
            <div
              className="absolute -inset-3 rounded-sm opacity-30"
              style={{
                background: 'linear-gradient(135deg, var(--tan) 0%, transparent 60%)',
                border: '1px solid rgba(46,42,37,0.12)'
              }} />

            {/* Main photo — memorial candle and frame */}
            <div className="photo-card w-full max-w-[520px] relative">
              <AppImage
                src="/assets/images/kunal.jpeg"
                alt="Portrait of Kunal Janjua"
                className="w-full h-[420px] md:h-[520px] object-cover sepia-img"
                width={520}
                height={520}
                priority />

              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 50%, rgba(46,42,37,0.25) 100%)'
                }} />

              {/* Film-edge bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,196,168,0.35))' }} />
            </div>

            {/* Floating tape strip decoration */}
            <div
              className="tape-strip absolute -top-1 left-1/4"
              style={{ transform: 'rotate(-4deg)' }} />

            <div
              className="tape-strip absolute -bottom-2 right-1/4"
              style={{ transform: 'rotate(2.5deg)', width: '38px' }} />

            {/* Secondary small photo — diya */}
            <div
              className="photo-card w-36 md:w-44 absolute -bottom-4 -right-2 md:right-2"
              style={{ transform: 'rotate(2.8deg)' }}>
              <AppImage
                src="/assets/images/memorial_diya.png"
                alt="Lit diya lamp in memory of Kunal Janjua"
                className="w-full h-28 md:h-32 object-cover sepia-img"
                width={180}
                height={130} />
              <div className="tape-strip absolute -top-1.5 right-4" style={{ transform: 'rotate(3deg)', width: '32px' }} />
            </div>

            {/* Floating date label */}
            <div
              className="absolute bottom-8 left-4 md:left-8 bg-vellum/80 backdrop-blur-sm border border-ink/10 px-3 py-1.5 rounded-sm shadow-warm-sm"
              style={{ transform: 'rotate(-1.5deg)' }}>
              <p className="font-mono-label text-xs text-ink-light tracking-memoir">
                Forever in our hearts
              </p>
            </div>
          </div>

          {/* ── Right: Text ───────────────────────────── */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">

            {/* Eyebrow label */}
            <div data-hero-reveal>
              <span className="font-mono-label text-xs tracking-memoir text-rust uppercase">
                In Loving Memory
              </span>
            </div>

            {/* Main headline */}
            <div data-hero-reveal>
              <h1
                className="font-serif-display font-normal text-ink leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: '1.1', letterSpacing: '-0.01em' }}>
                In the Memory of My Husband{' '}
                <span className="text-rust italic">Kunal Janjua</span>
              </h1>
            </div>

            {/* Body */}
            <div data-hero-reveal>
              <p className="text-base md:text-lg text-ink-mid leading-relaxed font-sans max-w-md font-light">
                As we prepare to leave for India, my heart feels heavy knowing that we may never get the chance to meet some of you again.
              </p>
            </div>

            <div data-hero-reveal>
              <p className="text-base md:text-lg text-ink-mid leading-relaxed font-sans max-w-md font-light">
                If possible, I would truly like to arrange a small farewell gathering for Kunal — a moment where everyone who knew him can share a few words, memories, or a small speech about him.
              </p>
            </div>

            <div data-hero-reveal>
              <p className="text-base md:text-lg text-ink-mid leading-relaxed font-sans max-w-md font-light italic">
                I want to carry those memories with me forever.
              </p>
            </div>

            {/* Divider */}
            <div data-hero-reveal>
              <div className="w-16 h-px bg-rust opacity-40" />
            </div>

            {/* CTA */}
            <div data-hero-reveal className="flex flex-wrap gap-4 items-center">
              <a
                href="#gallery"
                className="
                  inline-flex items-center gap-2
                  px-7 py-3.5 rounded-sm
                  bg-rust text-cream
                  text-sm font-medium font-sans
                  hover:bg-rust-light
                  transition-all duration-300
                  shadow-warm-md
                  group
                ">
                View Gallery
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#tributes"
                className="text-sm font-medium text-ink-mid hover:text-ink transition-colors font-sans italic underline-offset-4 hover:underline">
                Share a Memory
              </a>
            </div>

            {/* Tagline */}
            <div data-hero-reveal className="flex items-center gap-3 pt-2">
              <div className="w-px h-8 bg-rust/30" />
              <p className="text-sm text-ink-mid font-serif-display italic leading-relaxed">
                A proud superstar fighter…<br />
                A story that will never end.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll invitation chevron */}
        <div className="flex justify-center mt-8 md:mt-12">
          <div className="chevron-pulse flex flex-col items-center gap-1 cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <span className="font-mono-label text-xs text-ink-light tracking-memoir uppercase">
              Scroll
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rust">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>);
}