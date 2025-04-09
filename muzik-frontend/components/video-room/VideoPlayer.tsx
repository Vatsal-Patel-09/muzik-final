import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="video-player-container">
      <iframe 
        src={videoUrl}
        style={{ border: 0, height: "360px", width: "640px", maxWidth: "100%" }}
        allowFullScreen={true}
        allow="encrypted-media"
        title="Video Player"
      ></iframe>
    </div>
  );
}
