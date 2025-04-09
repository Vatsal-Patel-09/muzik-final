"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="py-8 md:pt-16 md:pb-12 w-full">
      <div className="container mx-auto px-4 md:px-6 flex flex-col w-full">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 md:gap-12 lg:gap-20">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-2 md:mb-4">MUZIK Skill House</h3>
            <p className="text-sm text-gray-800 max-w-xs md:max-w-sm">
              Unlock Your Musical Potential with Our Expert-Curated Courses
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <h4 className="font-semibold mb-2 md:mb-4 text-center md:text-left">Explore</h4>
            <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/About" className="text-sm text-gray-600 hover:text-black">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm text-gray-600 hover:text-black">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm text-gray-600 hover:text-black">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and legal links */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">
            &copy; 2025 Muzik Skill House. All rights reserved.
          </p>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <Button
              variant="link"
              className="text-black text-xs md:text-sm py-1 flex items-center justify-center"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/tnc.pdf";
                link.download = "Terms and Confitions (MUZIK Skill House)";
                link.click();
              }}
            >
              Terms of use
            </Button>
            <Link
              className="flex items-center justify-center"
              href="https://merchant.razorpay.com/policy/Q72SJo2YuNMqTd/terms"
            >
              <Button variant="link" className="text-black text-xs md:text-sm py-1">
                Terms and Conditions
              </Button>
            </Link>
            <Link
              className="flex items-center justify-center"
              href="https://merchant.razorpay.com/policy/Q72SJo2YuNMqTd/refund"
            >
              <Button variant="link" className="text-black text-xs md:text-sm py-1">
                Cancellations and Refunds
              </Button>
            </Link>
            <Link
              className="flex items-center justify-center"
              href="https://merchant.razorpay.com/policy/Q72SJo2YuNMqTd/privacy"
            >
              <Button variant="link" className="text-black text-xs md:text-sm py-1">
                Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
