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

  return (
    <div className="bg-white text-black rounded-xl p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black">Course Lessons</h2>
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
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden shadow-lg"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.thumbnail || "/lesson-placeholder.jpg"}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-bold text-black"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${id}`}
                      className="text-gray-600"
                    >
                      {active.duration}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`button-${active.id}-${id}`}
                    onClick={() => {
                      if (onVideoSelect) onVideoSelect(active);
                      setActive(null);
                    }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.isCompleted ? "Rewatch" : "Start"}
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="space-y-2 max-h-[500px] overflow-y-auto">
        {videos?.length > 0 &&
          videos.map((video, idx) => {
            return (
              <motion.div
                layoutId={`card-${video.id}-${id}`}
                key={`card-${video.id}-${id}`}
                onClick={() => handleVideoClick(video, idx)}
                className={`p-3 flex justify-between items-center rounded-lg cursor-pointer ${
                  idx.toString() === currentVideoId
                    ? "bg-green-100 border border-green-500"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex gap-3 items-center">
                  {video.isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                      <span className="text-xs text-gray-500">{video.id}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-black text-left">
                      {video.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{video.duration}</p>
                  </div>
                </div>
                <motion.button
                  layoutId={`button-${video.id}-${id}`}
                  className="px-3 py-1 text-xs rounded-full bg-gray-200 hover:bg-green-500 hover:text-white text-black"
                >
                  {video.isCompleted ? "Rewatch" : "Play"}
                </motion.button>
              </motion.div>
            );
          })}
      </ul>
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
