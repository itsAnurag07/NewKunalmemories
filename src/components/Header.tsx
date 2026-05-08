'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                ? 'bg-vellum/90 backdrop-blur-md border-b border-ink/8 shadow-warm-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <a href="/home" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-sm bg-rust/15 border border-rust/20 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rust">
                                <path d="M12 2l2.09 6.26L20 9.27l-5 3.9L16.18 20 12 16.77 7.82 20 9 13.17l-5-3.9 5.91-1.01z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="font-serif-display text-lg text-ink font-normal tracking-tight">
                            Kunal Janjua
                        </span>
                    </a>
                </div>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">

                    {[
                        { label: 'Memorial', href: '#' },
                        { label: 'Gallery', href: '#gallery' },
                        { label: ' Tributes', href: '#tributes' },
                    ]?.map((item) => (
                        <a
                            key={item?.label}
                            href={item?.href}
                            className="text-sm font-medium text-ink-mid hover:text-ink transition-colors duration-300 font-sans tracking-wide"
                        >
                            {item?.label}
                        </a>
                    ))}

                    <a
                        href="https://milaap.org/fundraisers/support-shivani-janjua?utm_source=shorturl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            text-sm font-medium px-5 py-2.5 rounded-sm
                            bg-rose-700 text-cream
                            hover:bg-rose-600
                            transition-all duration-300
                            shadow-sm
                            font-sans
                        "
                    >
                        Support the Family
                    </a>
                </nav>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-ink p-1"
                    aria-label="Toggle menu"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {menuOpen ? (
                            <>
                                <path d="M18 6 6 18" strokeLinecap="round" />
                                <path d="M6 6l12 12" strokeLinecap="round" />
                            </>
                        ) : (
                            <>
                                <path d="M4 6h16" strokeLinecap="round" />
                                <path d="M4 12h16" strokeLinecap="round" />
                                <path d="M4 18h10" strokeLinecap="round" />
                            </>
                        )}
                    </svg>
                </button>
            </div>
            {/* Mobile menu */}
            <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-vellum/95 backdrop-blur-md border-t border-ink/8 px-6 pb-6 pt-4 flex flex-col gap-4">
                    {[
                        { label: 'Memorial', href: '#' },
                        { label: 'Gallery', href: '#gallery' },
                        { label: 'Tributes', href: '#tributes' },
                    ]?.map((item) => (
                        <a
                            key={item?.label}
                            href={item?.href}
                            onClick={() => setMenuOpen(false)}
                            className="text-base font-medium text-ink-mid hover:text-ink transition-colors font-sans"
                        >
                            {item?.label}
                        </a>
                    ))}
                    <a
                                                href="https://milaap.org/fundraisers/support-shivani-janjua?utm_source=shorturl"
                        target="_blank"
                        rel="noopener noreferrer"   
                        onClick={() => setMenuOpen(false)}
                        className="text-sm font-medium px-5 py-3 rounded-sm bg-rose-700 text-cream text-center hover:bg-rose-600 transition-all duration-300 font-sans"
                    >
                        Support the Family
                    </a>
                </div>
            </div>
        </header>
    );
}