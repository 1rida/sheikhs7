import { Suspense } from 'react';
import ProductContent from './ProductContent'; // Import the new client component

const ProductsPage = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductContent />
    </Suspense>
  );
};

export default ProductsPage;
