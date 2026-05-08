import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t border-ink/10 bg-tan/40 py-16 px-6 md:px-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                {/* Left: Logo + tagline */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-sm bg-rust/15 border border-rust/20 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rust">
                                <path d="M12 2l2.09 6.26L20 9.27l-5 3.9L16.18 20 12 16.77 7.82 20 9 13.17l-5-3.9 5.91-1.01z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="font-serif-display text-base text-ink font-normal">
                            In Memory of Kunal Janjua
                        </span>
                    </div>
                    <p className="text-sm text-ink-light font-sans italic max-w-xs leading-relaxed">
                        A proud superstar fighter — forever in our hearts.
                    </p>
                </div>

                {/* Right: Links */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
                    <a href="#" className="text-sm font-medium text-ink-light hover:text-ink transition-colors font-sans">Memorial</a>
                    <a href="#gallery" className="text-sm font-medium text-ink-light hover:text-ink transition-colors font-sans">Gallery</a>
                    <a href="#tributes" className="text-sm font-medium text-ink-light hover:text-ink transition-colors font-sans">Tributes</a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-ink/8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <p className="text-xs text-ink-light font-mono-label tracking-wide">
                    © 2026 — In loving memory of Kunal Janjua
                </p>
                <p className="text-xs text-ink-light font-mono-label italic">
                    Built with love, for those who carry his memories.
                </p>
            </div>
        </footer>
    );
}