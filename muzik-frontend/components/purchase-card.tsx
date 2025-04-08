"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"

interface PurchaseCardProps {
  course: any;
}

export default function PurchaseCard({ course }: PurchaseCardProps) {
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [showCouponInput, setShowCouponInput] = useState(false)

  const handlePaymentGateway = () => {
    try {
      // Try to get payment URL directly or from nested data structure
      let paymentUrl;
      if (course.paymentUrl) {
        paymentUrl = course.paymentUrl;
      } else if (Array.isArray(course) && course[0]?.paymentUrl) {
        paymentUrl = course[0].paymentUrl;
      } else {
        paymentUrl = "https://example.com/payment";
      }
      
      window.open(paymentUrl, '_blank');
    } catch (error) {
      console.error("Error opening payment URL:", error);
    }
  }

  // Determine course price and currency
  const price = course.price || (Array.isArray(course) && course[0]?.price);
  const currency = course.currency || (Array.isArray(course) && course[0]?.currency) || "₹";

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg mx-auto bg-white animate-fadeIn">
      <Tabs defaultValue="personal" className="w-full">
        <div className="p-6">


          <h3 className="text-xl font-bold text-gray-900 mb-1">{course[0].title}</h3>
          <p className="text-gray-700 mb-4">
            Get this course, and enjoy it get the full access to all the course contents.{" "}
            <span className="text-green-600 font-medium hover:text-green-800 transition-colors cursor-pointer">
              Learn more
            </span>
          </p>

          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-gray-200 absolute w-full"></div>
            <span className="bg-white px-2 text-gray-500 text-sm relative">or</span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {currency} {price}
          </div>

          <Button
            onClick={() => handlePaymentGateway()}
            variant="outline"
            className="w-full py-6 mb-4 border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
            size="lg"
          >
            Buy now
          </Button>
        </div>
      </Tabs>
    </div>
  )
}

