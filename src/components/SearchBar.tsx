'use client';

import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
import gsap from 'gsap';
import { useRouter, useSearchParams } from 'next/navigation'; // Added useSearchParams
import { useSearch } from '../context/SearchContext'; // Import useSearch

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSearchQuery } = useSearch(); // Use the search hook

  // Refs for GSAP animations
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize searchTerm from URL query on component mount
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchTerm(decodeURIComponent(query));
      setSearchQuery(decodeURIComponent(query)); // Also set in context
    }
  }, [searchParams, setSearchQuery]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      setSearchQuery(trimmedSearchTerm); // Update context
      router.push(`/products?search=${encodeURIComponent(trimmedSearchTerm)}`); // Navigate to products page with search param
    } else {
      setSearchQuery(''); // Clear context if search term is empty
      router.push('/products'); // Navigate to products page without search param
    }
  };

  return (
    <section className="flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-full shadow-xl flex items-center p-2 space-x-1 sm:space-x-2 relative">
        {/* Search Input Field */}
        <form onSubmit={handleSearch} className="flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className="w-full min-w-0 px-4 py-2 rounded-full text-gray-800 bg-transparent focus:outline-none
                       focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onMouseEnter={() => gsap.to(inputRef.current, { scale: 1.01, duration: 0.2 })}
            onMouseLeave={() => gsap.to(inputRef.current, { scale: 1, duration: 0.2 })}
          />
        </form>

        {/* Search Button */}
        <button
          ref={buttonRef}
          onClick={handleSearch}
          className="flex-shrink-0 min-w-[120px] px-6 py-3 bg-black text-white rounded-full font-semibold text-sm
                     hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition duration-300 ease-in-out cursor-pointer"
          onMouseEnter={() => gsap.to(buttonRef.current, { scale: 1.05, duration: 0.2 })}
          onMouseLeave={() => gsap.to(buttonRef.current, { scale: 1, duration: 0.2 })}
        >
          Search Now
        </button>
      </div>
    </section>
  );
};

export default SearchBar;