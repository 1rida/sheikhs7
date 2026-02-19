'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const slideData = [
  {
    heading: 'Nourish Your Hair Naturally',
    paragraph: 'Deep scalp nourishment, reduced hair fall, stronger roots, and natural shine.',
  },
  {
    heading: 'Silky Smooth, Frizz-Free Hair',
    paragraph: 'Frizz control, instant shine, lightweight formula, and heat protection.',
  },
  {
    heading: 'Style That Lasts All Day',
    paragraph: 'Long-lasting hold, flexible styling, flyaway control, and non-sticky finish.',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const tl = useRef<ReturnType<typeof gsap.timeline> | null>(null); // Ref for GSAP timeline

  useEffect(() => {
    // Initialize GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    const animateText = () => {
      if (!tl.current) return;

      // Clear previous animations if any
      tl.current.clear();

      // Heading animation (fade + slide-up)
      tl.current.fromTo(headingRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      );

      // Paragraph animation (fade + slight delay)
      tl.current.fromTo(paragraphRef.current,
        { opacity: 0, y: 30, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6' // Start paragraph animation slightly before heading ends
      );

      // Play the animation
      tl.current.play();
    };

    animateText();

    // Auto-slide functionality
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide]); // Re-run effect when currentSlide changes

  return (
    <div className="relative w-full h-[60vh] flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/new-image.jpg"
        alt="Product Hero Background"
        fill
        priority
        className="object-cover"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>

      <div className="relative z-10 p-4 max-w-4xl mx-auto w-full">
        {/* Slide Content */}
        <div className="text-center md:text-left">
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-4">
            {slideData[currentSlide].heading}
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl">
            {slideData[currentSlide].paragraph}
          </p>
        </div>
      </div>
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slideData.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              currentSlide === index ? 'bg-green-500' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;