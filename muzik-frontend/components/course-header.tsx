"use client"

import { useRef } from "react"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CourseHeaderProps {
  course: {
    title: string
    rating: number
    ratingCount: number
    studentCount: number
    isBestseller: boolean
    videoUrl: string
  }
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <div className="pt-6">
      <div className="flex items-center space-x-2 mb-2">
        {course.isBestseller && (
          <Badge variant="outline" className="bg-teal-100 text-teal-800 border-teal-200 font-medium">
            Bestseller
          </Badge>
        )}
        <div className="flex items-center">
          <span className="text-amber-500 font-bold">{course.rating}</span>
          <Star className="w-4 h-4 fill-amber-500 text-amber-500 ml-1" />
          <span className="text-gray-600 ml-1">({course.ratingCount.toLocaleString()} ratings)</span>
        </div>
        <span className="text-gray-600">{course.studentCount.toLocaleString()} students</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{course.title}</h1>

      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
        <div className="w-full h-full">
          <iframe
            ref={iframeRef}
            src="https://player.vdocipher.com/v2/?otp=20160313versASE323fdpDXQeczLVUYAsfEOAyp0QBIFoJVowHESzTZGTwm41hVN&playbackInfo=eyJ2aWRlb0lkIjoiMmI4NGFkYzIwZTE5NGZkMzgwYzZjZDYyMmFkNGYxZTMifQ=="
            style={{ border: 0 }}
            className="w-full h-full"
            allowFullScreen={true}
            allow="encrypted-media"
            title="Video Player"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

