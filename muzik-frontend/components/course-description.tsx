"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface CourseDescriptionProps {
  course: any
}

export default function CourseDescription({ course }: CourseDescriptionProps) {
  const [expanded, setExpanded] = useState(false)

  // Extract data from the course API response
  // course[0] contains the main course information
  const description = course[0]?.description || "No description available for this course."
  const outcomes = course[0]?.outcomes || []
  const whyTakeThisCourse = course[0]?.whyTakeThisCourse || []
  const level = course[0]?.level || "Beginner"
  const category = course[0]?.category || "Development"
  const lastUpdated = course[0]?.lastUpdated || new Date().toLocaleDateString()

  return (
    <section className="border-t border-gray-200 pt-8">
      {/* Course metadata badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          {level}
        </Badge>
        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          {category}
        </Badge>
        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          Last updated: {lastUpdated}
        </Badge>
      </div>

      {/* What you'll learn section */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="bg-green-100 text-green-800 p-2 rounded-lg mr-3">
            <Check className="w-5 h-5" />
          </span>
          What you'll learn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Map through learning outcomes */}
          {outcomes.slice(0, expanded ? outcomes.length : 8).map((point: string, index: number) => (
            <div key={index} className="flex">
              <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <p className="ml-3 text-gray-700">{point}</p>
            </div>
          ))}
        </div>

        {/* Show more/less button for outcomes if there are more than 8 */}
        {outcomes.length > 8 && (
          <Button
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
            className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center"
          >
            {expanded ? (
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

      {/* Course description section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>

        <div className={`relative ${!expanded && "max-h-[280px] overflow-hidden"}`}>
          {/* If description is not expanded, add gradient fade at bottom */}
          {!expanded && (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
          )}

          <div className="prose max-w-none text-gray-700 space-y-4">
            {/* Split description into paragraphs */}
            {description.split("\n\n").map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Show more/less button for description */}
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-green-600 font-medium hover:text-green-800 transition-colors flex items-center"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Show more <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Why take this course section */}
      {whyTakeThisCourse && whyTakeThisCourse.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why take this course?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Map through reasons to take the course */}
            {whyTakeThisCourse.map((point: string, index: number) => (
              <div key={index} className="flex">
                <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="ml-3 text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
