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
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

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
      <div className="p-4 text-center text-gray-500">
        No lessons available.
      </div>
    );
  }

  return (
    <div className="bg-white text-black rounded-xl p-4 shadow-md max-w-full">
      <h2 className="text-xl font-semibold mb-4">Course Lessons</h2>
      <ul className="space-y-2">
        {videos.map((video, idx) => {
          const isActive = video.id.toString() === currentVideoId;

          return (
            <motion.li
              key={`video-${video.id}-${id}`}
              onClick={() => handleVideoClick(video, idx)}
              className={`p-3 rounded-lg cursor-pointer flex justify-between items-center 
                transition-all duration-200 
                ${isActive ? "bg-green-100 border border-green-500" : "bg-gray-50 hover:bg-gray-100"}
              `}
            >
              <div className="flex items-start gap-3">
                {video.thumbnail && (
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={60}
                    height={60}
                    className="rounded flex-shrink-0"
                  />
                )}

                {/* Title wraps instead of truncating */}
                <div className="flex flex-col">
                  <span className="font-medium text-black text-sm leading-5 break-words">
                    {video.title}
                  </span>
                  <span className="text-gray-500 text-xs leading-4">
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* "Pending" / "Completed" + Button stay on same line */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {video.isCompleted ? (
                  <span className="text-green-600 text-xs font-bold">Completed</span>
                ) : (
                  <span className="text-gray-400 text-xs">Pending</span>
                )}
                <motion.button
                  className="
                    px-2 
                    py-1 
                    text-xs 
                    rounded-full 
                    bg-gray-200 
                    hover:bg-green-500 
                    hover:text-white 
                    transition-colors 
                    whitespace-nowrap
                  "
                >
                  {video.isCompleted ? "Rewatch" : "Play"}
                </motion.button>
              </div>
            </motion.li>
          );
        })}
      </ul>

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
              className="w-full max-w-[500px] h-full md:h-auto md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden shadow-lg p-4"
            >
              {/* Lesson detail example */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">{active.title}</h3>
                <motion.button
                  layoutId={`button-${active.id}-${id}`}
                  onClick={() => {
                    if (onVideoSelect) onVideoSelect(active);
                    setActive(null);
                  }}
                  className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white"
                >
                  {active.isCompleted ? "Rewatch" : "Start"}
                </motion.button>
              </div>
              <div className="overflow-auto text-sm text-gray-800 leading-5">
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
