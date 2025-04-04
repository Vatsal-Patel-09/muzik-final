export default function CourseRequirements() {
  // This would typically come from an API
  const requirements = [
    "No programming experience needed - I'll teach you everything you need to know",
    "A Mac or PC computer with access to the internet",
    "No paid software required - I'll teach you how to use PyCharm, Jupyter Notebooks and Google Colab",
    "I'll walk you through, step-by-step how to get all the software installed and set up",
  ]

  return (
    <section className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>

      <ul className="list-disc pl-5 space-y-3">
        {requirements.map((requirement, index) => (
          <li key={index} className="text-gray-700">
            {requirement}
          </li>
        ))}
      </ul>
    </section>
  )
}

