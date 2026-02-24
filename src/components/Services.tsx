"use client";
import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageElements = imagesRef.current ? gsap.utils.toArray(imagesRef.current.children) : [];
    const content = contentRef.current;

    if (!section || imageElements.length === 0 || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate images
    tl.fromTo(
      imageElements,
      {
        opacity: 0,
        scale: 0.8,
        y: 40,
        rotation: (i) => (i === 0 ? -15 : i === 2 ? 15 : 0),
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2,
      }
    );
    
    // Animate text content
    tl.fromTo(
        content,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.8"
    );

    // Subtle floating effect
    imageElements.forEach((el) => {
      gsap.to(el as HTMLElement, {
        y: '+=10',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });
    });

  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-6xl font-extrabold text-center text-green-700 mb-12 tracking-tight">
          It&#39;s 100% Organic and Pure
        </h2>
       <p
  className="
    text-sm 
    sm:text-base 
    md:text-lg 
    text-center 
    text-gray-600 
    max-w-xl 
    mx-auto
    leading-relaxed
  "
>
  Made with natural, chemical-free ingredients that help reduce hair fall, nourish the scalp, and improve overall hair health.
</p>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Frame */}
          <div ref={imagesRef} className="relative w-full h-[500px]">
            {/* Side Image 1 */}
            <div className="absolute w-[45%] h-[60%] left-0 top-[20%] transform -rotate-12">
              <Image
                src="/hair-care-1.jpg"
                alt="Hair Care Model 1"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-lg"
              />
            </div>
            {/* Center Image */}
            <div className="absolute w-[60%] h-[90%] z-10">
              <Image
                src="/hair-care-1.jpg"
                alt="Sheikh&apos;s7 Hair Oil"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            {/* Side Image 2 */}
            <div className="absolute w-[45%] h-[60%] right-0 bottom-[20%] transform rotate-12">
              <Image
                src="/hair-oil-1.png"
                alt="Hair Care Model 2"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="text-content">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
              The Essence of Perfect Hair
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sheikh&apos;s7 Hair Oil</h3>
                <p className="text-gray-600 leading-relaxed">
                  A luxurious blend for <strong>deep scalp nourishment</strong>. Our signature oil strengthens hair roots from within, significantly reducing hair fall and promoting healthy, resilient growth naturally.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sheikh&apos;s7 Hair Serum</h3>
                <p className="text-gray-600 leading-relaxed">
                  Unlock brilliant <strong>shine and smoothness</strong> with our lightweight, non-greasy serum. It instantly tames frizz and flyaways, leaving your hair silky, manageable, and radiant all day.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sheikh&apos;s7 Hair Spray</h3>
                <p className="text-gray-600 leading-relaxed">
                  Lock in your style with a <strong>long-lasting, flexible hold</strong>. This fine mist protects your hairstyle against humidity and environmental stressors, keeping it fresh and perfectly in place without stiffness.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;