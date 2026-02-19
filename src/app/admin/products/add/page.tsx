'use client';

import AdminProductForm from '@/components/admin/AdminProductForm';
import { useRouter } from 'next/navigation';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  // Add other product fields as necessary
}

export default function AdminAddProductPage() {
  const router = useRouter();

  const handleSubmit = async (formData: ProductFormData) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to add product: ${res.statusText}`);
      }

      router.push('/admin/products');
    } catch (error: unknown) {
      let message = 'Error adding product.';
      if (error instanceof Error) {
        message = error.message;
      }
      alert(message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <AdminProductForm onSubmit={handleSubmit} />
    </div>
  );
}
