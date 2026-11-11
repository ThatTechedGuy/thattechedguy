import { Demo } from "@/projects/yank/demo/Demo";
import { FixedLayers } from "@/projects/yank/motion/FixedLayers";
import { Dock } from "@/projects/yank/nav/Dock";
import { Header } from "@/projects/yank/nav/Header";
import { DemoSection } from "@/projects/yank/sections/DemoSection";
import { Download } from "@/projects/yank/sections/Download";
import { Features } from "@/projects/yank/sections/Features";
import { Film } from "@/projects/yank/sections/Film";
import { Footer } from "@/projects/yank/sections/Footer";
import { Free } from "@/projects/yank/sections/Free";
import { GiantWords } from "@/projects/yank/sections/GiantWords";
import { Hero } from "@/projects/yank/sections/Hero";
import { HowItWorks } from "@/projects/yank/sections/HowItWorks";
import { Privacy } from "@/projects/yank/sections/Privacy";
import { Stack } from "@/projects/yank/sections/Stack";
import { Stripes } from "@/projects/yank/sections/Stripes";

export default function YankPage() {
  return (
    <div className="page">
      <FixedLayers />
      <Header />
      <Dock />
      <main>
        <Hero />
        <Stripes />
        <DemoSection>
          <Demo />
        </DemoSection>
        <HowItWorks />
        <Film />
        <Features />
        <Stack />
        <Privacy />
        <GiantWords />
        <Free />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
