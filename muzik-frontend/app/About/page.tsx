"use client";

import React from "react";
import Image from "next/image";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Timeline } from "@/components/ui/timeline";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export const about = [
  {
    title: "Who We Are?",
    description:
      "Music Skill House is an innovative online platform designed for aspiring musicians, independent artists, and students who want to master the art of music. Our goal is to provide industry-relevant education, helping learners refine their craft and succeed in the music industry.",
    link: "",
  },
  {
    title: "Our Mission",
    description:
      "To empower musicians of all levels with expert knowledge, hands-on training, and professional insights, bridging the gap between passion and success.",
    link: "",
  },
  {
    title: "What We Offer?",
    description:
      "Comprehensive music courses covering composition, production, mixing, mastering, and more. Hands-on training with real-world applications. Industry-level expertise with over a decade of experience. A community-driven approach to music learning.",
    link: "",
  },
];

const data = [
    {
      title: "Meet Soni - Founder & Lead Instructor",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Passionate about music education, Meet Soni has over 10 years of experience in music production, mixing and mastering for industries top hits.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/assets/tutor/meet.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-48 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Adwaitsingh Rajput - Co Founder & Lead Course Instructor",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          A skilled artist, entrepreneur and music business enthusiasts , Adwaitsingh, ensures our courses provide complete music industry insights with complete data and tips for every aspiring artists to grow and get better in their musical journey.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/assets/tutor/adwait.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-48 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];

const page = () => {
  return (
    <div>
        <Navbar />
        <div className="mt-24 flex flex-col items-center justify-center">

            <div className="relative w-full">
              
              {/* Background image with dark blur overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center mx-auto md:mx-20 overflow-x-hidden w-[90%] rounded-2xl "
                style={{
                  backgroundImage: 'url("/assets/about/AboutFixed04.JPG")', // Replace with your actual image path
                }}
              >
                {/* <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div> */}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="border-b-2 border-gray/30 w-[90%] md:ml-20 bg-black/50 rounded-t-2xl mx-auto flex justify-center">
                  <h3 className="text-[35px] font-bold font-serif mb-5 mt-10 text-white">About US</h3>
                </div>

                <div className="md:h-[20rem] h-[40rem]  flex items-center justify-center my-[-45%] md:my-[-4%]">
                  <TextHoverEffect text="Muzik Skill House" />
                </div>
              
                <div className="max-w-8xl mx-auto px-8 border-b-2 border-gray/30 w-[90%] mt-[-5%]">
                  <HoverEffect items={about} />
                </div>
              </div>
            </div>
            <div>
                <div className="w-full">
                    <Timeline data={data} />
                </div>
            </div>
        </div>
        <div className="border-t-2 border-gray mx-4 mt-10">
            <Contact />
            <Footer />
        </div>
    </div>
  )
}

export default page;