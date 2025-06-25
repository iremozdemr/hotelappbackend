import React, { useState, useEffect, useRef } from 'react';
import Logo from '/mirage-logo-1.png';

const sections = [
    { title: 'Restaurants & Bars', video: '/videos/restaurant.mp4' },
    { title: 'Concerts', video: '/videos/concerts.mp4' },
    { title: 'Pool & Beach', video: '/videos/pool.mp4' },
    // { title: 'Entertainment & Activity', video: '/videos/alacarte.mp4' },
    { title: 'Just for Kids', video: '/videos/kids.mp4' },
    { title: 'Natural Life', video: '/videos/natural.mp4' },
    { title: 'Spa & Wellness', video: '/videos/spa.mp4' },
    { title: 'Gluten Free Concept', video: '/videos/gluten.mp4' },
    { title: 'A La Carte', video: '/videos/alacarte.mp4' }
    // { title: 'Meetings & Events', video: '/videos/concerts.mp4' }
];

const HotelInfo = ({ onFinish }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);

    // useEffect(() => {
    //     const video = videoRef.current;
    //     if (!video) return;

    //     const handleLoadedMetadata = () => {
    //         const duration = video.duration * 1000;
    //         const timer = setTimeout(() => {
    //             setCurrentIndex((prev) => (prev + 1) % sections.length);
    //         }, duration);
    //         return () => clearTimeout(timer);
    //     };

    //     video.addEventListener('loadedmetadata', handleLoadedMetadata);

    //     return () => {
    //         video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    //     };
    // }, [currentIndex]);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            const duration = video.duration * 1000;
            const timer = setTimeout(() => {
                if (currentIndex < sections.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                } else {
                    onFinish(); // tüm videolar bittiğinde App'e haber ver
                }
            }, duration);
            return () => clearTimeout(timer);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }, [currentIndex, onFinish]);

    return (
        <div className="w-full h-full flex flex-row font-sans text-[#3b2e26]">
            {/* Sağ Menü */}
            <div className="w-1/4 h-full bg-gradient-to-b from-[#f8f4f0] to-[#e8e3de] pt-40 px-10 pb-10 flex flex-col justify-start border-l border-[#976a4d]/30 shadow-xl">
                <h2 className="text-3xl font-bold text-[#976a4d] mb-6 pb-3 border-b-2 border-[#976a4d]/40 tracking-wide">
                    What We Offer
                </h2>
                <ul className="space-y-3 text-base tracking-wide font-medium text-[#3b2e26]">
                    {sections.map((section, index) => (
                        <li
                            key={section.title}
                            className={`cursor-default px-5 py-3 rounded-lg transition-all duration-300 ${index === currentIndex
                                ? 'bg-[#976a4d] text-white font-semibold shadow-md scale-[1.02]'
                                : 'hover:bg-[#976a4d]/10 text-[#3b2e26]'
                                }`}
                        >
                            {section.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* <div className="w-1/4 h-full bg-gradient-to-b from-[#f8f4f0] to-[#e8e3de] p-10 flex flex-col justify-center border-l border-[#976a4d]/30 shadow-xl">
                <h2 className="text-3xl font-bold text-[#976a4d] mb-8 pb-4 border-b-2 border-[#976a4d]/40 tracking-wide">
                    What We Offer
                </h2>
                <ul className="space-y-3 text-base tracking-wide font-medium text-[#3b2e26]">
                    {sections.map((section, index) => (
                        <li
                            key={section.title}
                            className={`cursor-default px-5 py-3 rounded-lg transition-all duration-300 ${index === currentIndex
                                ? 'bg-[#976a4d] text-white font-semibold shadow-md scale-[1.02]'
                                : 'hover:bg-[#976a4d]/10 text-[#3b2e26]'
                                }`}
                        >
                            {section.title}
                        </li>
                    ))}
                </ul>
            </div>  */}
            {/* sidebar ortada


            {/* Sol İçerik */}
            <div className="flex flex-col items-center justify-start w-3/4 bg-white p-10 space-y-1">
                <img
                    src={Logo}
                    alt="Mirage Park Resort Logo"
                    className="w-170 h-auto drop-shadow-md"
                />

                <video
                    ref={videoRef}
                    src={sections[currentIndex].video}
                    autoPlay
                    muted
                    playsInline
                    className="w-full max-w-2.5xl rounded-lg shadow-xl object-cover h-[68vh]"
                />
            </div>
        </div>
    );
};

export default HotelInfo;