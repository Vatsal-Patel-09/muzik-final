"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/video-room/VideoPlayer";
import { VideoTitle } from "@/components/video-room/VideoTitle";
import { ModuleDescription } from "@/components/video-room/ModuleDescription";
import { UpcomingVideosList } from "@/components/video-room/UpcomingVideosList";
import axios from "axios";

export function VideoRoomContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get courseId and lessonId from searchParams
  const courseId = searchParams.get("courseId") || "course-1";
  const lessonIdParam = searchParams.get("lessonId");

  // Fetch dynamic course data
  const fetchVideoPlayListById = async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://muzik-mgj9.onrender.com/api/courses/${courseId}`);
      const data = response?.data?.[0];
      if (data?.playlist && data.playlist[0]?.modules?.length > 0) {
        const modules = data.playlist[0].modules.map((module: any, index: number) => ({
          ...module,
          id: index + 1,
          isCompleted: module.isCompleted || false,
        }));
        const updatedData = { ...data, modules, courseTitle: data.courseTitle || data.title };
        setCourseData(updatedData);

        // Set the initial lesson
        if (lessonIdParam) {
          const fromParam = modules.find((lesson: any) => lesson.id === parseInt(lessonIdParam));
          setCurrentLesson(fromParam || modules[0]);
        } else {
          setCurrentLesson(modules[0]);
        }
      } else {
        setCourseData(data);
        setCurrentLesson(data);
      }
    } catch (err: any) {
      console.error("Error fetching course data: ", err);
      setError("Failed to load course data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoPlayListById(courseId);
  }, [courseId]);

  const videoArray = courseData?.modules || [];

  // Update the query string (shallow) when currentLesson changes
  useEffect(() => {
    if (currentLesson) {
      router.push(
        `/video-room?courseId=${courseId}&lessonId=${currentLesson.id}`,
        { shallow: true }
      );
    }
  }, [currentLesson, courseId, router]);

  // Mark current lesson as completed
  const markLessonCompleted = () => {
    if (currentLesson) {
      const updatedLesson = { ...currentLesson, isCompleted: true };
      setCurrentLesson(updatedLesson);

      const updatedModules = videoArray.map((lesson: any) =>
        lesson.id === currentLesson.id ? { ...lesson, isCompleted: true } : lesson
      );
      setCourseData({ ...courseData, modules: updatedModules });
    }
  };

  // Move to next lesson
  const handleNextLesson = () => {
    const index = videoArray.findIndex((lesson: any) => lesson.id === currentLesson?.id);
    if (index !== -1 && index < videoArray.length - 1) {
      setCurrentLesson(videoArray[index + 1]);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading course data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
        {/* Video Player */}
        <div>
          {currentLesson && currentLesson.url ? (
            <VideoPlayer videoUrl={currentLesson.url} />
          ) : (
            <p className="text-center">No video available.</p>
          )}
        </div>

        {/* Course Lessons */}
        <div>
          <UpcomingVideosList
            videos={videoArray}
            onVideoSelect={(selected) => setCurrentLesson(selected)}
            currentVideoId={currentLesson?.id?.toString()}
          />
        </div>
      </div>

      {/* Title and Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        {courseData?.courseTitle && (
          <VideoTitle title={courseData.courseTitle} />
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://chat.whatsapp.com/JCQTWuhiWso60lQ3R9U8Qg"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-black px-3 py-2 rounded-full flex items-center justify-center gap-2 text-sm whitespace-nowrap"
          >
            Join WhatsApp Community
          </a>

          {/* Mark as Completed button */}
          {!currentLesson?.isCompleted && (
            <button
              onClick={markLessonCompleted}
              className="bg-green-600 hover:bg-green-700 text-black px-3 py-2 rounded-full flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              Mark as Completed
            </button>
          )}

          <button
            onClick={handleNextLesson}
            disabled={videoArray.findIndex((lesson: any) => lesson.id === currentLesson?.id) === videoArray.length - 1}
            className={`bg-green-600 hover:bg-green-700 text-black px-3 py-2 rounded-full flex items-center justify-center gap-2 text-sm whitespace-nowrap ${
              videoArray.findIndex((lesson: any) => lesson.id === currentLesson?.id) === videoArray.length - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next Lesson
          </button>
        </div>
      </div>

      {/* Module Description */}
      <div className="mt-6">
        {currentLesson?.description && (
          <ModuleDescription
            title="Lesson Description"
            description={
              typeof currentLesson.description === "string"
                ? currentLesson.description
                : currentLesson.description.join("\n\n")
            }
          />
        )}
      </div>
    </div>
  );
}
