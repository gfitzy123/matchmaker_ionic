import { useState } from "react";

const VideoThumbnail = ({ videoId }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      id="video-container"
      className="relative h-96 w-full inline-block cursor-pointer"
    >
      {showVideo ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <img
          id="play-button"
          src="videoThumbnail.png"
          alt="Play"
          onClick={() => setShowVideo(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        />
      )}
    </div>
  );
};

export default VideoThumbnail;
