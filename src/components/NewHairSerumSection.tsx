'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NewHairSerumSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100', // Start animation when top of section is 100px above center of viewport
          toggleActions: 'play none none reverse', // Play on scroll down, reverse on scroll up
          scrub: 1, // Smoothly link animation to scroll position
        },
      });

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' },
        0
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' },
        0.3 // Stagger slightly after image
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' },
        0.5 // Stagger slightly after heading
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative flex flex-col md:flex-row items-center justify-center p-8 bg-gray-50  min-h-[600px] overflow-hidden">
      <div ref={imageRef} className="md:w-1/2 p-4 flex justify-center z-10">
        <Image
          src="/new-hair-serum.png"
          alt="New Hair Serum"
          width={400}
          height={400}
          className="rounded-xl shadow-2xl border-4 border-white"
          priority
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left z-10 mt-8 md:mt-0 bg-white/70 backdrop-blur-sm rounded-lg shadow-xl p-8">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          <span className="text-green-600">Sheikh&#39;s7</span> <span className="text-black">Hair Serum</span>
        </h2>
        <p ref={paragraphRef} className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
          Discover the secret to stronger, shinier, and healthier hair with our revolutionary new hair serum.
          Formulated with a blend of natural oils and potent nutrients, it revitalizes your scalp and transforms your locks from root to tip.
          Experience less breakage, more volume, and an undeniable radiance.
        </p>
      </div>
    </section>
  );
};

export default NewHairSerumSection;
