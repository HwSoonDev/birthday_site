import { RefObject, useRef, useState } from "react";

function MusicPlayer({
  audioRef,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
}) {
  const playlist = ["/music/birthdaySong.mp3", "/music/song1.mp3"];

  const [currentTrack, setCurrentTrack] = useState(0);

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  return (
    <div className="fixed bottom-[20px] right-[20px] flex flex-col z-5 items-center gap-[4px]">
      <span className="text-sm text-orange-500 text-[14px]">⮟ 音楽はここ</span>
      <audio
        ref={audioRef}
        src={playlist[currentTrack]}
        controls
        autoPlay={true}
        onEnded={playNext}
        className="opacity-60"
      />
    </div>
  );
}

export default MusicPlayer;
