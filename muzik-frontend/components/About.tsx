"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "./ui/button";

export function About() {
  const features = [
    {
      title: "Our Mission ",
      description:
        "To empower musicians of all levels with expert knowledge, hands-on training, and professional insights, bridging the gap between passion and success.",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-4 border-0 md:border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "What We Offer",
      description:
        "Comprehensive music courses covering composition, production, mixing, mastering, and more. Hands-on training with real-world applications. Industry-level expertise with over a decade of experience. A community-driven approach to music learning.",
      skeleton: <SkeletonTwo />,
      className: "border-0 md:border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
  ];

  return (
    <div id="about" className="relative z-20 py-10 md:-mt-10 lg:py-32 max-w-7xl mx-auto overflow-hidden">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          About Us
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-6 mx-auto text-neutral-600 text-center font-normal dark:text-neutral-300">
          Music Skill House is an innovative online platform designed for aspiring musicians, independent artists, and students who want to master the art of music. Our goal is to provide industry-relevant education, helping learners refine their craft and succeed in the music industry.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-8 xl:border rounded-2xl overflow-hidden shadow-lg dark:shadow-neutral-900/30 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
          
          {/* Integrated Show More button within the card grid for better visual continuity */}
          <div className="col-span-1 lg:col-span-6 py-6 md:py-8 flex justify-center items-center border-0 bg-gradient-to-t ">
            <Link href='/About'>
              <Button
                variant="default"
                className="text-sm md:text-base font-semibold bg-black rounded-full px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300 "
              >
                Discover More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      {/* <div className="absolute -z-10 top-20 right-0 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -z-10 bottom-20 left-0 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl" /> */}
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden transition-all duration-300 hover:bg-white/30 dark:hover:bg-neutral-800/30`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug font-semibold mb-2">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-base max-w-sm mx-0 text-left text-neutral-600 font-normal dark:text-neutral-300 my-3">
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-3 mx-auto dark:bg-neutral-900 shadow-xl rounded-xl group h-full overflow-hidden">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          <Image
            src="/assets/about/about5.jpg"
            alt="Music studio"
            width={800}
            height={800}
            className="h-full w-full object-cover object-left-top rounded-lg transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white/10 dark:from-black via-white/10 dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white/10 dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonTwo = () => {
  const images = [
    "/assets/about/about1.jpg",
    "/assets/about/about2.jpg",
    "/assets/about/about3.jpg",
    "/assets/about/about4.jpg",
    "/assets/about/about5.jpg",
    
  ];

  const imageVariants = {
    initial: {
      rotate: Math.random() * 20 - 10,
    },
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
      transition: { duration: 0.3 }
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  
  return (
    <div className="relative flex flex-col items-start p-4 md:p-8 gap-6 h-full overflow-hidden">
      
      {/* First row with images - hidden on small screens, visible on md and up */}
      <div className="hidden md:block">
        <div className="flex flex-row -ml-10">
          {images.slice(0, 3).map((image, idx) => (
            <motion.div
              initial="initial"
              variants={imageVariants}
              key={"images-first" + idx}
              whileHover="whileHover"
              whileTap="whileTap"
              className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={image}
                alt="music image"
                width="500"
                height="500"
                className="rounded-lg h-20 w-20 md:h-32 md:w-32 object-cover shrink-0"
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Second row with all images - visible on all screen sizes */}
      <div className="flex flex-row -ml-3 lg:-ml-68">
        {images.map((image, idx) => (
          <motion.div
            initial="initial"
            key={"images-second" + idx}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={image}
              alt="music image"
              width="500"
              height="500"
              className="rounded-lg h-24 w-24 md:h-32 md:w-32 object-cover shrink-0"
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlays for better visibility */}
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white/30 dark:from-black/80 to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white/30 dark:from-black/80 to-transparent h-full pointer-events-none" />
      <div className="absolute bottom-0 z-[100] inset-x-0 h-16 bg-gradient-to-t from-white/30 dark:from-black/80 to-transparent w-full pointer-events-none" />
    </div>
  );
};