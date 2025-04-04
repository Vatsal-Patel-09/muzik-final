import React from "react";

interface VideoTitleProps {
  title: string;
}

export function VideoTitle({ title }: VideoTitleProps) {
  return (
    <div className="bg-neutral-200 shadow-md p-4 rounded-xl flex-grow mr-4">
      <h2 className="text-xl md:text-2xl font-bold text-black">{title}</h2>
    </div>
  );
}
