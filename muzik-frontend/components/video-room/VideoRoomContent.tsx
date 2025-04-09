"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/video-room/VideoPlayer";
import { VideoTitle } from "@/components/video-room/VideoTitle";
import { ModuleDescription } from "@/components/video-room/ModuleDescription";
import { UpcomingVideosList } from "@/components/video-room/UpcomingVideosList";
import axios from "axios";

export function VideoRoomContent({ courseId: propCourseId }: { courseId: string | null }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [courseData, setCourseData] = useState<any>(null);

  const courseId = searchParams.get("courseId") || "course-1";
  const lessonIdParam = searchParams.get("lessonId");

  // Fetch dynamic course data from the API
  const fetchVideoPlayListById = async (courseId: string) => {
    try {
      const response = await axios.get(`https://muzik-mgj9.onrender.com/api/courses/${courseId}`);
      const data = response?.data?.[0]; // assuming the API returns an array of courses
      if (data?.playlist && data.playlist[0]?.modules?.length > 0) {
        // Map through modules to assign an "id" (using index+1)
        const modules = data.playlist[0].modules.map((module: any, index: number) => ({
          ...module,
          id: index + 1,
        }));
        // Store the course data along with the modules
        setCourseData({ ...data, modules });
        // Set the initial lesson – use lessonId from URL if provided, else default to first module
        if (lessonIdParam) {
          const lessonFromParam = modules.find((lesson: any) => lesson.id === parseInt(lessonIdParam));
          setCurrentLesson(lessonFromParam || modules[0]);
        } else {
          setCurrentLesson(modules[0]);
        }
      } else {
        setCourseData(data);
        setCurrentLesson(data);
      }
    } catch (error) {
      console.error("Error fetching course data: ", error);
    }
  };

  useEffect(() => {
    fetchVideoPlayListById(courseId);
  }, [courseId]);

  const videoArray = courseData?.modules || [];

  // Update URL query when the current lesson changes
  useEffect(() => {
    if (currentLesson) {
      router.push(`/video-room?courseId=${courseId}&lessonId=${currentLesson.id}`);
    }
  }, [currentLesson, courseId, router]);

  // Handle lesson selection
  const handleVideoSelect = (selected: any, idx: any) => {
    setCurrentLesson(selected);
  };

  // Next lesson functionality based on dynamic module data
  const handleNextLesson = () => {
    if (!videoArray.length) return;
    const currentIndex = videoArray.findIndex((lesson: any) => lesson.id === currentLesson?.id);
    if (currentIndex !== -1 && currentIndex < videoArray.length - 1) {
      setCurrentLesson(videoArray[currentIndex + 1]);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          {currentLesson && currentLesson.url ? (
            <VideoPlayer videoUrl={currentLesson.url} />
          ) : (
            <p className="text-center">Loading video...</p>
          )}
        </div>
        {/* Upcoming Videos List */}
        <div className="lg:col-span-1">
          <UpcomingVideosList
            videos={videoArray}
            onVideoSelect={handleVideoSelect}
            currentVideoId={currentLesson?.id?.toString()}
          />
        </div>
      </div>

      {/* Video Title and Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        {courseData?.courseTitle && (
          <VideoTitle title={courseData.courseTitle} />
        )}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="https://chat.whatsapp.com/JCQTWuhiWso60lQ3R9U8Qg"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-black px-3 sm:px-4 py-2 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <span className="whitespace-nowrap">Join WhatsApp Community</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
          <button
            onClick={handleNextLesson}
            className="bg-green-600 hover:bg-green-700 text-black px-3 sm:px-4 py-2 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <span className="whitespace-nowrap">Next Lesson</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Module Description (Optional – uncomment if needed) */}
      <div className="mt-6">
        {/*
        <ModuleDescription
          title={courseData?.title || ""}
          description={currentLesson?.description || ""}
        />
        */}
      </div>
    </div>
  );
}
