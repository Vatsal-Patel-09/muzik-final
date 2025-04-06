"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/video-room/VideoPlayer";
import { VideoTitle } from "@/components/video-room/VideoTitle";
import { ModuleDescription } from "@/components/video-room/ModuleDescription";
import { UpcomingVideosList } from "@/components/video-room/UpcomingVideosList";

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

export function VideoRoomContent() {
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
      
      {/* Video Title with Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <VideoTitle title={currentLesson.title} />
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a 
            href="https://chat.whatsapp.com/JCQTWuhiWso60lQ3R9U8Qg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-black px-3 sm:px-4 py-2 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <span className="whitespace-nowrap">Join WhatsApp Community</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </a>
          
          <button 
            onClick={handleNextLesson}
            className="bg-green-600 hover:bg-green-700 text-black px-3 sm:px-4 py-2 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
            disabled={currentLesson.id === courseData.lessons[courseData.lessons.length - 1].id}
          >
            <span className="whitespace-nowrap">Next Lesson</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Module Description */}
      <div className="mt-6">
        <ModuleDescription 
          title={courseData.title} 
          description={currentLesson.description || courseData.description} 
        />
      </div>
    </div>
  );
}
