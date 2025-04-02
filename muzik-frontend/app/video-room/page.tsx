"use client";

import React, { Suspense } from "react";
import { VideoRoomContent } from "@/components/video-room/VideoRoomContent";

export default function VideoRoomPage() {
  return (
    <main className="bg-black min-h-screen py-8 px-4">
      <Suspense fallback={
        <div className="container mx-auto text-white text-center py-20">
          <div className="animate-pulse flex flex-col items-center justify-center">
            <div className="h-32 w-32 bg-gray-700 rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-36 bg-gray-700 rounded"></div>
          </div>
          <p className="mt-6">Loading video content...</p>
        </div>
      }>
        <VideoRoomContent />
      </Suspense>
    </main>
  );
}
