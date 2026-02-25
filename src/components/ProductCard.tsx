
'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext'; // Import useCart

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  rating?: number; // Let's assume a rating out of 5
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
};

import AddToCartIcon from './icons/AddToCartIcon';


const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const iconButtonRef = useRef<HTMLButtonElement>(null); // Ref for the green icon button
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { addToCart } = useCart(); // Use the cart hook

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });
      tl.current.fromTo(
        overlayRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.inOut' }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    tl.current?.play();
  };

  const handleMouseLeave = () => {
    tl.current?.reverse();
  };

  const handleButtonMouseEnter = () => {
    gsap.to(iconButtonRef.current, { scale: 1.2, duration: 0.2 });
  };

  const handleButtonMouseLeave = () => {
    gsap.to(iconButtonRef.current, { scale: 1, duration: 0.2 });
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onViewDetails(product)} // Make entire card clickable
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-72 flex items-start overflow-hidden pointer-events-none"> {/* Prevent clicks on image itself from bubbling up */}
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={200}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col justify-center items-center p-4 pointer-events-auto" // Re-enable pointer events for overlay content
          style={{ transform: 'translateY(100%)' }} // Initial hidden state
        >
          <h3 className="text-xl font-bold text-black">{product.name}</h3>
          <p className="text-sm text-center my-2">{product.description}</p>
          <div className="my-2">
            <StarRating rating={product.rating || 4} />
          </div>
          <div className="flex items-center space-x-3 my-2">
            <p className="text-gray-300 line-through">PKR. {product.originalPrice}</p>
            <p className="text-lg font-bold text-white">PKR. {product.discountedPrice}</p>
          </div>
          {/* Removed onClick from this button as the whole card is clickable now */}
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-6 text-center pointer-events-none"> {/* Prevent clicks on text area from bubbling up */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-center items-center space-x-3">
          <p className="text-gray-500 line-through">PKR. {product.originalPrice}</p>
          <p className="text-lg font-bold text-red-600">PKR. {product.discountedPrice}</p>
        </div>
      </div>
      <button
        ref={iconButtonRef}
        onClick={(e) => { e.stopPropagation(); addToCart(product, 1); }} // Stop propagation for Add to Cart
        className="absolute bottom-4 right-4 z-10" // Repositioned to bottom-right, added z-index to be above card click
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
      >
        <AddToCartIcon className="w-8 h-8 text-green-600" />
      </button>
    </div>
  );
};

export default ProductCard;
