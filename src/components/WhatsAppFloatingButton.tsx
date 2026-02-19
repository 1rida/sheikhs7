'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WhatsAppFloatingButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const phoneNumber = '+923092138872'; // No spaces for the link

  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        y: -10, // Move up slightly
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Go back and forth
        duration: 0.8, // Speed of the animation
        ease: "power1.inOut", // Easing function
        delay: 2 // Start after a delay
      });
    }
  }, []);

  return (
    <a
      ref={buttonRef}
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-5 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50 flex items-center justify-center text-3xl"
      aria-label="Chat with us on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppFloatingButton;
