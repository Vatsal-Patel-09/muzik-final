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
  }
}

export default function PurchaseCard({ course }: PurchaseCardProps) {
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [showCouponInput, setShowCouponInput] = useState(false)

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setCouponApplied(true)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white animate-fadeIn">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal" className="data-[state=active]:bg-gray-100">
            Personal
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-gray-100">
            Teams
          </TabsTrigger>
        </TabsList>

        <div className="p-6">
          {course.isPremium && (
            <div className="flex items-start mb-4">
              <Check className="w-5 h-5 text-purple-600 mt-0.5" />
              <p className="ml-2 text-gray-700">This Premium course is included in plans</p>
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-900 mb-1">Subscribe to Udemy's top courses</h3>
          <p className="text-gray-700 mb-4">
            Get this course, plus 12,000+ of our top-rated courses, with Personal Plan.{" "}
            <span className="text-purple-600 font-medium hover:text-purple-700 transition-colors cursor-pointer">
              Learn more
            </span>
          </p>

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 mb-2 transition-all hover:shadow-md"
            size="lg"
          >
            Start subscription
          </Button>

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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 mb-3 transition-all hover:shadow-md"
            size="lg"
          >
            Add to cart
          </Button>

          <Button
            variant="outline"
            className="w-full py-6 mb-4 border-gray-300 hover:bg-gray-50 transition-all"
            size="lg"
          >
            Buy now
          </Button>

          <p className="text-center text-sm text-gray-600 mb-1">30-Day Money-Back Guarantee</p>
          <p className="text-center text-sm text-gray-600 mb-4">Full Lifetime Access</p>

          <div className="flex justify-center space-x-4 text-sm">
            <button className="text-gray-700 hover:text-gray-900 transition-colors">Share</button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">Gift this course</button>
            <button
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setShowCouponInput(!showCouponInput)}
            >
              Apply Coupon
            </button>
          </div>

          {showCouponInput && (
            <div className="mt-4 animate-slideDown">
              {couponApplied ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="ml-2 text-gray-700 font-medium">{couponCode}</span>
                    <span className="ml-2 text-gray-500">is applied</span>
                  </div>
                  <button onClick={() => setCouponApplied(false)}>
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter Coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleApplyCoupon} className="bg-purple-600 hover:bg-purple-700">
                    Apply
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  )
}

