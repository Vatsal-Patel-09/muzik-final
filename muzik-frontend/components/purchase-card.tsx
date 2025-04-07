"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

interface PurchaseCardProps {
  course: {
    price: number
    currency: string
    isPremium: boolean
    paymentUrl?: string
  }
}

export default function PurchaseCard({ course }: PurchaseCardProps) {
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [showCouponInput, setShowCouponInput] = useState(false)

  console.log("Course details:", course)

  // const handleApplyCoupon = () => {
  //   if (couponCode.trim()) {
  //     setCouponApplied(true)
  //   }
  // }
  console.log("this is new name ", course?.[0])

  const handlePaymentGateway = () => {
    try {
      const url = course?.[0]?.paymentUrl || "";
      window.open(url, '_blank');
    } catch (error) {
      console.error("Error opening payment URL:", error);
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white animate-fadeIn">
      <Tabs defaultValue="personal" className="w-full">
        {/* <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal" className="data-[state=active]:bg-gray-100">
            Personal
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-gray-100">
            Teams
          </TabsTrigger>
        </TabsList> */}

        <div className="p-6">
          {course.isPremium && (
            <div className="flex items-start mb-4">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="ml-2 text-gray-700">This Premium course is included in plans</p>
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-900 mb-1">Subscribe to Udemy's top courses</h3>
          <p className="text-gray-700 mb-4">
            Get this course, plus 12,000+ of our top-rated courses, with Personal Plan.{" "}
            <span className="text-green-600 font-medium hover:text-green-800 transition-colors cursor-pointer">
              Learn more
            </span>
          </p>

          <p className="text-center text-sm text-gray-600 mb-1">Starting at ₹850 per month</p>
          <p className="text-center text-sm text-gray-600 mb-4">Cancel anytime</p>

          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-gray-200 absolute w-full"></div>
            <span className="bg-white px-2 text-gray-500 text-sm relative">or</span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {course.currency}
            {course.price}
          </div>

          <Button
            onClick={() => handlePaymentGateway()}
            variant="outline"
            className="w-full py-6 mb-4 border-gray-300 hover:bg-gray-50 transition-all"
            size="lg"
            style={{ cursor: "pointer" }}
          >
            Buy now
          </Button>
{/* 
          <p className="text-center text-sm text-gray-600 mb-1">30-Day Money-Back Guarantee</p>
          <p className="text-center text-sm text-gray-600 mb-4">Full Lifetime Access</p> */}

          {/* <div className="flex justify-center space-x-4 text-sm">
            <Button variant='outline' className="text-gray-700 hover:text-gray-900 transition-colors">Share</Button>
            <Button variant='outline' className="text-gray-700 hover:text-gray-900 transition-colors">Gift this course</Button>
            <Button variant='outline'
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setShowCouponInput(!showCouponInput)}
            >
              Apply Coupon
            </Button>
          </div> */}

          {/* {showCouponInput && (
            <div className="mt-4 animate-slideDown">
              {couponApplied ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="ml-2 text-gray-700 font-medium">{couponCode}</span>
                    <span className="ml-2 text-gray-500">is applied</span>
                  </div>
                  <Button onClick={() => setCouponApplied(false)}>
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter Coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleApplyCoupon} className="bg-green-600 hover:bg-green-700">
                    Apply
                  </Button>
                </div>
              )}
            </div>
          )} */}
        </div>
      </Tabs>
    </div>
  )
}

