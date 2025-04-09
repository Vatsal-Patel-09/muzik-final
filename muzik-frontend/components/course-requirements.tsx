import { Info } from "lucide-react"

interface CourseRequirementsProps {
  course: any
}

export default function CourseRequirements({ course }: CourseRequirementsProps) {
  // Extract target audience data from the API response
  // If course is an array, get the first item, otherwise use the course object directly
  const courseData = Array.isArray(course) ? course[0] : course

  // Get target audience array or default to empty array
  const targetAudience = courseData?.targetAudience || []

  // If no target audience data, don't render the component
  if (!targetAudience || targetAudience.length === 0) {
    return null
  }

  return (
    <section className="border-t border-gray-200 pt-8">
      <div className="bg-blue-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3">
            <Info className="w-5 h-5" />
          </span>
          Who this course is for
        </h2>

        <ul className="space-y-4">
          {/* Map through target audience items */}
          {targetAudience.map((audience: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-semibold mr-3 flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-700">{audience}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
