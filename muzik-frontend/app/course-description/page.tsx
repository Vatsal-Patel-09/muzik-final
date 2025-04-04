import CourseHeader from "@/components/course-header"
import CourseContent from "@/components/course-content"
import CourseDescription from "@/components/course-description"
import CourseRequirements from "@/components/course-requirements"
import CourseInstructor from "@/components/course-instructor"
import PurchaseCard from "@/components/purchase-card"

export default function CoursePage() {
  // This would typically come from an API or database
  const courseData = {
    id: "python-bootcamp",
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    rating: 4.7,
    ratingCount: 361653,
    studentCount: 1545519,
    isBestseller: true,
    price: 3299,
    currency: "₹",
    description:
      "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video URL
    isPremium: true,
    lastUpdated: "4/2023",
    language: "English",
    subtitles: ["English", "Arabic [Auto]"],
    totalHours: 50.5,
    totalLectures: 592,
    totalSections: 101,
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseHeader course={courseData} />

            <div className="mt-8 space-y-8">
              <CourseDescription course={courseData} />
              <CourseContent course={courseData} />
              <CourseRequirements />
              <CourseInstructor />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <PurchaseCard course={courseData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

