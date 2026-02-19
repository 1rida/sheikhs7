'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from './ProductCard'; // Assuming Product interface is exported from ProductCard
import { useCart } from '../context/CartContext'; // Import useCart
import CountdownTimer from './CountdownTimer'; // Import CountdownTimer

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
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

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Use the cart hook

  // Calculate a target date 3 days from now for the countdown
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
  const targetDate = threeDaysFromNow.toISOString();

  if (!product) {
    return null;
  }

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity); // Add product with selected quantity
    onClose(); // Close the modal after adding to cart
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full h-auto max-h-[90vh] overflow-auto flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold z-10"
        >
          &times;
        </button>

        <div className="md:w-1/2 p-6 flex justify-center items-center bg-gray-100 rounded-l-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain rounded-lg max-h-full max-w-full"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <div className="flex items-center mb-4">
              <StarRating rating={product.rating || 4} />
              <span className="text-gray-600 ml-2">({product.rating || 4}.0)</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Price:</h3>
            <p className="text-xl text-red-600 font-semibold mb-2">PKR. {product.discountedPrice}</p>
            {product.originalPrice && (
              <p className="text-gray-500 line-through mb-4">PKR. {product.originalPrice}</p>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Description:</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-auto">
            <div className="flex items-center space-x-3">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
              >
                -
              </button>
              <span className="text-2xl font-semibold text-gray-800">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-red-600 text-white hover:bg-red-700 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart} // Use the new handleAddToCart function
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>

          <CountdownTimer targetDate={targetDate} /> {/* Integrated CountdownTimer */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
