import { useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import AdvancedCalculator from "@/features/calculator";
import Testimonials from "@/components/Testimonials";
import ROIChart from "@/components/ROIChart";
import News from "@/components/News"; // New
import FAQ from "@/components/FAQ";

interface HomeProps {
  targetSection?: string;
}

export default function Home({ targetSection }: HomeProps) {
  useEffect(() => {
    if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [targetSection]);

  return (
    <div className="flex flex-col bg-background text-foreground overflow-x-hidden">
      <Hero />
      <Features />
      <AdvancedCalculator />
      <Process />
      <Projects />
      <Testimonials />
      <News />
      <ROIChart />
      <FAQ />
    </div>
  );
}
