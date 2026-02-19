'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import ProductCard, { Product } from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { useSearch } from '../context/SearchContext';

const ProductCardsSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { searchQuery } = useSearch();
  const [products, setProducts] = useState<Product[]>([]); // State to hold fetched products
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/products');
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
      }
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err: unknown) {
      let message = 'An unknown error occurred while fetching products.';
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // If search query changes, re-fetch products to ensure latest data is used for filtering
    // or simply re-evaluate filteredProducts if `products` state is already up-to-date.
    // For now, `filteredProducts` relies on `products` state which is fetched once or on manual refresh.
    // No explicit re-fetch needed here unless products are expected to change frequently without explicit user action.
  }, [searchQuery]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Filter products based on searchQuery
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  if (loading) return <div className="text-center p-8">Loading products...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;


  return (
    <div ref={sectionRef} className="bg-neutral-100 py-12">
      <div className="container mx-auto px-4">
        <h2 ref={headingRef} className="text-5xl font-extrabold text-center mb-4">
          Our Products
        </h2>
        <p
          ref={paragraphRef}
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          Discover our exclusive range of hair care products, designed to bring out the best in your hair. From nourishing oils to styling essentials, each item is crafted with the finest ingredients for salon-quality results at home.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">No products found matching your search.</p>
          )}
        </div>

        {isModalOpen && (
          <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default ProductCardsSection;