import { useCallback, useState } from "react";
import { SERVICES } from "./data/content";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Cover from "./sections/Cover";
import WhyUs from "./sections/WhyUs";
import Claims from "./sections/Claims";
import Reviews from "./sections/Reviews";
import Faq from "./sections/Faq";
import Contact from "./sections/Contact";
import Footer, { CtaBand, QuickActions } from "./sections/Footer";

export default function App() {
  // Shared quote state so "Get a motor quote" anywhere pre-fills the form
  const [coverId, setCoverId] = useState(SERVICES[0].id);
  const [step, setStep] = useState(0);

  const pickCover = useCallback((id) => {
    setCoverId(id);
    setStep(1);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-forest focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero onPickCover={pickCover} />
        <Cover onPickCover={pickCover} />
        <WhyUs />
        <Claims />
        <Reviews />
        <CtaBand />
        <Faq />
        <Contact coverId={coverId} setCoverId={setCoverId} step={step} setStep={setStep} />
      </main>
      <Footer />
      <QuickActions />
    </>
  );
}
