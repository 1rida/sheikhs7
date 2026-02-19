'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const HairSerumSection: React.FC = () => {
  // Refs for GSAP animation targets
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    // Ensure all refs are current before animating
    if (!imageRef.current || !headingRef.current || !paragraphRef.current) return;

    // Create a context for the animations
    const ctx = gsap.context(() => {
      // GSAP Timeline for sequenced animations with smoother ease
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Image slides in from left on load
      tl.fromTo(
        imageRef.current,
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.5 }
      );

      // Heading fades in with slight upward motion and scale
      tl.fromTo(
        headingRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2 },
        "<0.5" // Start with an overlap for a smoother transition
      );

      // Paragraph fades in after heading
      tl.fromTo(
        paragraphRef.current,
        { y: 20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
        "<0.3" // Overlap slightly with the heading animation
      );
    });

    // Cleanup function to revert animations
    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen md:min-h-[100svh] bg-white overflow-hidden flex items-center justify-center p-6 sm:p-10 md:p-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 w-full max-w-screen-xl mx-auto">
        {/* Left Side: Image */}
        <div ref={imageRef} className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-full h-[400px] sm:h-[450px] md:h-[55vh] lg:h-[75vh] rounded-3xl overflow-hidden shadow-2xl bg-gray-50/50">
            <Image
              src="/hairserum.jpg"
              alt="Hair Serum Product"
              layout="fill"
              objectFit="contain"
              priority
              className="w-full h-full transform hover:scale-105 transition-transform duration-700 p-4"
            />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="max-w-lg text-center md:text-left">
            {/* Heading */}
            <h1 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
              Discover the Transformative Power of Our Hair Serum
            </h1>

            {/* Paragraph Description */}
            <p ref={paragraphRef} className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Our exquisite hair serum is meticulously crafted with <strong>organic ingredients</strong>,
              designed to significantly <strong>improve overall hair health</strong>. Experience
              unparalleled shine, remarkable strength, and visibly <strong>reduces hair fall</strong>.
              It deeply <strong>nourishes the scalp</strong>, promoting a healthy environment for vibrant hair growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairSerumSection;