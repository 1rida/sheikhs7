// src/components/NewProductLaunchSection.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useCart } from '@/context/CartContext'; // Use the custom hook
import ProductDetailModal from './ProductDetailModal'; // Assuming a ProductDetailModal exists

const NewProductLaunchSection = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null); // Ref for the buttons container

  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial animations
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: ".new-product-section", // Use a class for the section
        start: "top center+=100", // Start animation when top of section is 100px above center of viewport
        toggleActions: "play none none none", // Play animation once when triggered
        scrub: 1, // Smoothly link animation to scroll position
      }
    });

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(paragraphRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }, "<0.3" // Start 0.3s before heading animation ends
    )
    .fromTo(ctaButtonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 }, "<0.3"
    )
    .fromTo(imageRef.current,
      { opacity: 0, x: 100, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 1.5 }, "<0.5" // Start 0.5s before buttons animation ends
    );

    // Button hover animations
    const buttons = ctaButtonsRef.current ? ctaButtonsRef.current.children : [];
    Array.from(buttons).forEach((button) => {
      const buttonElement = button as HTMLElement;
      gsap.to(buttonElement, {
        scale: 1,
        duration: 0.3,
        paused: true, // Start paused
        onReverseComplete: () => { gsap.to(buttonElement, { scale: 1, duration: 0.3 }); } // Ensure scale returns to 1
      }).revert(); // Revert initial state if not played

      buttonElement.addEventListener('mouseenter', () => gsap.to(buttonElement, { scale: 1.05, duration: 0.3 }));
      buttonElement.addEventListener('mouseleave', () => gsap.to(buttonElement, { scale: 1, duration: 0.3 }));
    });

    return () => {
        // Cleanup event listeners
        Array.from(buttons).forEach((button) => {
            const buttonElement = button as HTMLElement;
            buttonElement.removeEventListener('mouseenter', () => gsap.to(buttonElement, { scale: 1.05, duration: 0.3 }));
            buttonElement.removeEventListener('mouseleave', () => gsap.to(buttonElement, { scale: 1, duration: 0.3 }));
        });
        ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all ScrollTriggers on unmount
    };

  }, []);

  const handleAddToCart = () => {
    // Placeholder product details for Sheikh's7 Joint Pain Oil
    const product = {
      id: 'sheikhs7-joint-pain-oil',
      name: "Sheikh's7 Joint Pain Oil",
      price: 29.99, // Example price
      imageUrl: '/downloaded_image.jpg', // Use the image for this product
      description: 'Experience unparalleled relief with our expertly formulated joint pain oil.', // Add description for CartItem
      image: '/downloaded_image.jpg', // Add image for CartItem
      originalPrice: 35.00, // Example original price
      discountedPrice: 29.99, // Example discounted price
    };
    addToCart(product, 1); // Pass quantity (1)
    alert(`${product.name} added to cart!`);
  };

  const handleViewDetails = () => {
    // For now, let's just open the modal.
    // In a real app, you'd pass specific product details to the modal or navigate to a product page.
    setIsModalOpen(true);
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden new-product-section">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-contain bg-center opacity-10" style={{ backgroundImage: "url('/logo.png')" }}></div>

      <div className="md:w-1/2 text-center md:text-left p-4 z-10">
        <h1 ref={headingRef} className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-green-600 drop-shadow-lg">
          <span className="text-black">We have launched a new product:</span> <br /> <br /> Sheikh's7 Joint Pain Oil
        </h1>
        <p ref={paragraphRef} className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
          Experience unparalleled relief with our expertly formulated joint pain oil.
          Crafted with traditional herbs and modern science, Sheikh's7 offers a soothing sensation
          and long-lasting comfort, helping you reclaim your active lifestyle.
        </p>
        <div ref={ctaButtonsRef} className="flex justify-center md:justify-start space-x-4">
          <button
            onClick={handleAddToCart}
            className="px-8 py-4 bg-green-500 text-white font-bold rounded-full shadow-lg  transform hover:scale-105 transition duration-300"
          >
            Add to Cart
          </button>
          <button
            onClick={handleViewDetails}
            className="px-8 py-4 border-2 border-indigo-600 text-indigo-700 font-bold rounded-full shadow-lg hover:bg-indigo-50 transform hover:scale-105 transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4 flex justify-center z-10 mt-8 md:mt-0">
        <Image
          ref={imageRef}
          src="/downloaded_image.png"
          alt="Sheikh's7 Joint Pain Oil"
          width={400}
          height={400}
          className="rounded-xl shadow-2xl border-4 border-white max-w-full h-auto"
          priority
        />
      </div>

      {isModalOpen && (
        <ProductDetailModal
          product={{ // Placeholder product data for the modal
            id: 'sheikhs7-joint-pain-oil',
            name: "Sheikh's7 Joint Pain Oil",
            description: 'Experience unparalleled relief with our expertly formulated joint pain oil. Crafted with traditional herbs and modern science, Sheikh\'s7 offers a soothing sensation and long-lasting comfort, helping you reclaim your active lifestyle.',
            originalPrice: 1500,
            discountedPrice: 1200,
            image: '/downloaded_image.jpg',
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default NewProductLaunchSection;
