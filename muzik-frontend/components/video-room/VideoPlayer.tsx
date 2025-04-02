import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  otp: string;
  playbackInfo: string;
}

export function VideoPlayer({ otp, playbackInfo }: VideoPlayerProps) {
  const iframeUrl = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // When otp or playbackInfo changes, force the iframe to reload
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      // Update iframe src to load new video
      iframe.src = iframeUrl;
    }
  }, [otp, playbackInfo, iframeUrl]);
  
  return (
    <div className="video-player-container border border-white rounded-lg">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}> {/* 16:9 aspect ratio */}
        <iframe 
          ref={iframeRef}
          src={iframeUrl}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          allowFullScreen={true}
          allow="encrypted-media"
          title="Video Player"
        ></iframe>
      </div>
    </div>
  );
}
