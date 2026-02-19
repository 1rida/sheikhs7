'use client';

import AdminProductForm from '@/components/admin/AdminProductForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/context/CartContext'; // Re-use Product interface

export default function AdminEditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${params.id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.statusText}`);
        }
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: unknown) {
        let message = 'An unknown error occurred.';
        if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleSubmit = async (formData: Product) => { // Use Product interface for formData
    try {
      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to update product: ${res.statusText}`);
      }

      router.push('/admin/products');
    } catch (error: unknown) {
      let message = 'Error updating product.';
      if (error instanceof Error) {
        message = error.message;
      }
      alert(message);
    }
  };

  if (loading) return <div className="p-8">Loading product...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!product) return <div className="p-8">Product not found.</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <AdminProductForm product={product} onSubmit={handleSubmit} />
    </div>
  );
}
