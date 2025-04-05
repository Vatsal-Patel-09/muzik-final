"use client"

import { useState, useRef } from "react"
import { Star, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
  const [videoOpen, setVideoOpen] = useState(false)
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

      <div
        className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6 group cursor-pointer"
        onClick={() => setVideoOpen(true)}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-gray-900 ml-1" />
          </div>
          <span className="absolute bottom-4 left-4 text-white font-medium text-lg">Preview this course</span>
        </div>
        <img src="/placeholder.svg?height=480&width=854" alt="Course preview" className="w-full h-full object-cover" />
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black overflow-hidden" onInteractOutside={(e) => e.preventDefault()}>
          <div className="aspect-video w-full">
            <iframe
              ref={iframeRef}
              src={course.videoUrl}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen={true}
              allow="encrypted-media"
              title="Video Player"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

