import { Suspense } from 'react';
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import SquareProductGrid from "@/components/SquareProductGrid";
import HairSerumSection from "@/components/HairSerumSection";
import Services from "@/components/Services";
import ParallaxImageSection from "@/components/ParallaxImageSection";
import NewHairSerumSection from "@/components/NewHairSerumSection";


export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<div>Loading search bar...</div>}>
        <SearchBar />
      </Suspense>
      <SquareProductGrid />
      <HairSerumSection />
      <NewHairSerumSection />
       <ParallaxImageSection />
     
      <Services />
      {/* New component call */}
      
      
     
    </main>
  );
}
