import { useState, useRef } from "react";

function VideoPlayer({ src, type }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const rewind = () => {
    videoRef.current.currentTime -= 10;
  };

  const forward = () => {
    videoRef.current.currentTime += 10;
  };
  console.log(type);

  return (
    <div
      className={`relative ${type === "pc" ? "w-full" : "w-1/3"} mx-auto h-auto rounded-xl overflow-hidden group`}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        className="w-full rounded-xl"
        onClick={togglePlay}
      />

      {/* Custom controls bar */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-2
        flex items-center gap-4
        opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        {/* Rewind 10s */}
        <button
          onClick={rewind}
          className="text-white text-lg hover:text-gray-300 transition-colors"
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span className="text-xs ml-1">10</span>
        </button>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="text-white text-xl hover:text-gray-300 transition-colors"
        >
          <i className={`fa-solid ${playing ? "fa-pause" : "fa-play"}`}></i>
        </button>

        {/* Forward 10s */}
        <button
          onClick={forward}
          className="text-white text-lg hover:text-gray-300 transition-colors"
        >
          <i className="fa-solid fa-rotate-right"></i>
          <span className="text-xs ml-1">10</span>
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
