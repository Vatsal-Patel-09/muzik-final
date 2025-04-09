"use client"

import { useState } from "react"
import { Star, Users, Video, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"

interface CourseInstructorProps {
  course: any
}

export default function CourseInstructor({ course }: CourseInstructorProps) {
  const [showFullBio, setShowFullBio] = useState(false)

  // Extract instructor data from the API response
  // If course has instructor property, use it, otherwise build from individual properties
  const instructor = course.instructor || {
    name: course.instructorName || (Array.isArray(course) && course[0]?.instructorName) || "Course Instructor",
    title: course.instructorTitle || (Array.isArray(course) && course[0]?.instructorTitle) || "Instructor",
    rating: course.instructorRating || (Array.isArray(course) && course[0]?.instructorRating) || 4.5,
    reviewCount: course.instructorReviewCount || (Array.isArray(course) && course[0]?.instructorReviewCount) || 0,
    studentCount: course.instructorStudentCount || (Array.isArray(course) && course[0]?.instructorStudentCount) || 0,
    courseCount: course.instructorCourseCount || (Array.isArray(course) && course[0]?.instructorCourseCount) || 0,
    bio: course.instructorBio || (Array.isArray(course) && course[0]?.instructorBio) || "",
    profileImage: course.instructorImage || (Array.isArray(course) && course[0]?.instructorImage) || "/avatar.jpg",
  }

  // Truncate bio for display
  const shortBio = instructor.bio?.substring(0, 150) + (instructor.bio?.length > 150 ? "..." : "")

  return (
    <section className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>

      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Instructor profile image */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src={instructor.profileImage || "/avatar.jpg"}
                alt={instructor.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-grow">
            {/* Instructor name and title */}
            <h3 className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">{instructor.name}</h3>
            <p className="text-gray-600 mb-3">{instructor.title}</p>



            {/* Instructor bio */}
            {instructor.bio && (
              <>
                <div className="text-gray-700">
                  <p className="mb-3">{showFullBio ? instructor.bio : shortBio}</p>
                </div>

                {/* Show more/less button for bio if it's longer than 150 characters */}
                {instructor.bio?.length > 150 && (
                  <Button
                    variant="ghost"
                    className="transition-colors text-green-600 font-medium hover:text-green-800 p-0 flex items-center"
                    onClick={() => setShowFullBio(!showFullBio)}
                  >
                    {showFullBio ? (
                      <>
                        Show less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
