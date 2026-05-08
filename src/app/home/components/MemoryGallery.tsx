'use client';

import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import imageCompression from 'browser-image-compression';

export default function MemoryGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<{ src: string; caption: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // Fetch images from Supabase Storage
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from('gallery').list();
      if (data && !error) {
        // Filter out empty files or folders (usually .emptyFolderPlaceholder)
        const files = data.filter(file => file.name && file.name !== '.emptyFolderPlaceholder');
        
        const items = files.map(file => {
          const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(file.name);
          return {
            src: publicUrlData.publicUrl,
            caption: 'A precious memory', // We could potentially store captions in a DB table, but for now just a generic caption
          };
        });
        
        // Sort newest first roughly by putting newly fetched ones at top, or just reverse
        setGalleryItems(items.reverse());
      }
    };
    fetchImages();

    return () => observer?.disconnect();
  }, []);

  // Placeholder gallery items — these will be replaced with Supabase data later
  // const galleryItems = [
  //   {
  //     type: 'image' as const,
  //     src: '/assets/rainbow/WE2.png',
  //     caption: 'We had our share of good times together',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/rainbow/Vintage.JPG',
  //     caption: 'Friends and family',
  //     date: '',
  //   },
  //       {
  //     type: 'image' as const,
  //     src: '/assets/rainbow/Superstar.jpeg',
  //     caption: 'Yaar tera Superstar',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/rainbow/CatchMeIfYouCan.jpeg',
  //     caption: 'Catch Me If You Can',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/rainbow/FindMeIfYouCan.jpeg',
  //     caption: 'Find Me If You Can',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/images/kunal2.jpeg',
  //     caption: 'Wandering on the roads',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/images/kunal3.jpeg',
  //     caption: 'Moments that matter',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/images/kunal4.jpeg',
  //     caption: 'Celebrating a life well lived',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/rainbow/WE3.jpeg',
  //     caption: 'Every photo tells a story',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/images/kunal6.jpeg',
  //     caption: 'Together in spirit',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/rainbow/KalHoNaHo.jpeg',
  //     caption: 'Kal Ho Na Ho',
  //     date: '',
  //   },
  //   {
  //     type: 'image' as const,
  //     src: '/assets/rainbow/ShyShyLemmeTry.jpeg',
  //     caption: 'Shy Shy Lemme Try',
  //     date: '',
  //   },
  // ];
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Compress image to max 5MB
      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(file, options);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('gallery')
        .upload(fileName, compressedFile);

      if (error) throw error;

      // Add to gallery instantly
      const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(fileName);
      setGalleryItems(prev => [{ src: publicUrlData.publicUrl, caption: 'A precious memory' }, ...prev]);
      
      alert('Photo uploaded successfully! Thank you for sharing.');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('There was an error uploading your photo. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // reset input
    }
  };

  // Empty placeholder while loading or if no images

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 px-6 md:px-10"
      style={{ background: 'linear-gradient(to bottom, #E2D4B4, #D8C9A8)' }}>

      {/* Grain */}
      {/* <div className="grain-overlay" /> */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(160,82,45,0.05) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="reveal flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-rust/50" />
            <span className="font-mono-label text-xs tracking-memoir text-rust uppercase">
              Memory Gallery
            </span>
          </div>
          <h2
            className="reveal font-serif-display font-normal text-ink leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.01em' }}>
            Photos & Videos of{' '}
            <span className="italic text-rust">Kunal Janjua</span>
          </h2>
          <p className="reveal reveal-delay-2 text-base text-ink-mid leading-relaxed font-sans font-light mt-5 max-w-xl">
            If you have photos or videos of Kunal, please share them here. Every image is a
            precious memory that helps us keep his spirit alive.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`reveal is-visible reveal-delay-${Math.min(index + 1, 5)} photo-card relative group cursor-pointer`}
              style={{ transform: `rotate(${(index % 3 - 1) * 0.8}deg)` }}
              onClick={() => openLightbox(index)}>
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-56 md:h-64 object-cover sepia-img"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-all duration-500 flex items-end">
                <div className="p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                  <p className="text-sm text-cream font-sans font-light">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Tape strip decoration */}
              {index % 2 === 0 && (
                <div className="tape-strip absolute -top-1.5 left-1/4" style={{ transform: `rotate(${(index - 2) * 1.5}deg)` }} />
              )}
            </div>
          ))}
        </div>

        {/* Upload CTA — placeholder, will connect to Supabase later */}
        <div className="reveal reveal-delay-5 mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 service-tile p-8 rounded-sm">
            <div className="w-14 h-14 rounded-full bg-rust/12 border border-rust/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rust">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-serif-display text-lg text-ink font-normal mb-1">
                Share Your Photos & Videos
              </p>
              <p className="text-sm text-ink-mid font-sans font-light max-w-sm">
                If you have any photos or videos of Kunal, we would love for you to share them.
                Every memory matters.
              </p>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
            />
            <button
              className="
                inline-flex items-center gap-2 mt-2
                px-6 py-3 rounded-sm
                bg-rust text-cream
                text-sm font-medium font-sans
                hover:bg-rust-light
                transition-all duration-300
                shadow-warm-md
                group
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Memories'}
              {!isUploading && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-y-[-2px]">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <p className="font-mono-label text-[10px] text-ink-light italic mt-1">
              Max file size: 5MB. Images are compressed automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}>
          <button
            className="absolute top-6 right-6 text-cream/80 hover:text-cream transition-colors"
            onClick={closeLightbox}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" strokeLinecap="round" />
              <path d="M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="max-w-4xl max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-6">
              <p className="text-cream font-sans text-sm font-light">
                {galleryItems[lightboxIndex].caption}
              </p>
            </div>
          </div>

          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
