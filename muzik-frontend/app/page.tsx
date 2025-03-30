
import { About } from "@/components/About";
import Contact from "@/components/Contact";
import Courses from "@/components/Courses";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import TopCompanies from "@/components/TopCompanies";

import { TutorTeam } from "@/components/Tutor-Team";

import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black text-white ">
      <Navbar />
        <Hero />
      <div>
        <About />
        <TopCompanies />
        <Courses />
        <TutorTeam />
        <Testimonials />
        <Services />
        <Faq />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
