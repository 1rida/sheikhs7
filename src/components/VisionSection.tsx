"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisionSection = () => {
  const sectionRef = useRef(null);
  const topPageRef = useRef(null);
  const bottomPageRef = useRef(null);
  const topPageContentRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // Animate the top page container
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

      // Fade out the top page's content as it's about to be covered
      gsap.to(topPageContentRef.current, {
        opacity: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=300', // Adjust this value to control fade speed
          scrub: true,
        },
      });

      // Animate the bottom page
      gsap.fromTo(
        bottomPageRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 60%', 
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-gray-50" style={{ minHeight: '180vh' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={topPageRef}
          className="w-full h-screen sticky top-0 z-10 p-8 md:p-12 lg:p-16 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center"
          style={{ backgroundColor: '#1A4314' }}
        >
          <div ref={topPageContentRef} className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white">
              Our Vision
            </h1>
            <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl text-yellow-400 font-medium">
              Inspired by Nature. Perfected for Hair Care.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-gray-200 leading-relaxed">
              Our vision is to fuse the timeless wisdom of nature with modern science, creating pure, effective, and science-backed hair care solutions. We believe in harnessing the power of herbal ingredients to deliver visible, long-lasting results.
            </p>
          </div>
        </div>

        <div
          ref={bottomPageRef}
          className="relative w-full max-w-4xl mx-auto p-8 md:p-12 lg:p-16 rounded-2xl shadow-xl z-20 md:-mt-32"
          style={{ backgroundColor: '#F5F5DC' }}
        >
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
              Naturally Strong, Beautiful Hair
            </h3>
            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed">
              Experience the transformative power of our hair oils, serums, and herbal treatments. Each product is crafted to strengthen roots, reduce hair fall, and promote healthy, vibrant growth. Safe for daily use and suitable for all hair types, our formulas are your path to naturally beautiful hair.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionSection;
