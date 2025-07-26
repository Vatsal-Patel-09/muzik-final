// import React from "react";

// interface VideoPlayerProps {
//   videoUrl: string;
// }

// export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
//   // Container styles equivalent to "w-full aspect-video rounded-lg overflow-hidden"
//   const containerStyle: React.CSSProperties = {
//     width: "100%",
//     aspectRatio: "16/9", 
//     borderRadius: "0.5rem", // equivalent to rounded-lg
//     overflow: "hidden",
//     maxWidth: "100%"
//   };
  
//   // iframe styles equivalent to "w-full h-full" with border: 0
//   const iframeStyle: React.CSSProperties = {
//     width: "100%",
//     height: "100%",
//     border: "0",
//   };

//   return (
//     <div style={containerStyle}>
//       <iframe 
//         src={videoUrl}
//         style={iframeStyle}
//         allowFullScreen={true}
//         allow="encrypted-media"
//         title="Video Player"
//         // Remove sandbox attribute as it might restrict DRM functionality
//       ></iframe>
//     </div>
//   );
// }

// import React from "react";

// interface VideoPlayerProps {
//   videoUrl: string;
// }

// export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
//   return (
//     <div style={{ maxWidth: "100%", width: "100%", aspectRatio: "16/9",  borderRadius: "0.5rem",}}>
//       <iframe 
//         src={videoUrl}
//         style={{ border: 0, height: "100%", width: "100%", maxWidth: "100%" }}
//         allowFullScreen={true}
//         allow="encrypted-media"
//         title="Video Player"
//       ></iframe>
//     </div>
//   );
// }

import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-video rounded-lg shadow-lg">
      <iframe 
        src={videoUrl}
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        allow="encrypted-media"
        title="Video Player"
        // referrerPolicy="origin"
        sandbox="allow-scripts allow-same-origin allow-presentation"
      ></iframe>
    </div>
  );
}