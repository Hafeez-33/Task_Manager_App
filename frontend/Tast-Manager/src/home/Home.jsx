import CTAA from "./homeComponents/CTAA";
import Featuress from "./homeComponents/Featuress";
import Footerr from "./homeComponents/Footerr";
import Hero from "./homeComponents/hero";
import HowItWorks from "./homeComponents/howItWorks";
import Navbar from "./homeComponents/navbar";
import ProductPreview from "./homeComponents/productPreview";
import SocialProof from "./homeComponents/socialProof";
import WhyChooseUs from "./homeComponents/whyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
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