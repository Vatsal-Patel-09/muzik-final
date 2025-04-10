"use client"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Award, Clock, BarChart, ArrowLeft, ArrowRight } from "lucide-react"

interface PurchaseCardProps {
  course: any
}

export default function PurchaseCard({ course }: PurchaseCardProps) {
  // Extract course data from the API response
  // If course is an array, get the first item, otherwise use the course object directly
  const courseData = Array.isArray(course) ? course[0] : course

  // Get course details or set defaults
  const price = courseData?.price || "N/A"
  const title = courseData?.courseTitle || "Course Title"
  const paymentUrl = courseData?.paymentUrl
  const duration = courseData?.duration || "Self-paced"
  const callToAction = courseData?.callToAction || "Enroll Now"
  const totalLessons = courseData?.playlist?.[0]?.modules?.length || 0

  // Handle payment gateway redirect
  const handlePaymentGateway = () => {
    try {
      if (paymentUrl) {
        window.open(paymentUrl, "_blank")
      } else {
        console.error("Payment URL not found in course data")
      }
    } catch (error) {
      console.error("Error opening payment URL:", error)
    }
  }

  return (
    <div className="border rounded-xl overflow-hidden shadow-lg mx-auto bg-white animate-fadeIn sticky top-6">
      <Tabs defaultValue="personal" className="w-full">
        <h1 className="text-[25px] p-5 font-semibold">{title}</h1>
        <div className="p-6">
          {/* Course price */}
          <div className="text-3xl font-bold -mt-8 text-gray-900 mb-4">
            {price}
          </div>

          {/* Purchase buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={handlePaymentGateway}
              className="w-full py-6 bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Buy now
            </Button>
          </div>

          {/* Course details */}
          <div className="space-y-4 text-sm">
            

            <div className="space-y-3">
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-medium">Course Duration</p>
                  <p className="text-gray-600">{duration}</p>
                </div>
              </div>

              <div className="flex items-start">
                <ArrowRight className="w-10 h-10 text-gray-700 -ml-1  mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-600 font-medium">{callToAction}</p>
                </div>
              </div>
              

              
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
