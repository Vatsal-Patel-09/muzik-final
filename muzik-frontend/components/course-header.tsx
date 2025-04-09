"use client"

import { useRef } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface CourseHeaderProps {
  course: any
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Extract course data from the API response
  // course[0] contains the main course information
  const title = course[0]?.title || "Course Title"
  const promoVideoUrl = course[0]?.promoVideoUrl
  const thumbnail = course[0]?.thumbnail

  return (
    <div className="pt-6">
      {/* Course title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h1>

      {/* Video player with thumbnail fallback */}
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6 shadow-lg">
        {promoVideoUrl ? (
          <div className="w-full h-full">
            <iframe
              ref={iframeRef}
              src={promoVideoUrl}
              className="w-full h-full border-0"
              allowFullScreen={true}
              allow="encrypted-media"
              title="Course Preview Video"
            ></iframe>
          </div>
        ) : (
          <div className="w-full h-full relative flex items-center justify-center">
            {/* Show thumbnail if available, otherwise a placeholder */}
            <Image
              src={thumbnail || "/placeholder.svg?height=600&width=800"}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-gray-900 ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
