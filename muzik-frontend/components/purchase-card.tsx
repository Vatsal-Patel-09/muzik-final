"use client"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Award, Clock, BarChart } from "lucide-react"

interface PurchaseCardProps {
  course: any
}

export default function PurchaseCard({ course }: PurchaseCardProps) {
  // Extract course data from the API response
  // If course is an array, get the first item, otherwise use the course object directly
  const courseData = Array.isArray(course) ? course[0] : course

  // Get course details or set defaults
  const price = courseData?.price || "N/A"
  const currency = courseData?.currency || "₹"
  const title = courseData?.title || "Course Title"
  const paymentUrl = courseData?.paymentUrl
  const duration = courseData?.duration || "Self-paced"
  const level = courseData?.level || "All Levels"
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
        <div className="p-6">
          {/* Course price */}
          <div className="text-3xl font-bold text-gray-900 mb-4">
            {currency} {price}
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
            <h3 className="font-semibold text-gray-900">This course includes:</h3>

            <div className="space-y-3">
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-medium">Course Duration</p>
                  <p className="text-gray-600">{duration}</p>
                </div>
              </div>

              <div className="flex items-start">
                <BarChart className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-medium">Difficulty Level</p>
                  <p className="text-gray-600">{level}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Award className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-medium">Total Lessons</p>
                  <p className="text-gray-600">{totalLessons} lessons</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}


// // purchase-card.tsx
// "use client"
// import { Button } from "@/components/ui/button"
// import { Tabs } from "@/components/ui/tabs"
// import { ShoppingCart, Clock, BarChart, Award } from "lucide-react"
// import { useRouter } from "next/navigation"

// interface PurchaseCardProps {
//   course: any
//   purchasedCourses?: any[]
// }

// export default function PurchaseCard({ course, purchasedCourses }: PurchaseCardProps) {
//   // If course is an array, get the first item, otherwise use it directly
//   const courseData = Array.isArray(course) ? course[0] : course

//   // Get course details or set defaults
//   const price = courseData?.price || "N/A"
//   const currency = courseData?.currency || "₹"
//   const title = courseData?.title || "Course Title"
//   const paymentUrl = courseData?.paymentUrl
//   const duration = courseData?.duration || "Self-paced"
//   const level = courseData?.level || "All Levels"
//   const totalLessons = courseData?.playlist?.[0]?.modules?.length || 0

//   const router = useRouter()

//   // Check if the current course is already purchased.
//   // Adjust the identifier property based on your data structure (e.g., courseData.id or courseData._id).
//   const isPurchased = purchasedCourses?.some(
//     (purchasedCourse) => purchasedCourse?.id === courseData?.id
//   )

//   // Handle payment gateway redirect for courses not yet purchased.
//   const handlePaymentGateway = () => {
//     try {
//       if (paymentUrl) {
//         window.open(paymentUrl, "_blank")
//       } else {
//         console.error("Payment URL not found in course data")
//       }
//     } catch (error) {
//       console.error("Error opening payment URL:", error)
//     }
//   }

//   // Handler to redirect to purchased course page
//   const goToCourse = () => {
//     router.push("/purchased-courses")
//   }

//   return (
//     <div className="border rounded-xl overflow-hidden shadow-lg mx-auto bg-white animate-fadeIn sticky top-6">
//       <Tabs defaultValue="personal" className="w-full">
//         <div className="p-6">
//           {/* Course price */}
//           <div className="text-3xl font-bold text-gray-900 mb-4">
//             {currency} {price}
//           </div>

//           {/* Purchase button (or go to course if already purchased) */}
//           <div className="space-y-3 mb-6">
//             {isPurchased ? (
//               <Button
//                 onClick={goToCourse}
//                 className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white"
//                 size="lg"
//               >
//                 {/* You can include an appropriate icon here if desired */}
//                 Go to course
//               </Button>
//             ) : (
//               <Button
//                 onClick={handlePaymentGateway}
//                 className="w-full py-6 bg-green-600 hover:bg-green-700 text-white"
//                 size="lg"
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" /> Buy now
//               </Button>
//             )}
//           </div>

//           {/* Course details */}
//           <div className="space-y-4 text-sm">
//             <h3 className="font-semibold text-gray-900">This course includes:</h3>

//             <div className="space-y-3">
//               <div className="flex items-start">
//                 <Clock className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
//                 <div>
//                   <p className="text-gray-900 font-medium">Course Duration</p>
//                   <p className="text-gray-600">{duration}</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <BarChart className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
//                 <div>
//                   <p className="text-gray-900 font-medium">Difficulty Level</p>
//                   <p className="text-gray-600">{level}</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <Award className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
//                 <div>
//                   <p className="text-gray-900 font-medium">Total Lessons</p>
//                   <p className="text-gray-600">{totalLessons} lessons</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Tabs>
//     </div>
//   )
// }
