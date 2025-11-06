import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeatureSection";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101022] text-[#d1d1f7] overflow-x-hidden font-display">
      <Navbar />
      <main className="grow">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
