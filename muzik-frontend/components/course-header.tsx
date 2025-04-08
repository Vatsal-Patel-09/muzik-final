"use client"

import { useRef } from "react"


interface courseHeaderProps {
  course: any;
}

export default function CourseHeader( {course} : courseHeaderProps ) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  console.log("Course Header Props", course)

  const title = course[0]?.title
  const promoVideoUrl = course[0]?.promoVideoUrl

  return (
    <div className="pt-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>

      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
        <div className="w-full h-full">
          <iframe
            ref={iframeRef}
            src={promoVideoUrl}
            className="w-full h-full border-0"
            allowFullScreen={true}
            allow="encrypted-media"
            title="Video Player"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

