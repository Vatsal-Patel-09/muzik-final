interface CourseRequirementsProps {
  course: any;
}

export default function CourseRequirements({ course }: CourseRequirementsProps) {
  // Extract requirements from course data or use defaults
  const targetAudience = course[0].targetAudience 

  return (
    <section className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Target Audience</h2>

      <ul className="list-disc pl-5 space-y-3">
        {targetAudience.map((targetAudience, index) => (
          <li key={index} className="text-gray-700">
            {targetAudience}
          </li>
        ))}
      </ul>
    </section>
  )
}

