'use client';

import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Tribute {
  id: string;
  name: string;
  relationship: string;
  message: string;
  created_at: string;
}

// Placeholder removed, fetching from Supabase

export default function TributeWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', relationship: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // 1. Fetch initial tributes
    const fetchTributes = async () => {
      const { data, error } = await supabase
        .from('tributes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && !error) {
        setTributes(data as Tribute[]);
      }
    };
    fetchTributes();

    // 2. Subscribe to realtime inserts
    const subscription = supabase
      .channel('public:tributes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tributes' }, payload => {
        setTributes(prev => [payload.new as Tribute, ...prev]);
      })
      .subscribe();

    // 3. Setup intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    sectionRef?.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')?.forEach((el) => observer?.observe(el));
    
    return () => {
      observer?.disconnect();
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    const { error } = await supabase.from('tributes').insert([
      {
        name: form.name,
        relationship: form.relationship || 'Friend',
        message: form.message,
      }
    ]);

    if (!error) {
      setForm({ name: '', relationship: '', message: '' });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
      }, 3000);
    } else {
      console.error('Error submitting tribute:', error);
      alert('There was an error submitting your tribute. Please try again.');
    }
  };

  return (
    <section
      id="tributes"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'linear-gradient(to bottom, #D8C9A8, #CEBFA0)' }}>

      {/* Grain */}
      <div className="grain-overlay" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent" />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-[50vw] h-[50vw] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(160,82,45,0.07) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="reveal flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-rust/50" />
            <span className="font-mono-label text-xs tracking-memoir text-rust uppercase">
              Tributes & Memories
            </span>
          </div>
          <h2
            className="reveal font-serif-display font-normal text-ink leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.01em' }}>
            Words for{' '}
            <span className="italic text-rust">Kunal</span>
          </h2>
          <p className="reveal reveal-delay-2 text-base text-ink-mid leading-relaxed font-sans font-light mt-5 max-w-xl">
            Share your memories, stories, or a few words about Kunal.
            Every tribute helps keep his spirit alive in our hearts.
          </p>
        </div>

        {/* Write tribute button */}
        <div className="reveal reveal-delay-2 mb-12">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Write a Tribute
            </button>
          )}
        </div>

        {/* Tribute form */}
        {showForm && (
          <div className="reveal mb-12 max-w-xl">
            <div className="service-tile p-8 rounded-sm">
              <div className="tape-strip absolute -top-2 left-8" />
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-rust/12 border border-rust/20 flex items-center justify-center mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rust">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-serif-display text-xl text-ink mb-2 font-normal">
                    Thank you for your tribute.
                  </h3>
                  <p className="text-sm text-ink-mid font-sans font-light">
                    Your words will be cherished forever.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-serif-display text-xl text-ink mb-1.5 font-normal">
                      Share your memory of Kunal.
                    </h3>
                    <p className="text-sm text-ink-light font-sans font-light">
                      Your words will become part of his living memorial.
                    </p>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-label text-[10px] text-ink-light tracking-memoir uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name (or 'Anonymous')"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                      placeholder="Friend, Colleague, Neighbor..."
                      value={form.relationship}
                      onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                      className="form-input w-full px-4 py-3 text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-label text-[10px] text-ink-light tracking-memoir uppercase">
                      Your Tribute
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Share a memory, a story, or a few words about Kunal..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="form-input w-full px-4 py-3 text-sm resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="
                        px-6 py-3 rounded-sm
                        bg-rust text-cream
                        text-sm font-medium font-sans
                        hover:bg-rust-light
                        transition-all duration-300
                        shadow-warm-sm
                      ">
                      Submit Tribute
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-sm text-ink-light hover:text-ink transition-colors font-sans">
                      Cancel
                    </button>
                  </div>

                  <p className="font-mono-label text-[10px] text-ink-light italic">
                    Your tribute will be shared immediately with the family.
                  </p>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tributes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tributes.map((tribute, index) => (
            <div
              key={tribute.id}
              className={`reveal reveal-delay-${Math.min(index + 1, 5)} service-tile p-6 rounded-sm flex flex-col justify-between`}
              style={{ transform: `rotate(${(index % 3 - 1) * 0.5}deg)` }}>

              {/* Tape strip */}
              {index % 2 === 0 && (
                <div className="tape-strip absolute -top-1.5 right-6" style={{ transform: `rotate(${index * 1.2}deg)` }} />
              )}

              {/* Quote icon */}
              <div className="mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-rust/30">
                  <path d="M10 11H6C6 7.68629 8.68629 5 12 5V3C7.58172 3 4 6.58172 4 11V19H10V11Z" fill="currentColor" />
                  <path d="M22 11H18C18 7.68629 20.6863 5 24 5V3C19.5817 3 16 6.58172 16 11V19H22V11Z" fill="currentColor" />
                </svg>
              </div>

              {/* Message */}
              <p className="text-sm text-ink-mid leading-relaxed font-sans font-light italic flex-1">
                &ldquo;{tribute.message}&rdquo;
              </p>

              {/* Attribution */}
              <div className="mt-5 pt-4 border-t border-ink/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rust/12 border border-rust/15 flex items-center justify-center shrink-0">
                  <span className="font-mono-label text-[10px] text-rust">
                    {tribute.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink font-sans">
                    {tribute.name}
                  </p>
                  <p className="text-xs text-ink-light font-sans italic">
                    {tribute.relationship}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
