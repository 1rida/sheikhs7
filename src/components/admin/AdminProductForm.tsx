'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/context/CartContext'; // Re-using Product interface

interface AdminProductFormProps {
  product?: Product; // Optional product for editing
  onSubmit: (formData: Omit<Product, 'id'>) => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onSubmit }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [image, setImage] = useState(product?.image || '');
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice || 0);
  const [discountedPrice, setDiscountedPrice] = useState(product?.discountedPrice || 0);
  const [rating, setRating] = useState(product?.rating || 0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImage(product.image);
      setOriginalPrice(product.originalPrice);
      setDiscountedPrice(product.discountedPrice);
      setRating(product.rating || 0);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, image, originalPrice, discountedPrice, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 md:p-8 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Product Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm md:text-base"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm md:text-base"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-900">Image URL</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm md:text-base"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-900">Original Price</label>
          <input
            type="number"
            id="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm md:text-base"
            required
          />
        </div>
        <div>
          <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-900">Discounted Price</label>
          <input
            type="number"
            id="discountedPrice"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm md:text-base"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-900">Rating (0-5)</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="0"
          max="5"
          step="0.1"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm md:text-base"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm md:text-base"
        >
          {product ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
