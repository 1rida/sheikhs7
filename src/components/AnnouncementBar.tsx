'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const messages = [
  "Sheikh's7 Hair Care Products - Discover Nature's Secret!",
  "Delivery Across Pakistan in 2-3 Business Days!",
  "Experience the Best for Your Hair - Only with Sheikh's7!",
];

const AnnouncementBar = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 }); // Loop indefinitely

    // Function to animate messages
    const animateMessage = () => {
      const current = barRef.current;
      if (!current) return;

      tl.to(current, {
        opacity: 0,
        duration: 0.5,
        delay: 3, // Show message for 3 seconds
        onComplete: () => {
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
          gsap.set(current, { opacity: 0 }); // Reset opacity for the next message
          tl.to(current, { opacity: 1, duration: 0.5 }); // Fade in the new message
        },
      });
    };

    // Initial animation
    gsap.to(barRef.current, { opacity: 1, duration: 0.5 });

    // Start the message cycle
    animateMessage();

    // Clean up on unmount
    return () => {
      tl.kill();
    };
  }, [currentMessageIndex]); // Re-run effect when message index changes

  return (
    <div ref={barRef} className="relative w-full bg-gradient-to-r from-green-600 to-black text-white text-center py-2 text-sm font-medium  z-50 opacity-0">
      <p>{messages[currentMessageIndex]}</p>
    </div>
  );
};

export default AnnouncementBar;
