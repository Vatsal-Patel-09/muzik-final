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
    name: "Muzik Bazar",
    logo: "/assets/companylogo/1.png",
    description: "Leading global music corporation"
  },
  {
    name: "God Grace Studio",
    logo: "/assets/companylogo/2.png",
    description: "Worldwide music entertainment company"
  },
  {
    name: "G8",
    logo: "/assets/companylogo/3.png",
    description: "International music publishing and recording"
  },
  {
    name: "God Grace Records",
    logo: "/assets/companylogo/4.png",
    description: "Digital music streaming service"
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center mx-auto max-w-4xl">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 bg-zinc-900/50 rounded-lg hover:bg-zinc-800/100 transition-all duration-300 w-full"
            >
              <div className="h-36 w-72 relative flex items-center justify-center">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div> 
      </div>
    </section>
  );
};

export default TopCompanies;
