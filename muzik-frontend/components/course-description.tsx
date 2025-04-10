"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp, Target, BookOpen, Gift, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface CourseDescriptionProps {
  course: any
}

export default function CourseDescription({ course }: CourseDescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    whatYoullLearn: false,
    courseFormat: false,
    targetAudience: false,
    bonusMaterials: false
  })

  // Extract data from the course API response
  const description = course[0]?.description || "No description available for this course."
  const whatYoullLearn = course[0]?.whatYoullLearn || []
  const whyTakeThisCourse = course[0]?.whyTakeThisCourse || []
  const courseFormat = course[0]?.courseFormat || []
  const targetAudience = course[0]?.targetAudience || []
  const bonusMaterials = course[0]?.bonusMaterials || []

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    })
  }

  return (
    <section className="border-t border-gray-200 pt-8 space-y-10">
      {/* Course description section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-green-600" />
          Description
        </h2>

        <div className={`relative ${!expandedSections.description && description.length > 400 ? "max-h-[280px] overflow-hidden" : ""}`}>
          {!expandedSections.description && description.length > 400 && (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
          )}

          <p className="text-gray-700 whitespace-pre-line">{description}</p>
        </div>

        {description.length > 400 && (
          <Button
            variant="outline"
            onClick={() => toggleSection('description')}
            className="mt-4 text-green-600 font-medium hover:text-green-800 transition-colors flex items-center"
          >
            {expandedSections.description ? (
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
      </div>

      {/* What you'll learn section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="bg-green-100 text-green-800 p-2 rounded-lg mr-3">
            <Check className="w-5 h-5" />
          </span>
          What you'll learn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {whatYoullLearn.slice(0, expandedSections.whatYoullLearn ? whatYoullLearn.length : 8).map((point: string, index: number) => (
            <div key={index} className="flex">
              <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <p className="ml-3 text-gray-700">{point}</p>
            </div>
          ))}
        </div>

        {whatYoullLearn.length > 8 && (
          <Button
            variant="ghost"
            onClick={() => toggleSection('whatYoullLearn')}
            className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center"
          >
            {expandedSections.whatYoullLearn ? (
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
      </div>

      {/* Why take this course section */}
      {whyTakeThisCourse.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3">
              <Check className="w-5 h-5" />
            </span>
            Why take this course?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyTakeThisCourse.map((point: string, index: number) => (
              <div key={index} className="flex">
                <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="ml-3 text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course format section */}
      {courseFormat.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-purple-100 text-purple-800 p-2 rounded-lg mr-3">
              <BookOpen className="w-5 h-5" />
            </span>
            Course Format
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseFormat.slice(0, expandedSections.courseFormat ? courseFormat.length : 6).map((point: string, index: number) => (
              <div key={index} className="flex">
                <Check className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <p className="ml-3 text-gray-700">{point}</p>
              </div>
            ))}
          </div>

          {courseFormat.length > 6 && (
            <Button
              variant="ghost"
              onClick={() => toggleSection('courseFormat')}
              className="mt-4 text-purple-600 font-medium hover:text-purple-800 transition-colors flex items-center"
            >
              {expandedSections.courseFormat ? (
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
        </div>
      )}

      {/* Target audience section */}
      {targetAudience.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-orange-100 text-orange-800 p-2 rounded-lg mr-3">
              <Target className="w-5 h-5" />
            </span>
            Who is this course for?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targetAudience.map((point: string, index: number) => (
              <div key={index} className="flex">
                <Check className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <p className="ml-3 text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bonus materials section */}
      {bonusMaterials.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-yellow-100 text-yellow-800 p-2 rounded-lg mr-3">
              <Gift className="w-5 h-5" />
            </span>
            Bonus Materials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonusMaterials.slice(0, expandedSections.bonusMaterials ? bonusMaterials.length : 6).map((point: string, index: number) => (
              <div key={index} className="flex">
                <Check className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <p className="ml-3 text-gray-700">{point}</p>
              </div>
            ))}
          </div>

          {bonusMaterials.length > 6 && (
            <Button
              variant="ghost"
              onClick={() => toggleSection('bonusMaterials')}
              className="mt-4 text-yellow-600 font-medium hover:text-yellow-800 transition-colors flex items-center"
            >
              {expandedSections.bonusMaterials ? (
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
        </div>
      )}
    </section>
  )
}
