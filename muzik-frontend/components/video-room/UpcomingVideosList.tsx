"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface Video {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  description?: string;
  thumbnail?: string;
  content?: string | (() => React.ReactNode);
  url?: string;
}

interface UpcomingVideosListProps {
  videos: Video[];
  onVideoSelect?: (video: Video, idx?: number) => void;
  currentVideoId?: string;
}

export function UpcomingVideosList({
  videos,
  onVideoSelect,
  currentVideoId,
}: UpcomingVideosListProps) {
  const [active, setActive] = useState<Video | boolean | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null!);
  const id = useId();

  // Mobile view settings
  const MOBILE_VISIBLE_COUNT = 3;

  // Check if it's mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 640; // sm breakpoint
      setIsMobile(newIsMobile);
      
      // If switching from mobile to desktop, reset expanded state
      if (!newIsMobile && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [isExpanded]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handleVideoClick = (video: Video, idx: number) => {
    if (onVideoSelect) {
      onVideoSelect(video, idx);
    } else {
      setActive(video);
    }
  };

  if (!videos || videos.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 bg-white rounded-xl shadow-md">
        No lessons available.
      </div>
    );
  }

  return (
    <div className="bg-white text-black rounded-xl p-3 sm:p-4 shadow-md w-full">
      {/* Header with title and expand/collapse button for mobile */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Course Lessons</h2>
        {isMobile && videos.length > MOBILE_VISIBLE_COUNT && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>All ({videos.length})</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>

      {/* Video list with conditional rendering for mobile */}
      <div className="max-h-[50vh] sm:max-h-[60vh] xl:max-h-[70vh] overflow-y-auto">
        <ul className="space-y-2">
          {videos
            .slice(0, !isExpanded && isMobile ? MOBILE_VISIBLE_COUNT : videos.length)
            .map((video, idx) => {
            const isActive = video.id.toString() === currentVideoId;

            return (
              <motion.li
                key={`video-${video.id}-${id}`}
                onClick={() => handleVideoClick(video, idx)}
                className={`p-2 sm:p-3 rounded-lg cursor-pointer flex justify-between items-center 
                  transition-all duration-200 
                  ${
                    isActive
                      ? "bg-green-100 border border-green-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                `}
              >
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  {video.thumbnail && (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={50}
                      height={50}
                      className="rounded flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-[60px] md:h-[60px]"
                    />
                  )}

                  {/* Title wraps instead of truncating */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium text-black text-xs sm:text-sm leading-4 sm:leading-5 break-words">
                      {video.title}
                    </span>
                    <span className="text-gray-500 text-xs leading-4">
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* "Pending" / "Completed" + Button stay on same line */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
                  {video.isCompleted ? (
                    <span className="text-green-600 text-xs font-bold text-right sm:text-left">
                      Completed
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs text-right sm:text-left">Pending</span>
                  )}
                  <motion.button
                    className="
                      px-2 sm:px-3
                      py-1 
                      text-xs 
                      rounded-full 
                      bg-gray-200 
                      hover:bg-green-500 
                      hover:text-white 
                      transition-colors 
                      whitespace-nowrap
                      min-w-[50px] sm:min-w-[60px]
                    "
                  >
                    {video.isCompleted ? "Rewatch" : "Play"}
                  </motion.button>
                </div>
              </motion.li>
            );
          })}
        </ul>
        
        {/* Show More button for mobile when collapsed */}
        {!isExpanded && videos.length > MOBILE_VISIBLE_COUNT && isMobile && (
          <div className="mt-3 text-center border-t border-gray-100 pt-3">
            <button
              onClick={() => setIsExpanded(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              <span>Show {videos.length - MOBILE_VISIBLE_COUNT} More Lessons</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Optional Modal */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-gray-200 rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[90vw] sm:max-w-[500px] h-full md:h-auto md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden shadow-lg p-3 sm:p-4 mx-2 sm:mx-0"
            >
              {/* Lesson detail example */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h3 className="font-bold text-lg sm:text-xl break-words flex-1 min-w-0">{active.title}</h3>
                <motion.button
                  layoutId={`button-${active.id}-${id}`}
                  onClick={() => {
                    if (onVideoSelect) onVideoSelect(active);
                    setActive(null);
                  }}
                  className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white whitespace-nowrap flex-shrink-0"
                >
                  {active.isCompleted ? "Rewatch" : "Start"}
                </motion.button>
              </div>
              <div className="overflow-auto text-sm text-gray-800 leading-5 break-words">
                {typeof active.content === "function"
                  ? active.content()
                  : active.content}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
