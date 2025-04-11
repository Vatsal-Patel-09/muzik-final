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
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get courseId and lessonId from searchParams
  const courseId = searchParams.get("courseId") || "course-1";
  const lessonIdParam = searchParams.get("lessonId");

  // Fetch dynamic course data (assuming alpha structure)
  const fetchVideoPlayListById = async (courseId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://muzik-mgj9.onrender.com/api/courses/${courseId}`);
      const data = response?.data?.[0];

      // Make sure courseStructure exists
      if (!data?.courseStructure) {
        setCourseData(data);
        setAllLessons([]);
        setCurrentLesson(null);
        return;
      }

      const intro = data.courseStructure.introVideo;
      const modules = data.courseStructure.modules ?? [];

      // Prepare a finalLessons array that can hold both intro + modules
      const finalLessons: any[] = [];

      // If intro video exists, push it into finalLessons first
      if (intro?.introVideoUrl && intro.title) {
        finalLessons.push({
          id: 0,
          title: intro.title,
          url: intro.introVideoUrl,
          description: intro.description || "",
          isCompleted: false
        });
      }

      // If modules exist, map them into finalLessons
      if (modules.length > 0) {
        const mappedModules = modules.map((module: any, index: number) => ({
          id: finalLessons.length + index, // ensure unique IDs after intro
          title: module.video?.title || module.moduleTitle,
          url: module.video?.videoUrl,
          description: module.video?.description || module.moduleDescription,
          isCompleted: module.isCompleted || false
        }));
        finalLessons.push(...mappedModules);
      }

      // Update our course data and allLessons
      setCourseData({
        ...data,
        courseTitle: data.courseTitle || ""
      });
      setAllLessons(finalLessons);

      // Determine which lesson to show first
      if (finalLessons.length > 0) {
        if (lessonIdParam) {
          // If there's a valid lessonId in the URL, use it
          const lessonId = parseInt(lessonIdParam, 10);
          const selectedLesson = finalLessons.find(l => l.id === lessonId);
          setCurrentLesson(selectedLesson || finalLessons[0]);
        } else {
          // Otherwise, default to the first item (intro if present)
          setCurrentLesson(finalLessons[0]);
        }
      } else {
        // If no lessons at all, set null so we show "No video available."
        setCurrentLesson(null);
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

  // Whenever currentLesson changes, update the URL query param
  useEffect(() => {
    if (currentLesson) {
      router.push(`/video-room?courseId=${courseId}&lessonId=${currentLesson.id}`, { shallow: true });
    }
  }, [currentLesson, courseId, router]);

  // Mark current lesson as completed
  const markLessonCompleted = () => {
    if (!currentLesson) return;
    const updatedLesson = { ...currentLesson, isCompleted: true };
    setCurrentLesson(updatedLesson);

    const updatedLessons = allLessons.map(lesson =>
      lesson.id === currentLesson.id ? { ...lesson, isCompleted: true } : lesson
    );
    setAllLessons(updatedLessons);
  };

  // Move to next lesson
  const handleNextLesson = () => {
    if (!currentLesson) return;
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLesson.id);
    if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
      setCurrentLesson(allLessons[currentIndex + 1]);
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
          {currentLesson?.url ? (
            <VideoPlayer videoUrl={currentLesson.url} />
          ) : (
            <p className="text-center">No video available.</p>
          )}
        </div>

        {/* Course Lessons (intro + modules) */}
        <div>
          <UpcomingVideosList
            videos={allLessons}
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

          {/* Next Lesson button */}
          <button
            onClick={handleNextLesson}
            disabled={
              allLessons.findIndex(l => l.id === currentLesson?.id) === allLessons.length - 1
            }
            className={`bg-green-600 hover:bg-green-700 text-black px-3 py-2 rounded-full flex items-center justify-center gap-2 text-sm whitespace-nowrap ${
              allLessons.findIndex(l => l.id === currentLesson?.id) === allLessons.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Next Lesson
          </button>
        </div>
      </div>

      {/* Module / Lesson Description */}
      <div className="mt-6">
        {currentLesson?.description && (
          <ModuleDescription
            title="Lesson Description"
            description={
              Array.isArray(currentLesson.description)
                ? currentLesson.description.join("\n\n")
                : currentLesson.description
            }
          />
        )}
      </div>
    </div>
  );
}
