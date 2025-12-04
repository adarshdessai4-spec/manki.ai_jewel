import CallToAction from "@/components/CallToAction";
import DesignGalleryPreview from "@/components/DesignGalleryPreview";
import FeatureGrid from "@/components/FeatureGrid";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ConceptSlider from "@/components/ConceptSlider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ConceptSlider />
      <HowItWorks />
      <FeatureGrid />
      <DesignGalleryPreview />
      <CallToAction />
    </>
  );
}
