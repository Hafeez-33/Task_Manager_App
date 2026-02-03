import Navbarr from "./homeComponents/Navbarr";
import Hero from "./homeComponents/Hero";
import SocialProof from "./homeComponents/SocialProof"
import Featuress from "./homeComponents/Featuress";
import HowItWorks from "./homeComponents/HowItWorks";
import ProductPreview from "./homeComponents/ProductPreview";
import WhyChooseUs from "./homeComponents/WhyChooseUs";
import CTAA from "./homeComponents/CTAA";
import Footerr from "./homeComponents/Footerr";


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbarr />
      <Hero />
      <SocialProof />
      <Featuress />
      <HowItWorks />
      <ProductPreview />
      <WhyChooseUs />
      <CTAA/>
      <Footerr />
    </main>
  );
}