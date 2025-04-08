"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, File, Play, Code } from "lucide-react"
import { Button } from "./ui/button"

interface CourseContentProps {
  course: any;
}

export default function CourseContent({ course }: CourseContentProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([0])
  
  // Extract content from the course data or use default content
  const sections = course.sections || [
    {
      id: 1,
      title: "Introduction to the Course",
      lectures: 5,
      duration: "45min",
      content: [
        { id: 1, title: "Getting Started", duration: "05:27", type: "video", preview: true },
        { id: 2, title: "Course Overview", duration: "07:53", type: "video" },
        { id: 3, title: "Setup Instructions", duration: "08:22", type: "document" },
      ]
    },
    {
      id: 2,
      title: "Basic Concepts",
      lectures: 6,
      duration: "1hr 10min",
      content: []
    },
    {
      id: 3,
      title: "Advanced Topics",
      lectures: 8,
      duration: "1hr 30min",
      content: []
    }
  ];

  const bonusContent = course[0].bonusContent;
  const faq = course[0].faq[0];
  

  // Calculate totals
  const totalSections = course.sectionCount || sections.length;
  const totalLectures = course.lectureCount || sections.reduce((acc, section) => acc + section.lectures, 0);
  const totalHours = course.totalDuration || "10h";

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
        {totalSections} sections • {totalLectures} lectures • {totalHours} total length
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
                {(section.content || []).map((lecture) => (
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

