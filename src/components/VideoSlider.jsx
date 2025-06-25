import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

const videoList = [
  '/videos/welcome.mp4',
  '/videos/intro.mp4',
  '/videos/munch-waving.mp4',
];

const VideoSlider = ({ onAllVideosEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnd = () => {
    if (currentIndex < videoList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onAllVideosEnd(); // tüm videolar bittiğinde sayfa değiştir
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <VideoPlayer src={videoList[currentIndex]} onEnded={handleVideoEnd} />
    </div>
  );
};

export default VideoSlider;