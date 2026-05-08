import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import InterstitialStat from './components/InterstitialStat';
import TestimonialMosaicOne from './components/TestimonialMosaicOne';
import TestimonialMosaicTwo from './components/TestimonialMosaicTwo';
import ServicesBento from './components/ServicesBento';
import MemoryGallery from './components/MemoryGallery';
import TributeWall from './components/TributeWall';
import CTASection from './components/CTASection';

export default function HomePage() {
    return (
        <div className="page-depth-gradient min-h-screen">
            {/* Fixed grain overlay rendered once */}
            <div className="grain-overlay" />

            <Header />

            <main>
                {/* 1. Hero — Memorial tribute to Kunal Janjua with photos */}
                <HeroSection />

                {/* 2. Interstitial breath — a reflective pause */}
                <InterstitialStat
                    stat="∞"
                    label="memories that live on"
                    prompt="Some people leave footprints so deep that no amount of time can wash them away. Kunal Janjua was one of those people."
                    bgFrom="#EDE0C4"
                    bgTo="#E2D4B4"
                />

                {/* 3. Testimonial Mosaic I — His Spirit Lives On */}
                <TestimonialMosaicOne />

                {/* 4. Interstitial breath — second pause */}
                <InterstitialStat
                    stat="Forever"
                    label="in our hearts"
                    prompt="A proud superstar fighter whose courage, strength, and kindness touched everyone around him. His story will never end."
                    bgFrom="#D8C9A8"
                    bgTo="#CEBFA0"
                />

                {/* 5. Testimonial Mosaic II — A Farewell Celebration */}
                <TestimonialMosaicTwo />

                {/* 6. Who He Was — Qualities bento */}
                <ServicesBento />

                {/* 7. Memory Gallery — Photos & Videos */}
                <MemoryGallery />

                {/* 8. Tribute Wall — Comments and memories */}
                <TributeWall />

                {/* 9. CTA — Leave a message */}
                <CTASection />
            </main>

            <Footer />
        </div>
    );
}