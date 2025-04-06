import { Star, Users, Video } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"

export default function CourseInstructor() {
  // This would typically come from an API
  const instructor = {
    name: "Dr. Angela Yu",
    title: "Developer and Lead Instructor",
    rating: 4.7,
    reviewCount: 948517,
    studentCount: 3114720,
    courseCount: 7,
    bio: "I'm Angela, I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees.",
    profileImage: "/placeholder.svg?height=200&width=200",
  }

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
              <span className="ml-2 text-gray-700">{instructor.reviewCount.toLocaleString()} Reviews</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-700" />
              <span className="ml-2 text-gray-700">{instructor.studentCount.toLocaleString()} Students</span>
            </div>
            <div className="flex items-center">
              <Video className="w-5 h-5 text-gray-700" />
              <span className="ml-2 text-gray-700">{instructor.courseCount} Courses</span>
            </div>
          </div>

          <div className="text-gray-700">
            <p className="mb-3">{instructor.bio}</p>
            <p className="mb-3">
              My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader
              game. Since then, I've made hundreds of websites, apps and games. But most importantly, I realized that my
              greatest passion is teaching.
            </p>
          </div>

          <Button variant='outline' className="transition-colors mt-2  text-green-600 font-medium hover:text-green-800">
            Show more
          </Button>
        </div>
      </div>
    </section>
  )
}

