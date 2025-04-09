"use client"

import { Suspense } from "react"
import { VideoRoomContent } from "@/components/video-room/VideoRoomContent"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams } from "next/navigation"

export default function VideoRoomPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")

  return (
    <ScrollArea className="h-[calc(100vh-40px)] border-none w-full rounded-md p-4">
      <main className="min-h-screen py-4">
        <Suspense
          fallback={
            <div className="container mx-auto text-center py-20">
              <div className="animate-pulse flex flex-col items-center justify-center">
                <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-36 bg-gray-200 rounded"></div>
              </div>
              <p className="mt-6 text-gray-700">Loading video content...</p>
            </div>
          }
        >
          <VideoRoomContent courseId={courseId} />
        </Suspense>
      </main>
    </ScrollArea>
  )
}
