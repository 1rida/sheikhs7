"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OrganicProductSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const leftFrameRef = useRef(null);
  const centerFrameRef = useRef(null);
  const rightFrameRef = useRef(null);

  useLayoutEffect(() => {
    const refs = [leftFrameRef.current, centerFrameRef.current, rightFrameRef.current];
    const ctx = gsap.context(() => {
      // Fade and Scale animation on load
      gsap.fromTo(
        refs,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Slight upward motion on scroll
      gsap.to(refs, {
        y: -50,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text animations
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
      
      gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const frameClasses = "absolute rounded-2xl shadow-lg overflow-hidden";
  const imageClasses = "object-cover";

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F7F5F2] py-16 md:py-24 flex flex-col items-center justify-center overflow-x-hidden"
    >
      {/* Text Content */}
      <div className="w-full px-6 text-center mb-12 md:mb-16">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-green-700"
        >
          Targeted Herbal Therapy for Joint Strength & Flexibility
        </h2>
        <p
          ref={paragraphRef}
          className="max-w-3xl mx-auto mt-4 text-base sm:text-lg text-gray-700"
        >
          Struggling with persistent joint pain in your knees, back, or shoulders? Daily stiffness, inflammation, and swelling can hold you back from living your life to the fullest. Our 100% Organic Joint Pain Oil offers the results-focused relief you need. Formulated with pure, natural ingredients, this fast-acting solution penetrates deeply to soothe discomfort at its source. Reclaim your movement and confidence with a remedy designed for rapid, effective results.
        </p>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-[600px] sm:h-[650px] md:h-[550px] lg:h-[700px]">
        {/* Left Frame */}
        <div
          ref={leftFrameRef}
          className={`${frameClasses} w-[160px] h-[240px] top-[10%] left-[5%] 
                      sm:w-[200px] sm:h-[300px] sm:left-[8%]
                      md:w-[240px] md:h-[360px] md:top-1/2 md:left-[18%] md:-translate-y-1/2
                      lg:w-[320px] lg:h-[480px] lg:left-[25%] opacity-90 md:opacity-70 z-10`}
        >
          <Image src="/new_product_image_1.webp" alt="Organic ingredients" fill className={imageClasses} sizes="33vw" />
        </div>

        {/* Center Frame */}
        <div
          ref={centerFrameRef}
          className={`${frameClasses} w-[220px] h-[330px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      sm:w-[260px] sm:h-[390px] 
                      md:w-[280px] md:h-[420px] 
                      lg:w-[400px] lg:h-[600px] shadow-2xl z-20`}
        >
          <Image src="/new_product_image_2.jpg" alt="Joint Pain Oil bottle" fill className={imageClasses} sizes="80vw" priority />
        </div>

        {/* Right Frame */}
        <div
          ref={rightFrameRef}
          className={`${frameClasses} w-[160px] h-[240px] bottom-[10%] right-[5%] top-auto
                      sm:w-[200px] sm:h-[300px] sm:right-[8%]
                      md:w-[240px] md:h-[360px] md:top-1/2 md:bottom-auto md:left-[82%] md:-translate-y-1/2 md:-translate-x-full
                      lg:w-[320px] lg:h-[480px] lg:left-[75%] lg:-translate-x-1/2 opacity-90 md:opacity-70 z-10`}
        >
          <Image src="/new_product_image_3.jpg" alt="Person feeling relief" fill className={imageClasses} sizes="33vw" />
        </div>
      </div>
    </section>
  );
};

export default OrganicProductSection;
