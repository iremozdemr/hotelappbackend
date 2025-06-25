import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import VideoPlayer from './components/VideoPlayer';
import TabletMenu from './components/TabletMenu';

const sections = [
  { title: { en: 'Restaurants & Bars', tr: 'Restoranlar ve Barlar', ru: 'Рестораны и Бары' }, video: '/videos/restaurant.mp4' },
  { title: { en: 'Concerts', tr: 'Konserler', ru: 'Концерты' }, video: '/videos/concerts.mp4' },
  { title: { en: 'Pool & Beach', tr: 'Havuz ve Plaj', ru: 'Бассейн и Пляж' }, video: '/videos/pool.mp4' },
  { title: { en: 'Just for Kids', tr: 'Sadece Çocuklar İçin', ru: 'Только для детей' }, video: '/videos/kids.mp4' },
  { title: { en: 'Natural Life', tr: 'Doğal Yaşam', ru: 'Природная Жизнь' }, video: '/videos/natural.mp4' },
  { title: { en: 'Spa & Wellness', tr: 'Spa ve Sağlık', ru: 'Спа и Вэлнес' }, video: '/videos/spa.mp4' },
  { title: { en: 'Gluten Free Concept', tr: 'Glütensiz Konsept', ru: 'Безглютеновая Концепция' }, video: '/videos/gluten.mp4' },
  { title: { en: 'A La Carte', tr: 'A La Carte', ru: 'А Ла Карт' }, video: '/videos/alacarte.mp4' }
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

  const [language, setLanguage] = useState('en'); // başlangıç dili

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

    socket.on('changeLanguage', (lang) => {
      if (!isTablet) {
        setLanguage(lang);
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

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    socketRef.current?.emit('changeLanguage', lang); // TV'ye bildir
  };


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

  return (
    <div className="w-screen h-screen bg-black text-white relative">
      {isTablet ? (
        <TabletMenu
          sections={sections}
          language={language}
          onLanguageChange={handleLanguageChange}
          onSelect={(index) => {
            setCustomVideo(null);
            socketRef.current?.emit('selectVideo', index);
          }}
        />


      ) : (
        <>
          {/* Eğer custom video oynuyorsa: Etkileşim çağrısı */}
          {customVideo && (
            <div className="absolute top-15 w-full text-center z-20">
              <div className="inline-block px-6 py-5 bg-[#976a4d] bg-opacity-70 text-white text-xl font-bold rounded-full shadow-md animate-bounce">
                ↑ touch my face to interact
              </div>
            </div>
          )}

          <VideoPlayer
            src={customVideo || sections[currentIndex]?.video || customPlaylist[0]}
            title={!customVideo ? sections[currentIndex]?.title[language] : undefined}
            onEnded={() => {
              if (!isTablet && !menuStarted && customVideo) {
                const next = (customStep + 1) % customPlaylist.length;
                setCustomStep(next);
                setCustomVideo(customPlaylist[next]);
              }
            }}
          />

        </>
      )}
      <img
        src="/guris-logo.webp"
        alt="GÜRİŞ Teknoloji"
        className="fixed bottom-7 right-7 w-40 opacity-90"
      />

    </div>
  );

};

export default App;