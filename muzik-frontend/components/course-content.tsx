"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, File, Play, Code } from "lucide-react"
import { Button } from "./ui/button"

interface CourseContentProps {
  course: {
    totalSections: number
    totalLectures: number
    totalHours: number
  }
}

export default function CourseContent({ course }: CourseContentProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([0])

  // This would typically come from an API
  const sections = [
    {
      id: 1,
      title: "Day 1 - Beginner - Working with Variables in Python to Manage Data",
      lectures: 12,
      duration: "1hr 12min",
      content: [
        { id: 1, title: "What you're going to get from this course", duration: "03:27", type: "video", preview: true },
        { id: 2, title: "START HERE", duration: "02:53", type: "video" },
        {
          id: 3,
          title: "Downloadable Resources and Tips for Taking the Course",
          duration: "04:22",
          type: "video",
          preview: true,
        },
        { id: 4, title: "Day 1 Goals: what we will make by the end of the day", duration: "02:30", type: "video" },
        { id: 5, title: "Download and Setup PyCharm for Learning", duration: "01:25", type: "document" },
        { id: 6, title: "Printing to the Console in Python", duration: "11:25", type: "video" },
        { id: 7, title: "Printing Practice", duration: "1 question", type: "exercise" },
        { id: 8, title: "String Manipulation and Code Intelligence", duration: "09:13", type: "video" },
        { id: 9, title: "Debugging Practice", duration: "1 question", type: "exercise" },
        { id: 10, title: "The Python Input Function", duration: "12:35", type: "video" },
        { id: 11, title: "Python Variables", duration: "13:02", type: "video" },
        { id: 12, title: "Variable Naming", duration: "04:23", type: "video" },
      ],
    },
    {
      id: 2,
      title: "Day 2 - Beginner - Understanding Data Types and How to Manipulate Strings",
      lectures: 7,
      duration: "58min",
      content: [],
    },
    {
      id: 3,
      title: "Day 3 - Beginner - Control Flow and Logical Operators",
      lectures: 10,
      duration: "1hr 15min",
      content: [],
    },
    {
      id: 4,
      title: "Day 4 - Beginner - Randomisation and Python Lists",
      lectures: 7,
      duration: "1hr 4min",
      content: [],
    },
    {
      id: 5,
      title: "Day 5 - Beginner - Python Loops",
      lectures: 6,
      duration: "41min",
      content: [],
    },
  ]

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections((prev) => {
      if (prev.includes(sectionIndex)) {
        return prev.filter((i) => i !== sectionIndex)
      } else {
        return [...prev, sectionIndex]
      }
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />
      case "document":
        return <File className="w-4 h-4" />
      case "exercise":
        return <Code className="w-4 h-4" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  return (
    <section className="border-t border-gray-200 pt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Course content</h2>
        <Button variant='outline'
          className="text-green-500 font-medium hover:text-green-700 transition-colors"
          onClick={() => {
            if (expandedSections.length === sections.length) {
              setExpandedSections([])
            } else {
              setExpandedSections(sections.map((_, i) => i))
            }
          }}
        >
          {expandedSections.length === sections.length ? "Collapse all sections" : "Expand all sections"}
        </Button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        {course.totalSections} sections • {course.totalLectures} lectures • {course.totalHours}h total length
      </div>

      <div className="border rounded-lg overflow-hidden divide-y">
        {sections.map((section, index) => (
          <div key={section.id} className="bg-gray-50">
            <button
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-100 transition-colors"
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center text-left">
                {expandedSections.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 mr-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 mr-2" />
                )}
                <span className="font-medium text-gray-900">{section.title}</span>
              </div>
              <div className="text-sm text-gray-600">
                {section.lectures} lectures • {section.duration}
              </div>
            </button>

            {expandedSections.includes(index) && (
              <div className="bg-white divide-y">
                {section.content.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="px-6 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-gray-500">{getIcon(lecture.type)}</span>
                      <span className="text-gray-900">{lecture.title}</span>
                      {lecture.preview && <span className="ml-2 text-green-600 text-sm font-medium">Preview</span>}
                    </div>
                    <span className="text-sm text-gray-600">{lecture.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

