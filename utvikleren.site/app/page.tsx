import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import TechStack from "@/components/sections/tech-stack";
import Showcase from "@/components/sections/showcase";
import Results from "@/components/sections/results";
import Process from "@/components/sections/process";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />
      <Results />
      <Process />
      <Footer />
    </>
  );
}
