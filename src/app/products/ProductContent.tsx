'use client';

import HeroSection from '@/components/HeroSection';
import ProductCardsSection from '@/components/ProductCardsSection';
import OrganicProductSection from '@/components/OrganicProductSection';
import HerbalSolutionSection from '@/components/HerbalSolutionSection';
import NewProductLaunchSection from '@/components/NewProductLaunchSection';
import { useSearch } from '../../context/SearchContext';
import { useSearchParams } from 'next/navigation';

const ProductContent = () => {
  const { searchQuery } = useSearch();
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get('search');

  const isSearchActive = !!searchQuery || !!urlSearchQuery;

  return (
    <div>
      {isSearchActive ? (
        <ProductCardsSection />
      ) : (
        <>
          <HeroSection />
          <ProductCardsSection />
          <OrganicProductSection />
          <NewProductLaunchSection />
          <HerbalSolutionSection />
        </>
      )}
    </div>
  );
};

export default ProductContent;
