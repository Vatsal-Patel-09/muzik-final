import React from "react";

interface VideoTitleProps {
  title: string;
}
/// This component displays the title of a video in a styled box.
export function VideoTitle({ title }: VideoTitleProps) {
  return (
    <div className="bg-neutral-200 shadow-md p-4 rounded-xl flex-grow mr-4">
      <h2 className="text-xl md:text-2xl font-bold text-black truncate">{title}</h2>
    </div>
  );
}
