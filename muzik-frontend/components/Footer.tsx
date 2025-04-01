"use client";

import Link from "next/link"

import { Button } from "./ui/button"


export default function Footer() {
  return (
    <footer className=" pt-16 pb-12">
      <div className="container mx-auto px-6">
        <div className="hidden md:flex md:flex-row justify-around items-center gap-20">
          <div className="ml-[-120px]">
            <h3 className="font-bold text-lg mb-4">MUZIK Skill House</h3>
            <p className="text-sm text-gray-300">Unlock Your Musical Potential with Our Expert-Curated Courses</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="flex flex-row gap-6">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-sm text-gray-300 hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; 2025 Muzik Skill House. All rights reserved.</p>
            <div>
              
            </div>
          <div className="flex flex-col space-y-4 md:mt-0 text-gray-500 ">


             <div className="flex flex-row gap-4">
             <Button variant='link' className="text-white"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/tnc.pdf"; // Replace with the actual path to your PDF
                  link.download = "Terms and Confitions (MUZIK Skill House)"; // Replace with the desired file name
                  link.click();
                }}
              >
                Terms of use
              </Button>
                <Link href='https://merchant.razorpay.com/policy/Q72SJo2YuNMqTd/terms'><Button variant="link" className="text-white">Terms and Conditions</Button></Link>
                <Link href='https://merchant.razorpay.com/policy/Q72SJo2YuNMqTd/refund'><Button variant="link" className="text-white">Cancellations and Refunds</Button></Link>
                <Link href='https://merchant.razorpay.com/policy/Q72SJo2YuNMqTd/privacy'><Button variant="link" className="text-white">Privacy Policy</Button></Link>
             </div>
             

          </div>
        </div>
      </div>
    </footer>
  )
}

