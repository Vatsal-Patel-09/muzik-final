"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface Company {
  name: string;
  logo: string;
  description?: string;
}

const companies: Company[] = [
  {
    name: "Universal Music",
    logo: "/images/companies/universal.png",
    description: "Leading global music corporation"
  },
  {
    name: "Sony Music",
    logo: "/images/companies/sony.png",
    description: "Worldwide music entertainment company"
  },
  {
    name: "Warner Music Group",
    logo: "/images/companies/warner.png",
    description: "International music publishing and recording"
  },
  {
    name: "Spotify",
    logo: "/images/companies/spotify.png",
    description: "Digital music streaming service"
  },
  {
    name: "Apple Music",
    logo: "/images/companies/apple.png",
    description: "Music and video streaming service"
  },
  {
    name: "Yamaha",
    logo: "/images/companies/yamaha.png",
    description: "Musical instruments and audio equipment"
  },
];

export const TopCompanies = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Our graduates work with the world's top music companies and brands
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 bg-zinc-900/50 rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
            >
              <div className="h-16 w-32 relative flex items-center justify-center mb-3">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-sm text-gray-300 font-medium">{company.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;
