import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden">
      <iframe 
        src={videoUrl}
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        allow="encrypted-media"
        title="Video Player"
        referrerPolicy="origin"
      ></iframe>
    </div>
  );
}
