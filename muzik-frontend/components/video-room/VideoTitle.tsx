import React from "react";

interface VideoTitleProps {
  title: string;
}
/// This component displays the title of a video in a styled box.
export function VideoTitle({ title }: VideoTitleProps) {
  return (
    <div className="bg-neutral-200 shadow-md p-3 sm:p-4 rounded-xl w-full">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black break-words leading-tight">{title}</h2>
    </div>
  );
}
