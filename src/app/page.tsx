"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyMe from "@/components/WhyMe";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <WhyMe />
        <Projects />
        <TechStack />
        <Process />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
