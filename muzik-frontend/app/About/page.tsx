"use client";

import React from "react";
import Image from "next/image";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Timeline } from "@/components/ui/timeline";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
              src="/assets/meet soni.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
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
              src="/assets/asr.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    // {
    //   title: "Changelog",
    //   content: (
    //     <div>
    //       <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
    //         Deployed 5 new components on Aceternity today
    //       </p>
    //       <div className="mb-8">
    //         <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
    //           ✅ Card grid component
    //         </div>
    //         <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
    //           ✅ Startup template Aceternity
    //         </div>
    //         <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
    //           ✅ Random file upload lol
    //         </div>
    //         <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
    //           ✅ Himesh Reshammiya Music CD
    //         </div>
    //         <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
    //           ✅ Salman Bhai Fan Club registrations open
    //         </div>
    //       </div>
    //       <div className="grid grid-cols-2 gap-4">
    //         <Image
    //           src="https://assets.aceternity.com/pro/hero-sections.png"
    //           alt="hero template"
    //           width={500}
    //           height={500}
    //           className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
    //         />
    //         <Image
    //           src="https://assets.aceternity.com/features-section.png"
    //           alt="feature template"
    //           width={500}
    //           height={500}
    //           className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
    //         />
    //         <Image
    //           src="https://assets.aceternity.com/pro/bento-grids.png"
    //           alt="bento template"
    //           width={500}
    //           height={500}
    //           className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
    //         />
    //         <Image
    //           src="https://assets.aceternity.com/cards.png"
    //           alt="cards template"
    //           width={500}
    //           height={500}
    //           className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
    //         />
    //       </div>
    //     </div>
    //   ),
    // },
  ];

const page = () => {
  return (
    <div>
        <Navbar />
        <div className="mt-20 flex flex-col items-center justify-center">
            <div className="border-b-2 border-gray w-[90%] flex justify-center">
                <h3 className="text-[35px] font-bold font-serif mb-5 mt-10 ">About US</h3>
            </div>

            <div className="h-[20rem] flex items-center justify-center my-[-4%]">
                <TextHoverEffect text="Muzik Skill House" />
            </div>
        
            <div className="max-w-8xl mx-auto px-8 border-b-2 border-gray w-[90%] mt-[-5%]">
                <   HoverEffect items={about} />
            </div>
            <div>
                <div className="w-full">
                    <Timeline data={data} />
                </div>
            </div>
        </div>
        <div className="border-t-2 border-gray mx-28 mt-10">
            <Footer />
        </div>
    </div>
  )
}

export default page;