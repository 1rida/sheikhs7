'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null); // Ref for the product bottles image container

  useEffect(() => {
    if (sectionRef.current && imageRef.current) {
      gsap.to(imageRef.current, {
        rotationY: 360, // Full flip
        duration: 3,
        ease: "none", // Linear ease for continuous rotation with scrub
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Start when the top of the section hits the top of the viewport
          end: "bottom top", // End when the bottom of the section hits the top of the viewport
          scrub: true, // Link animation to scroll position
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] bg-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero_right_image.jpg" // Placeholder for soft background image
          alt="Hair care background"
          layout="fill"
          objectFit="cover"
          quality={80} // Adjusted quality for performance
          className="z-0 opacity-90" // Make background image subtle
        />
        <div className="absolute inset-0 bg-white/50" /> {/* Softer overlay */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-center min-h-[100svh] gap-8 md:gap-12 pt-20 sm:pt-24 md:pt-0">
        {/* Left Column - Text and Buttons */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight mb-4 drop-shadow-sm">
            Nourish Your Hair Naturally
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 drop-shadow-sm">
            Premium Hair Oil, Spray & Serum by Sheikh,s7 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/products">
              <button className="px-8 py-3 border-2 border-black text-black font-semibold rounded-full shadow-lg hover:bg-black hover:text-white transform hover:scale-105 transition duration-300">
                View Products
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column - Product Bottles Image */}
        <div ref={imageRef} className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-1/2 flex justify-center items-center z-20"> {/* Added z-20 */}
          <div className="relative w-full aspect-square md:h-[60vh] lg:h-[80vh]">
            <Image
              src="/hero_right_image.jpg" // Placeholder for product bottles
              alt="Product bottles"
              layout="fill"
              objectFit="contain"
              quality={100}
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
