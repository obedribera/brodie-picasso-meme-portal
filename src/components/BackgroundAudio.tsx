import { useEffect, useRef } from "react";

export const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set initial volume to 50%
      audioRef.current.play().catch((error) => {
        console.log("Audio autoplay failed:", error);
      });
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      src="https://stream-conversion.gpteng.co/?url=https://youtu.be/e8nABOXvQN8"
      className="hidden"
    />
  );
};