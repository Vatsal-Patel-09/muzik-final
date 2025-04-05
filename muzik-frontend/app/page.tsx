
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
import axios from "axios";

axios.defaults.baseURL = 'https://muzik-mgj9.onrender.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default function Home() {

  return (
    <main className="bg-white h-screen w-screen overflow-x-hidden">
      <Navbar />
        <Hero />
      <div>
        <About />
        <TopCompanies />
        <Courses />
        <TutorTeam />
        <Testimonials />
        {/* <Services /> */}
        <Faq />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
