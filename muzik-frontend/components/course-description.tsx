"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "./ui/button"

interface CourseDescriptionProps {
  course: any;
}

export default function CourseDescription({ course }: CourseDescriptionProps) {
  const [expanded, setExpanded] = useState(false)

  // // Extract learning points from the course data or use defaults
  // const learningPoints = course.learningPoints || [
  //   "You will master the programming concepts by building projects",
  //   "You will learn automation, game, app and web development",
  //   "You will be able to program professionally",
  //   "Create a portfolio of projects to apply for developer jobs",
  //   "Be able to build fully fledged websites and web apps",
  //   "Learn to use data science and machine learning techniques",
  // ];

  // Get the description from course data or use default
  const description = course[0].description || "No description available for this course.";
  const outcomes = course[0].outcomes;
  const whyTakeThisCourse = course[0].whyTakeThisCourse;

  return (
    <section className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {outcomes.slice(0, 8).map((point: string, index: number) => (
          <div key={index} className="flex">
            <Check className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <p className="ml-3 text-gray-700">{point}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>

      <div className={`relative ${!expanded && "max-h-[280px] overflow-hidden"}`}>
        <div className="text-gray-700 space-y-4">
          {description.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
          
        
       

      {!expanded ? (
        <Button variant='outline'
          onClick={() => setExpanded(true)}
          className="mt-2 text-green-600 font-medium hover:text-green-800 transition-colors"
        >
          Show more
        </Button>
      ) : (
        <Button variant='outline'
          onClick={() => setExpanded(false)}
          className="mt-4 text-green-600 font-medium hover:text-green-800 transition-colors"
        >
          Show less
        </Button>
      )}
      <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why take this course?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {whyTakeThisCourse.slice(0, 8).map((point: string, index: number) => (
            <div key={index} className="flex">
              <Check className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
              <p className="ml-3 text-gray-700">{point}</p>
            </div>
          ))}
          </div>
      </div>

    </section>
  )
}

