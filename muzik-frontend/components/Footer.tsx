"use client";

import Link from "next/link"
import { Button } from "./ui/button"

export default function Footer() {
  return (
    <footer className="pt-8 md:pt-16 pb-8 md:pb-12 flex">
      <div className="container mx-auto px-4 md:px-6 flex flex-col w-full">
        {/* Top section - visible on all devices */}
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-8 md:gap-20">
          <div className="text-center md:text-left md:ml-[-120px]">
            <h3 className="font-bold text-lg mb-2 md:mb-4">MUZIK Skill House</h3>
            <p className="text-sm text-gray-800 max-w-xs">Unlock Your Musical Potential with Our Expert-Curated Courses</p>
          </div>
          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold mb-3 md:mb-4 text-center md:text-left">Explore</h4>
            <ul className="flex flex-wrap justify-center md:flex-row gap-4 md:gap-6">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-black">Home</Link></li>
              <li><Link href="/About" className="text-sm text-gray-600 hover:text-black">About us</Link></li>
              <li><Link href="#courses" className="text-sm text-gray-600 hover:text-black">Courses</Link></li>
              <li><Link href="#contact" className="text-sm text-gray-600 hover:text-black">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright and legal links */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col mx-0 md:mx-20 md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-gray-600 text-center md:text-left mb-4 md:mb-0">
            &copy; 2025 Muzik Skill House. All rights reserved.
          </p>

          <div className="flex flex-col items-center justify-center md:flex-row gap-2 md:gap-4">
            <Button variant='link' className="text-black text-xs md:text-sm py-1"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/tnc.pdf";
                link.download = "Terms and Confitions (MUZIK Skill House)";
                link.click();
              }}
            >
              Terms of use
            </Button>
            <Link href='https://merchant.razorpay.com/policy/Q72SJo2YuNMqTd/terms'>
              <Button variant="link" className="text-black text-xs md:text-sm py-1">Terms and Conditions</Button>
            </Link>
            <Link href='https://merchant.razorpay.com/policy/Q72SJo2YuNMqTd/refund'>
              <Button variant="link" className="text-black text-xs md:text-sm py-1">Cancellations and Refunds</Button>
            </Link>
            <Link href='https://merchant.razorpay.com/policy/Q72SJo2YuNMqTd/privacy'>
              <Button variant="link" className="text-black text-xs md:text-sm py-1">Privacy Policy</Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
