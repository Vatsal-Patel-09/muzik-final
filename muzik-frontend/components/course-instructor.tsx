import { Star, Users, Video } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { useState } from "react"

interface CourseInstructorProps {
  course: any;
}

export default function CourseInstructor({ course }: CourseInstructorProps) {
  const [showFullBio, setShowFullBio] = useState(false);
  
  // Extract instructor data from course or use default
  const instructor = course.instructor || {
    name: course.instructorName || "Course Instructor",
    title: course.instructorTitle || "Instructor",
    rating: course.instructorRating || 4.5,
    reviewCount: course.instructorReviewCount || 1000,
    studentCount: course.instructorStudentCount || 10000,
    courseCount: course.instructorCourseCount || 5,
    bio: course.instructorBio || "This instructor is passionate about teaching and has helped many students master this subject.",
    profileImage: course.instructorImage || "/placeholder.svg",
  };

  // Truncate bio for display
  const shortBio = instructor.bio?.substring(0, 150) + (instructor.bio?.length > 150 ? "..." : "");

  return (
    <section className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src={instructor.profileImage || "/placeholder.svg"}
              alt={instructor.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-medium text-neutral-600 hover:text-neutral-800 transition-colors">
            {instructor.name}
          </h3>
          <p className="text-gray-600 mb-3">{instructor.title}</p>

          <div className="flex flex-wrap gap-y-2 gap-x-6 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-gray-700" />
              <span className="ml-2 text-gray-700">{instructor.rating} Instructor Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-700" />
              <span className="ml-2 text-gray-700">{instructor.reviewCount?.toLocaleString()} Reviews</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-700" />
              <span className="ml-2 text-gray-700">{instructor.studentCount?.toLocaleString()} Students</span>
            </div>
            <div className="flex items-center">
              <Video className="w-5 h-5 text-gray-700" />
              <span className="ml-2 text-gray-700">{instructor.courseCount} Courses</span>
            </div>
          </div>

          <div className="text-gray-700">
            <p className="mb-3">{showFullBio ? instructor.bio : shortBio}</p>
          </div>

          {instructor.bio?.length > 150 && (
            <Button 
              variant='outline' 
              className="transition-colors mt-2 text-green-600 font-medium hover:text-green-800"
              onClick={() => setShowFullBio(!showFullBio)}
            >
              {showFullBio ? "Show less" : "Show more"}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

