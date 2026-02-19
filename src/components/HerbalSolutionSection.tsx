"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HerbalSolutionSection = () => {
  const sectionRef = useRef(null);
  const largeFrameRef = useRef(null);
  const smallFrameRef = useRef(null);
  const textContentRef = useRef(null);

  useLayoutEffect(() => {
    const largeFrameEl = largeFrameRef.current;
    const smallFrameEl = smallFrameRef.current;
    const textEls = gsap.utils.toArray(".text-anim", textContentRef.current);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        largeFrameEl,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      ).fromTo(
        smallFrameEl,
        { opacity: 0, x: 50, y: 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8"
      );

      gsap.from(textEls, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 lg:gap-16">
          {/* Left Column: Image Frames */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px]">
              {/* Large Frame */}
              <div
                ref={largeFrameRef}
                className="absolute inset-0 rounded-lg shadow-2xl"
              >
                <Image
                  src="/new_product_image_1.webp"
                  alt="Herbal Ingredients"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              {/* Small Frame */}
              <div
                ref={smallFrameRef}
                className="absolute -bottom-12 -right-12 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 border-4 border-white rounded-lg shadow-xl"
              >
                <Image
                  src="/downloaded_image.jpg"
                  alt="Herbal Joint Pain Oil"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div
            ref={textContentRef}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-anim text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              A Powerful Herbal Solution for Chronic Joint Pain
            </h2>
            <p className="text-anim mt-4 text-base md:text-lg text-gray-600">
              Chronic pain in your knees, back, and shoulders can be debilitating, affecting every aspect of your life. Our advanced formula is engineered for deep absorption, targeting stiffness, inflammation, and swelling with fast-acting, noticeable results. We harness the power of potent herbal ingredients, creating a 100% organic solution you can trust. Move with ease and reclaim your comfort with a remedy designed for powerful, plant-based relief.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HerbalSolutionSection;
