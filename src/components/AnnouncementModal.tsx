"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const AnnouncementModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem('announcementShown');
    if (!hasBeenShown) {
      setIsOpen(true);
      sessionStorage.setItem('announcementShown', 'true');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const modalEl = modalRef.current;
      const overlayEl = overlayRef.current;
      if (modalEl && overlayEl) {
        gsap.fromTo(
          overlayEl,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
        gsap.fromTo(
          modalEl,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
        );
        gsap.fromTo(
          modalEl.querySelectorAll('.content-anim'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5,
          }
        );
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    const modalEl = modalRef.current;
    const overlayEl = overlayRef.current;
    if (modalEl && overlayEl) {
      gsap.to([modalEl, overlayEl], {
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => setIsOpen(false),
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Column: Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
          <h2 className="content-anim text-3xl md:text-4xl font-bold text-white mb-3">
            Unlock Natural Radiance!
          </h2>
          <p className="content-anim text-lg text-gray-300 mb-6">
            For a limited time, explore our premium herbal hair solutions.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="relative h-64 md:h-auto order-1 md:order-2">
          <Image
            src="/banner_image_2.jpg" 
            alt="Herbal Products"
            layout="fill"
            objectFit="cover"
            className="opacity-80"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-l" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-60 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AnnouncementModal;
