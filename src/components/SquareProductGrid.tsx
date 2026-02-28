'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SquareProductGrid = () => {
  const products = [
    { src: '/hero_right_image.jpg', alt: 'Hero Product' },
    { src: '/hair-spray.png', alt: 'Hair Spray' },
    { src: '/new-hair-serum.png', alt: 'New Hair Serum' },
    { src: '/downloaded_image.png', alt: 'Product Image' },
  ];

  return (
    <section className="pt-12 pb-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col group">
              <div className="relative aspect-square overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <Link href="/products" className="mt-3 flex items-center justify-center text-gray-700 font-semibold hover:text-black transition-colors duration-300">
                <span>View Product</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center pb-0">
          <Link href="/products">
            <button className="px-10 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transform hover:scale-105 transition duration-300 shadow-lg">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SquareProductGrid;
