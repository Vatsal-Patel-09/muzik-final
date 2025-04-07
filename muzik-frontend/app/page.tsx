"use client";
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
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://muzik-mgj9.onrender.com";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
export default function Home() {
  const [storeUserData, setStoreUserData] = useState({});

  const fetchLoggedInUser = async () => {
    try {
      await axios
        .get("https://muzik-mgj9.onrender.com/api/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setStoreUserData(response?.data?.user)
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.error("Error fetching logged in user data", error);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <main className="bg-white h-screen w-screen overflow-x-hidden">
      <ToastContainer />
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
