'use client';

import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', relationship: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    const { error } = await supabase.from('family_messages').insert([
      {
        name: form.name,
        email: form.email,
        relationship: form.relationship || 'Friend',
        message: form.message,
      }
    ]);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error('Error submitting tribute:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  return (
    <section
      id="preserve"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-40 px-6 md:px-10"
      style={{ background: 'linear-gradient(to bottom, #C8B898, #BFAD8A)' }}
    >
      <div className="grain-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />

      {/* Ambient warm glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(160,82,45,0.08) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Context ──────── */}
          <div className="flex flex-col gap-8">

            <div className="reveal flex items-center gap-4">
              <div className="w-8 h-px bg-rust/50" />
              <span className="font-mono-label text-xs tracking-memoir text-rust uppercase">
                Keep His Memory Alive
              </span>
            </div>

            <div className="reveal reveal-delay-1">
              <h2
                className="font-serif-display font-normal text-ink leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.2' }}
              >
                Share your words for Kunal —{' '}
                <span className="italic text-rust">every memory matters.</span>
              </h2>
            </div>

            <div className="reveal reveal-delay-2">
              <p className="text-base text-ink-mid leading-relaxed font-sans font-light max-w-md">
                Whether it's a story, a favorite memory, a few words of love, or simply
                a message to his family — your tribute will help keep Kunal's spirit
                alive in the hearts of those who loved him most.
              </p>
            </div>

            {/* Farewell info card */}
            <div
              className="reveal reveal-delay-3 relative"
              style={{ transform: 'rotate(-0.8deg)' }}
            >
              <div
                className="bg-cream/70 backdrop-blur-sm border border-ink/12 rounded-sm p-6 shadow-warm-md max-w-sm"
              >
                <div className="tape-strip absolute -top-2 left-8" />
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-12 bg-rust/15 border border-rust/20 rounded-sm flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rust">
                      <path d="M12 2C8 7 6 10 6 14a6 6 0 1 0 12 0c0-4-2-7-6-12z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink font-sans leading-snug">
                      Farewell Gathering for Kunal
                    </p>
                    <p className="font-mono-label text-[10px] text-ink-light mt-1">
                      A celebration of his life & spirit
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    'Share your favorite memory of Kunal',
                    'Say a few words or give a small speech',
                    'Bring a photo or memento to share',
                    'Light a candle in his honor',
                    'Help his family carry his memories forward',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rust shrink-0 mt-0.5">
                        <path d="M12 2l2.09 6.26L20 9.27l-5 3.9L16.18 20 12 16.77 7.82 20 9 13.17l-5-3.9 5.91-1.01z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-xs font-sans text-ink-mid">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="reveal reveal-delay-4">
              <p className="text-xs text-ink-light font-sans italic">
                "A story of a proud superstar fighter… A story that will never end."
              </p>
            </div>
          </div>

          {/* ── Right: Form ─────────────────────────── */}
          <div className="flex flex-col gap-6">
            <div
              className="reveal reveal-delay-2 relative bg-cream/55 backdrop-blur-sm border border-ink/12 rounded-sm p-8 shadow-warm-md"
            >
              <div className="tape-strip absolute -top-2 right-10" style={{ transform: 'rotate(3deg)' }} />

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-rust/12 border border-rust/20 flex items-center justify-center mx-auto mb-5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rust">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-serif-display text-xl text-ink mb-3 font-normal">
                    Thank you for your words.
                  </h3>
                  <p className="text-sm text-ink-mid font-sans font-light leading-relaxed">
                    Your tribute for Kunal will be cherished by his family forever.
                  </p>
                  <p className="font-mono-label text-xs text-ink-light mt-4 italic">
                    {form.name ? `Thank you, ${form.name}. Your love means everything.` : "Every word keeps his memory alive."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-serif-display text-xl text-ink mb-1.5 font-normal">
                      Leave a message for Kunal's family.
                    </h3>
                    <p className="text-sm text-ink-light font-sans font-light">
                      Your words will become part of his living memorial.
                    </p>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-label text-[10px] text-ink-light tracking-memoir uppercase">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="form-input w-full px-4 py-3 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-label text-[10px] text-ink-light tracking-memoir uppercase">
                      Email address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="form-input w-full px-4 py-3 text-sm"
                    />
                  </div>

                  {/* Relationship */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-label text-[10px] text-ink-light tracking-memoir uppercase">
                      Your Relationship to Kunal
                    </label>
                    <input
                      type="text"
                      placeholder="Friend, Colleague, Family..."
                      value={form.relationship}
                      onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                      className="form-input w-full px-4 py-3 text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-label text-[10px] text-ink-light tracking-memoir uppercase">
                      Your message for Kunal & his family
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share a memory, a story, or a few words of love..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="form-input w-full px-4 py-3 text-sm resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="
                      w-full mt-2
                      px-6 py-4 rounded-sm
                      bg-rust text-cream
                      text-sm font-medium font-sans
                      hover:bg-rust-light
                      transition-all duration-300
                      shadow-warm-md
                      flex items-center justify-center gap-2
                      group
                    "
                  >
                    Send Your Message
                    <svg
                      width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <p className="text-[11px] text-ink-light font-sans text-center italic leading-relaxed">
                    Every word shared keeps Kunal's memory alive.
                    His story will never end.
                  </p>
                </form>
              )}
            </div>

            {/* Secondary path */}
            <div className="reveal reveal-delay-4 text-center">
              <p className="text-sm text-ink-light font-sans">
                Want to share photos or videos?{' '}
                <a href="#gallery" className="rust-link font-medium">
                  Visit the gallery →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}