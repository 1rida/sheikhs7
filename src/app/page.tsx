import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import HairSerumSection from "@/components/HairSerumSection";
import HerbalSolutionSection from "@/components/HerbalSolutionSection";
import OrganicProductSection from "@/components/OrganicProductSection";
import SafeVisionSection from "@/components/SafeVisionSection";
import VisionSection from "@/components/VisionSection";
import Services from "@/components/Services";
import ParallaxImageSection from "@/components/ParallaxImageSection";
import ProductHighlights from "@/components/ProductHighlights";
import NewHairSerumSection from "@/components/NewHairSerumSection";


export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <HairSerumSection />
      <NewHairSerumSection />
       <ParallaxImageSection />
     
      <Services />
      {/* New component call */}
      
      
     
    </main>
  );
}
