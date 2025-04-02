"use client";

import React, { useState, useEffect } from "react";
import { VideoPlayer } from "@/components/video-room/VideoPlayer";
import { VideoTitle } from "@/components/video-room/VideoTitle";
import { ModuleDescription } from "@/components/video-room/ModuleDescription";
import { UpcomingVideosList } from "@/components/video-room/UpcomingVideosList";
import { useSearchParams, useRouter } from "next/navigation";

// Mock data structure - replace with real API calls
const coursesData = {
  "course-1": {
    title: "Fundamentals of Music Production",
    description: "This module covers the essential concepts and techniques in music production. You'll learn about digital audio workstations, signal flow, recording techniques, and basic mixing principles. By the end of this module, you'll have the foundation needed to start producing your own music.",
    lessons: [
      { 
        id: 1, 
        title: "Setting Up Your Digital Audio Workstation", 
        duration: "15:30", 
        isCompleted: true,
        description: "Learn how to set up your DAW for optimal workflow",
        thumbnail: "https://assets.aceternity.com/demos/daw-setup.jpeg",
        content: "This lesson walks you through the essential setup of a Digital Audio Workstation for music production.",
        otp: "20160313versASE323oFfLos1jd6YiTTNXlCALSuphYKMOID1Yu5Vd3DBM60XVnI",
        playbackInfo: "eyJ2aWRlb0lkIjoiMmI4NGFkYzIwZTE5NGZkMzgwYzZjZDYyMmFkNGYxZTMifQ=="
      },
      { 
        id: 2, 
        title: "Understanding Audio Signal Flow", 
        duration: "12:45", 
        isCompleted: false,
        description: "Master the concepts of audio routing in your projects",
        thumbnail: "https://assets.aceternity.com/demos/signal-flow.jpeg",
        content: "Understanding signal flow is crucial for troubleshooting and creating complex audio production setups.",
        otp: "20160313versASE323sDFfLos1jd6YiTTNXlCALSuphYKMOID1Yu5Vd3DBM60XVnI",
        playbackInfo: "eyJ2aWRlb0lkIjoiM2I4NGFkYzIwZTE5NGZkMzgwYzZjZDYyMmFkNGYxZTMifQ=="
      },
      { 
        id: 3, 
        title: "Recording Techniques for Vocals", 
        duration: "18:20", 
        isCompleted: false,
        description: "Professional vocal recording methods explained",
        thumbnail: "https://assets.aceternity.com/demos/vocal-recording.jpeg",
        content: "Learn proper microphone placement, room treatment considerations, and performance techniques for capturing the perfect vocal take.",
        otp: "20160313versASE323oFfLos1jd6FGTTNXlCALSuphYKMOID1Yu5Vd3DBM60XVnI",
        playbackInfo: "eyJ2aWRlb0lkIjoiNGI4NGFkYzIwZTE5NGZkMzgwYzZjZDYyMmFkNGYxZTMifQ=="
      },
      { 
        id: 4, 
        title: "Basics of MIDI Programming", 
        duration: "14:10", 
        isCompleted: false,
        description: "Getting started with virtual instruments and MIDI",
        thumbnail: "https://assets.aceternity.com/demos/midi-programming.jpeg",
        content: "This lesson covers MIDI basics, from note input to advanced controller automation for expressive performances.",
        otp: "20160313versASE323oFfLos1jd6YiTBNXlCALSuphYKMOID1Yu5Vd3DBM60XVnI",
        playbackInfo: "eyJ2aWRlb0lkIjoiNWI4NGFkYzIwZTE5NGZkMzgwYzZjZDYyMmFkNGYxZTMifQ=="
      },
      { 
        id: 5, 
        title: "Introduction to Mixing", 
        duration: "20:35", 
        isCompleted: false,
        description: "Fundamental mixing concepts and techniques",
        thumbnail: "https://assets.aceternity.com/demos/mixing-intro.jpeg",
        content: "Learn the foundations of mixing including balance, EQ, compression, and spatial effects to create professional sounding mixes.",
        otp: "20160313versASE323oFfLos1jd6YiTTNHLCALSuphYKMOID1Yu5Vd3DBM60XVnI",
        playbackInfo: "eyJ2aWRlb0lkIjoiNmI4NGFkYzIwZTE5NGZkMzgwYzZjZDYyMmFkNGYxZTMifQ=="
      }
    ]
  }
  // Add more courses as needed
};

export default function VideoRoomPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get course and lesson IDs from URL parameters, defaulting to first course and lesson
  const courseId = searchParams.get('courseId') || 'course-1';
  const lessonIdParam = searchParams.get('lessonId');
  
  // Get course data
  const courseData = coursesData[courseId as keyof typeof coursesData] || coursesData["course-1"];
  
  // Find the initial lesson ID (either from URL or default to first lesson)
  const initialLessonId = lessonIdParam ? parseInt(lessonIdParam) : courseData.lessons[0].id;
  
  // State for current lesson
  const [currentLesson, setCurrentLesson] = useState(
    courseData.lessons.find(lesson => lesson.id === initialLessonId) || courseData.lessons[0]
  );

  // Update URL when lesson changes
  useEffect(() => {
    router.push(`/video-room?courseId=${courseId}&lessonId=${currentLesson.id}`);
  }, [currentLesson.id, courseId, router]);
  
  // Handle video selection
  const handleVideoSelect = (video: any) => {
    setCurrentLesson(video);
  };
  
  // Handle next lesson
  const handleNextLesson = () => {
    const currentIndex = courseData.lessons.findIndex(lesson => lesson.id === currentLesson.id);
    if (currentIndex < courseData.lessons.length - 1) {
      setCurrentLesson(courseData.lessons[currentIndex + 1]);
    }
  };

  return (
    <main className="bg-black min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player - Takes up 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            <VideoPlayer 
              otp={currentLesson.otp} 
              playbackInfo={currentLesson.playbackInfo} 
            />
          </div>
          
          {/* Upcoming Videos List - Takes up 1/3 of the width on large screens */}
          <div className="lg:col-span-1">
            <UpcomingVideosList 
              videos={courseData.lessons} 
              onVideoSelect={handleVideoSelect}
              currentVideoId={currentLesson.id}
            />
          </div>
        </div>
        
        {/* Video Title with Next Button */}
        <div className="mt-6 flex justify-between items-center">
          <VideoTitle title={currentLesson.title} />
          
          <button 
            onClick={handleNextLesson}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center gap-2"
            disabled={currentLesson.id === courseData.lessons[courseData.lessons.length - 1].id}
          >
            Next Lesson
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Module Description */}
        <div className="mt-6">
          <ModuleDescription 
            title={courseData.title} 
            description={currentLesson.description || courseData.description} 
          />
        </div>
      </div>
    </main>
  );
}
