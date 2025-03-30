"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Who We Are",
    description:
      "Music Skill House is an innovative online platform designed for aspiring musicians, independent artists, and students who want to master the art of music. Our goal is to provide industry-relevant education, helping learners refine their craft and succeed in the music industry.",
      content: (
        <div className="flex h-full w-full items-center justify-center text-white">
          <Image
            src="/assets/about/whoweare.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
  },
  {
    title: "Our Mission",
    description:
      "To empower musicians of all levels with expert knowledge, hands-on training, and professional insights, bridging the gap between passion and success.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/about/ourmission.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "What We Offer",
    description: (
      <div className="flex flex-col gap-2">
        <p>✅ Comprehensive music courses covering composition, production, mixing, mastering, and more.</p>
        <p>✅ Hands-on training with real-world applications.</p>
        <p>✅ Industry-level expertise with over a decade of experience.</p>
        <p>✅ A community-driven approach to music learning.</p>
      </div>
    ),
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/about/whatweoffer.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export function About() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
