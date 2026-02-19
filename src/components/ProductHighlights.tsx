"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductHighlights = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const cards = sectionEl.querySelectorAll('.product-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animation for the text within each product card
      cards.forEach((card) => {
        const heading = card.querySelector('h3');
        const paragraph = card.querySelector('p');

        gsap.fromTo(
          [heading, paragraph],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Natural Solutions for Your Well-being
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Crafted with the finest herbal ingredients to support your hair and body.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Hair Oil Product Card */}
          <div className="product-card relative rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 min-h-[400px]">
            {/* GIF Background */}
            <div className="absolute inset-0">
              <Image
                src="/hair-oil-animation.gif"
                alt="Herbal Hair Oil"
                layout="fill"
                objectFit="cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional: Overlay for better text readability */}
            </div>
            {/* Text Content Overlay */}
            <div className="relative z-10 p-8 text-white h-full flex flex-col justify-center"> {/* Added text-white for readability */}
              <h3 className="text-2xl lg:text-3xl font-bold">
                Revitalizing Herbal Hair Oil
              </h3>
              <p className="mt-4 leading-relaxed">
                Nourish your scalp and strengthen your roots with our signature blend of natural oils and herbs. Designed to reduce hair fall, promote healthy growth, and restore a brilliant shine.
              </p>
            </div>
          </div>

          {/* Joint Pain Oil Product Card */}
          <div className="product-card relative rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 min-h-[400px]">
            {/* GIF Background */}
            <div className="absolute inset-0">
              <Image
                src="/joint-pain-animation.gif"
                alt="Soothing Joint Oil"
                layout="fill"
                objectFit="cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional: Overlay for better text readability */}
            </div>
            {/* Text Content Overlay */}
            <div className="relative z-10 p-8 text-white h-full flex flex-col justify-center"> {/* Added text-white for readability */}
              <h3 className="text-2xl lg:text-3xl font-bold">
                Soothing Joint & Muscle Oil
              </h3>
              <p className="mt-4 leading-relaxed">
                Find relief with our therapeutic joint pain oil. This potent formula penetrates deep to ease discomfort, reduce inflammation, and improve mobility, letting you move freely and without pain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
