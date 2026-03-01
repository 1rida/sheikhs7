'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from './ProductCard'; 
import { useCart } from '../context/CartContext'; 
import CountdownTimer from './CountdownTimer'; 

interface Comment {
  id: string;
  productId: string;
  userName: string;
  text: string;
  rating: number;
  timestamp: string;
}

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const StarRating = ({ 
  rating, 
  onRatingChange, 
  interactive = false 
}: { 
  rating: number; 
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <button
        key={i}
        type="button"
        disabled={!interactive}
        onClick={() => onRatingChange && onRatingChange(i)}
        className={`text-2xl transition-colors duration-200 ${
          i <= rating ? 'text-yellow-400' : 'text-gray-300'
        } ${interactive ? 'hover:scale-110 cursor-pointer' : ''}`}
      >
        ★
      </button>
    );
  }
  return <div className="flex space-x-1">{stars}</div>;
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToCart } = useCart(); 
  const commentSectionRef = React.useRef<HTMLDivElement>(null);

  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
  const targetDate = threeDaysFromNow.toISOString();

  useEffect(() => {
    const fetchComments = async () => {
      if (!product) return;
      try {
        const res = await fetch(`/api/comments?productId=${product.id}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (product) {
      fetchComments();
    }
  }, [product]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !newComment.trim() || !userName.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          userName,
          text: newComment,
          rating: userRating,
        }),
      });

      if (res.ok) {
        const addedComment = await res.json();
        setComments(prev => [...prev, addedComment]);
        setNewComment('');
        setUserRating(5); // Reset to default
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return product?.rating || 4;
    const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
    return (sum / comments.length).toFixed(1);
  };

  const scrollToReviews = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!product) {
    return null;
  }

  const averageRating = calculateAverageRating();

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity); 
    onClose(); 
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

        <div className="md:w-1/2 p-6 flex justify-center items-start bg-gray-100 rounded-l-lg">
          <div className="sticky top-0 w-full">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain rounded-lg w-full h-auto"
            />
          </div>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <div 
              className="flex items-center mb-4 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={scrollToReviews}
              title="Click to see reviews"
            >
              <StarRating rating={Math.round(Number(averageRating))} />
              <span className="text-gray-600 ml-2 font-medium">
                ({averageRating}) • {comments.length} Review{comments.length !== 1 ? 's' : ''}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Price:</h3>
            <p className="text-xl text-red-600 font-semibold mb-2">PKR. {product.discountedPrice}</p>
            {product.originalPrice && (
              <p className="text-gray-500 line-through mb-4">PKR. {product.originalPrice}</p>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Description:</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6 mb-6">
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
              onClick={handleAddToCart} 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>

          <div className="mb-8">
             <CountdownTimer targetDate={targetDate} />
          </div>

          {/* Comment Section */}
          <div ref={commentSectionRef} className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews & Comments</h3>
            
            <form onSubmit={handleCommentSubmit} className="mb-6 space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Your Rating:</span>
                <StarRating 
                  rating={userRating} 
                  onRatingChange={setUserRating} 
                  interactive={true} 
                />
              </div>

              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none text-black"
                required
              />
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none h-24 text-black"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-800 text-white font-bold py-2 px-6 rounded hover:bg-gray-900 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>

            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-gray-800 block">{comment.userName}</span>
                        <StarRating rating={comment.rating} />
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))
              ).reverse()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
