
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        src="/hero/hero.mp4"
        loop
        muted
        autoPlay
        playsInline
        className="absolute inset-0 w-full mx-auto object-cover z-0 h-screen"
      />

      {/* Overlay with shadow/gradient */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full w-full px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
            Master the Art of <br /> Music – Learn, Create, and Elevate!
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Your Gateway to Professional Music Education
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <Link href='/login'>
              <Button size="lg" className="font-medium w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="#courses">
              <Button
                variant="outline"
                size="lg"
                className="font-medium bg-transparent text-white border-white hover:bg-white/10 w-full sm:w-auto"
              >
                Explore
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
