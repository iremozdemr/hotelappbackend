import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import VideoPlayer from './components/VideoPlayer';
import TabletMenu from './components/TabletMenu';

const sections = [
  { title: 'Restaurants & Bars', video: '/videos/restaurant.mp4' },
  { title: 'Concerts', video: '/videos/concerts.mp4' },
  { title: 'Pool & Beach', video: '/videos/pool.mp4' },
  { title: 'Just for Kids', video: '/videos/kids.mp4' },
  { title: 'Natural Life', video: '/videos/natural.mp4' },
  { title: 'Spa & Wellness', video: '/videos/spa.mp4' },
  { title: 'Gluten Free Concept', video: '/videos/gluten.mp4' },
  { title: 'A La Carte', video: '/videos/alacarte.mp4' }
];

const App = () => {
  const [isTablet, setIsTablet] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    const isTabletMode = role === 'tablet';
    setIsTablet(isTabletMode);

    const socket = io('http://192.168.13.224:3001');
    socketRef.current = socket;

    // 👉 Bu olayları role belirlendikten sonra bağla
    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
    });

    socket.on('init', (index) => {
      if (!isTabletMode) {
        setCurrentIndex(index);
      }
    });

    socket.on('playVideo', (index) => {
      if (!isTabletMode) {
        console.log('TV received playVideo:', index);
        setCurrentIndex(index);
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-white">
      {isTablet ? (
        <TabletMenu
          sections={sections}
          onSelect={(index) => {
            console.log('Tablet sending selectVideo:', index);
            socketRef.current?.emit('selectVideo', index);
          }}
        />
      ) : (
        // <VideoPlayer src={sections[currentIndex].video} onEnded={() => {}} />
        <VideoPlayer
          src={sections[currentIndex].video}
          title={sections[currentIndex].title}
          onEnded={() => { }}
        />

      )}
    </div>
  );
};

export default App;