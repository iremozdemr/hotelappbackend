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

const customPlaylist = [
  '/videos/welcome1.mp4',
  '/videos/welcome2.mp4',
  '/videos/welcome3.mp4'
];

const socket = io('http://192.168.13.224:3001');
const isTablet = new URLSearchParams(window.location.search).get('role') === 'tablet';

const App = () => {
  const [menuStarted, setMenuStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [customVideo, setCustomVideo] = useState(customPlaylist[0]);
  const [customStep, setCustomStep] = useState(0); // yeni state ile kontrol kolaylığı
  const socketRef = useRef(null);
  const inactivityTimer = useRef(null);

  useEffect(() => {
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
    });

    socket.on('init', (index) => {
      if (!isTablet) {
        setCustomVideo(null);
        setCurrentIndex(index);
      }
    });

    socket.on('playVideo', (index) => {
      if (!isTablet) {
        setCustomVideo(null);
        setCurrentIndex(index);
      }
    });

    socket.on('playCustomVideo', (videoPath) => {
      if (!isTablet) {
        setCustomStep(0);
        setCustomVideo(customPlaylist[0]);
      }
    });

    return () => socket.off();
  }, []);

  // Tablet için: dokunulmazsa 10 saniye sonra robot moduna dön
  useEffect(() => {
    if (isTablet && menuStarted) {
      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
          console.log('Tablet inactive: returning to robot');
          setMenuStarted(false);
          socketRef.current?.emit('playCustomVideo', customPlaylist[0]);
        }, 10000);
      };

      const reset = () => resetInactivityTimer();

      document.addEventListener('touchstart', reset);
      document.addEventListener('mousedown', reset);
      resetInactivityTimer();

      return () => {
        document.removeEventListener('touchstart', reset);
        document.removeEventListener('mousedown', reset);
        clearTimeout(inactivityTimer.current);
      };
    }
  }, [menuStarted]);

  // Tablet açılışta robot gif gösterir
  if (isTablet && !menuStarted) {
    return (
      <div
        className="w-screen h-screen bg-black flex items-center justify-center"
        onTouchStart={() => {
          setMenuStarted(true);
          socketRef.current?.emit('selectVideo', 0);
        }}
      >
        <img src="/robot-face.gif" alt="Robot Face" className="w-full h-full object-cover" />
      </div>
    );
  }

  // TV'de VideoPlayer bileşeni
  return (
    <div className="w-screen h-screen bg-black text-white">
      {isTablet ? (
        <TabletMenu
          sections={sections}
          onSelect={(index) => {
            setCustomVideo(null);
            socketRef.current?.emit('selectVideo', index);
          }}
        />
      ) : (
        <VideoPlayer
          src={customVideo || sections[currentIndex]?.video || customPlaylist[0]}
          title={!customVideo ? sections[currentIndex]?.title : undefined}
          onEnded={() => {
            if (!isTablet && !menuStarted && customVideo) {
              const next = (customStep + 1) % customPlaylist.length;
              setCustomStep(next);
              setCustomVideo(customPlaylist[next]);
            }
          }}
        />
      )}
    </div>
  );
};

export default App;