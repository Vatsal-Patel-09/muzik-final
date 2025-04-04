"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "./ui/button"

interface CourseDescriptionProps {
  course: {
    description: string
  }
}

export default function CourseDescription({ course }: CourseDescriptionProps) {
  const [expanded, setExpanded] = useState(false)

  // This would typically come from an API
  const learningPoints = [
    "You will master the Python programming language by building 100 unique projects over 100 days",
    "You will learn automation, game, app and web development, data science and machine learning all using Python",
    "You will be able to program in Python professionally",
    "You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib",
    "Create a portfolio of 100 Python projects to apply for developer jobs",
    "Be able to build fully fledged websites and web apps with Python",
    "Build games like Blackjack, Pong and Snake using Python",
    "Learn to use Python for data science and machine learning",
  ]

  return (
    <section className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {learningPoints.map((point, index) => (
          <div key={index} className="flex">
            <Check className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <p className="ml-3 text-gray-700">{point}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>

      <div className={`relative ${!expanded && "max-h-[280px] overflow-hidden"}`}>
        <div className="text-gray-700 space-y-4">
          <p>
            Welcome to the 100 Days of Code - The Complete Python Pro Bootcamp,{" "}
            <strong>the only course you need</strong> to learn to code with Python. With over 500,000 5 STAR reviews and
            a 4.8 average, my courses are some of the HIGHEST RATED courses in the history of Udemy!
          </p>
          <p>
            <strong>100 days, 1 hour per day, learn to build 1 project per day, this is how you master Python.</strong>
          </p>
          <p>
            At 60+ hours, this Python course is without a doubt the <strong>most comprehensive</strong> Python course
            available anywhere online. Even if you have <strong>zero</strong> programming experience, this course will
            take you from <strong>beginner to professional</strong>. Here's why:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              The course is taught by the <strong>lead instructor</strong> at the App Brewery, London's{" "}
              <strong>best in-person programming Bootcamp</strong>.
            </li>
            <li>
              The course has been updated and you'll be learning the latest tools and technologies used at large
              companies such as Apple, Google and Netflix.
            </li>
            <li>
              This course doesn't cut any corners, there are beautiful <strong>animated explanation videos</strong> and
              tens of <strong>real-world projects</strong> which you will get to build. e.g. Tinder auto swiper, Snake
              game, Blog Website, LinkedIn Auto Submit Job Application
            </li>
            <li>
              The curriculum was developed over a period of <strong>2 years</strong>, with comprehensive student testing
              and feedback.
            </li>
            <li>
              We've taught over 600,000 students how to code and many have gone on to{" "}
              <strong>change their lives</strong> by becoming professional developers or starting their own tech
              startup.
            </li>
            <li>
              You'll save yourself over <strong>$12,000</strong> by enrolling, and still get access to the same teaching
              materials and learn from the same instructor and curriculum as our in-person programming Bootcamp.
            </li>
          </ul>

          <p>
            By the end of this course, you will be fluently programming in Python and you'll be so good at Python that
            you can get a job or use the language professionally.
          </p>
        </div>

        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>

      {!expanded ? (
        <Button variant='outline'
          onClick={() => setExpanded(true)}
          className="mt-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          Show more
        </Button>
      ) : (
        <Button variant='outline'
          onClick={() => setExpanded(false)}
          className="mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          Show less
        </Button>
      )}
    </section>
  )
}

