"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SafeVisionSection = () => {
  const sectionRef = useRef(null);
  const topPageRef = useRef(null);
  const bottomPageRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // First Page Animation: Fade-in + slight scale
      gsap.fromTo(
        topPageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Second Page Animation: Slide up + fade-in
      gsap.fromTo(
        bottomPageRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bottomPageRef.current, // Trigger based on the second page itself
            start: 'top 95%', // Start when the top of the element is 95% from the top of the viewport
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-gray-50" style={{ minHeight: '150vh' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Page (Sticky) */}
        <div
          ref={topPageRef}
          className="w-full h-screen sticky top-0 z-10 p-8 md:p-12 lg:p-16 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center"
          style={{ backgroundColor: '#1A4314' }}
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Our Vision
            </h1>
            <h2 className="mt-4 text-xl sm:text-2xl text-yellow-400 font-medium leading-normal">
              Inspired by Nature. Perfected for Hair Care.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-gray-200 leading-relaxed">
              We create natural, herbal, and science-backed hair care solutions designed to nurture your hair&#39;s long-term health.
            </p>
          </div>
        </div>

        {/* Second Page (Overlapping) */}
        <div
          ref={bottomPageRef}
          className="relative w-full max-w-4xl mx-auto p-8 md:p-12 lg:p-16 rounded-2xl shadow-xl z-20 md:-mt-32" // -mt-32 is -128px
          style={{ backgroundColor: '#F5F5DC' }}
        >
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Naturally Strong, Beautiful Hair
            </h3>
            <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              Our hair oils, serums, and herbal treatments are crafted to strengthen roots, reduce hair fall, and promote healthy growth and natural shine. Safe for daily use and suitable for all hair types.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeVisionSection;
