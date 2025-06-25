// import React, { useRef, useEffect } from 'react';

// const VideoPlayer = ({ src }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//       videoRef.current.play().catch((error) => {
//         console.warn('Video playback failed:', error);
//       });
//     }
//   }, [src]);


//   return (
//     <video
//       ref={videoRef}
//       src={src}
//       autoPlay
//       muted
//       playsInline
//       controls={false}
//       className="w-full h-full object-cover"
//     />
//   );
// };

// export default VideoPlayer;

import React from 'react';

const VideoPlayer = ({ src, title, onEnded }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white p-6">
      {/* Başlık */}
      {title && (
        <div className="text-center text-3xl font-bold mb-4" style={{ color: '#976a4d' }}>
          {title}
        </div>
      )}

      {/* Dikey video alanı */}
      <div className="w-[90%] max-w-[800px] aspect-[9/16] shadow-lg rounded-lg overflow-hidden">
        <video
          src={src}
          className="w-full h-full object-cover"
          autoPlay
          muted
          onEnded={onEnded}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
