import React from 'react';

const ParallaxImageSection: React.FC = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/hair-loss.jpg')" }}
    >
      {/* This section creates the parallax effect by having a fixed background image. */}
      {/* The overlay improves contrast for any content that might appear on top. */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
};

export default ParallaxImageSection;
