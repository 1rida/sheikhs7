'use client'; // Mark as client component

import HeroSection from '@/components/HeroSection';

import ProductCardsSection from '@/components/ProductCardsSection';
import OrganicProductSection from '@/components/OrganicProductSection';
import HerbalSolutionSection from '@/components/HerbalSolutionSection';
import SafeVisionSection from '@/components/SafeVisionSection';
import ProductionHighlights from '@/components/ProductHighlights';
import NewProductLaunchSection from '@/components/NewProductLaunchSection';
import { useSearch } from '../../context/SearchContext'; // Import useSearch
import { useSearchParams } from 'next/navigation'; // Import useSearchParams

const ProductsPage = () => {
  const { searchQuery } = useSearch(); // Get searchQuery from context
  const searchParams = useSearchParams(); // Get URL search params
  const urlSearchQuery = searchParams.get('search');

  // Determine if a search is active
  const isSearchActive = !!searchQuery || !!urlSearchQuery;

  return (
    <div>
      {isSearchActive ? (
        // If search is active, only show ProductCardsSection
        <ProductCardsSection />
      ) : (
        // Otherwise, show all sections
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

export default ProductsPage;
