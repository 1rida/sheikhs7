"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import AnimatedLogo from '@/components/AnimatedLogo';
import SafeVisionSection from '@/components/SafeVisionSection';
import ProductHighlights from '@/components/ProductHighlights';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const whoWeAreSectionRef = useRef<HTMLElement>(null);
  const commitmentSectionRef = useRef<HTMLElement>(null); // Add ref for commitment section

  useEffect(() => {
    const whoWeAreEl = whoWeAreSectionRef.current;
    const commitmentEl = commitmentSectionRef.current; // Get commitment element

    if (!whoWeAreEl || !commitmentEl) return; // Add commitmentEl to check

    const ctx = gsap.context(() => {
      // --- Who We Are Animations ---
      gsap.fromTo(
        whoWeAreEl.querySelectorAll('.who-we-are-image, .who-we-are-content > *'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: whoWeAreEl,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // --- Our Commitment Animations --- (Re-add these)
      gsap.fromTo(
        commitmentEl.querySelectorAll('.commitment-content'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.3,
          scrollTrigger: {
            trigger: commitmentEl,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#fdfdfc] text-gray-800">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/about-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight shadow-md">
            The Essence of Natural Beauty
          </h1>
        </div>
      </section>

      {/* Who We Are Section */}
      <section ref={whoWeAreSectionRef} className="container mx-auto py-24 px-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-96 md:h-[500px] rounded-lg shadow-2xl overflow-hidden who-we-are-image">
            <Image 
              src="/who-we-are.jpg" 
              alt="Our Team" 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg"
              quality={90}
            />
          </div>
          <div className="relative who-we-are-content">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="relative w-64 h-64 opacity-90">
                <Image
                  src="/logo.png"
                  alt="Logo Watermark"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center lg:text-left">
              Who We Are
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              We are a passionate collective of botanists, innovators, and wellness advocates united by a single purpose: to redefine hair care through the timeless wisdom of nature. Our journey is rooted in a deep reverence for the earth’s purest ingredients and a commitment to crafting solutions that are as effective as they are ethical.
            </p>
          </div>
        </div>
      </section>

      {/* Animated Logo Section */}
      <section ref={commitmentSectionRef} className="py-24 px-6 text-center">
        <div className="commitment-content">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Sheikh7 — Crafted by Nature, Trusted for Results
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto mt-6">
            Every ingredient is a promise. We meticulously source the world’s most potent botanicals, ensuring that each drop in our formulations is pure, ethically harvested, and bursting with life. Our process is a delicate balance of science and nature, designed to preserve the integrity of each ingredient from source to bottle.
          </p>
        </div>
        <div className="relative h-96 w-full max-w-2xl mx-auto commitment-content">
          <AnimatedLogo />
        </div>
      </section>

      <SafeVisionSection />
      <ProductHighlights />
    </div>
  );
};

export default AboutPage;

