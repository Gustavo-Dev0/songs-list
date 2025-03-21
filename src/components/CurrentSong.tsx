import { useRef, useState } from "react";
import "./CurrentSong.css";
import CustomButton from "./iu/CustomButton";
import usePlaylistStore from "../store/playlistStore";
import Shuffle from "../assets/icons/shuffle.svg";
import Repeat from "../assets/icons/repeat.svg";
import RepeatOne from "../assets/icons/repeat_one.svg";
import Play from "../assets/icons/play_arrow.svg";
import Pause from "../assets/icons/pause.svg";
import SkipNext from "../assets/icons/skip_next.svg";
import SkipPrevious from "../assets/icons/skip_previous.svg";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";
import { toMinSec } from "../utils";

/*interface ICurrentSongProps {
}*/

declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const CurrentSong = () => {
  const playerRef = useRef<HTMLDivElement | null>(null);

  const [isPaused, setIsPaused] = useState<boolean | undefined>(undefined);
  const isLoopingRef = useRef<boolean>(false);
  const [isLooping, setIsLooping] = useState(isLoopingRef.current);

  const currentSong = usePlaylistStore((state) => state.currentSong);
  const playNext = usePlaylistStore((state) => state.playNext);
  const playPrev = usePlaylistStore((state) => state.playPrev);
  const shufflePlayList = usePlaylistStore((state) => state.shufflePlayList);

  const [songData, setSongData] = useState({ duration: 0 })

  function updateInfo(event: YT.PlayerEvent) {
    setSongData({
      duration: event.target.getDuration()
    })
  }

  const handleOnEnd = () => {
    if (isLoopingRef.current && playerInstance.current) {
      playerInstance.current.seekTo(0, false);
      playerInstance.current.playVideo();
    } else {
      playNext();
    }
  }

  const handleOnPlay = (event: YT.PlayerEvent) => {
    updateInfo(event);
    setIsPaused(false);
  }

  function handleLooping() {
    isLoopingRef.current = !isLoopingRef.current;
    setIsLooping(isLoopingRef.current);
  }

  const handlePlay = () => {
    if (!playerInstance.current) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isPaused ? playerInstance.current.playVideo() : playerInstance.current.pauseVideo();
  };

  const playerInstance = useYouTubePlayer({ playerRef, videoId: currentSong?.videoId || "", onEnd: handleOnEnd, onPlay: handleOnPlay, onPause: () => setIsPaused(true) });

  const isSmallScreen = useIsSmallScreen();

  const isFirstTime = isPaused === undefined ? 'Iniciar' : isPaused ? 'Continuar' : 'Detener'

  const buttons = [
    { onClick: shufflePlayList, icon: Shuffle, text: "Aleatorio" },
    { onClick: playPrev, icon: SkipPrevious, text: "Anterior" },
    { onClick: handlePlay, icon: isFirstTime === "Detener" ? Pause : Play, text: isFirstTime },
    { onClick: playNext, icon: SkipNext, text: "Siguiente" },
    { onClick: handleLooping, icon: isLooping ? RepeatOne : Repeat, text: isLooping ? "En Bucle" : "Repetir", pressed: isLooping },
  ];

  const renderButton = ({ onClick, icon, text, pressed = false }: { onClick: () => void, icon: string, text: string, pressed?: boolean }, key: number) => (
    <CustomButton key={'control-btn-' + key} onClick={onClick} pressed={pressed}>
      {isSmallScreen ? <img className="control-icon" src={icon} alt={text} width={30} /> : text}
    </CustomButton>
  );

  return (
    <div className="current-song">
      <div className="video-container" ref={playerRef} />
      <div className="controls">
        {buttons.map(renderButton)}
      </div>
      <div className="song-description">
        <span style={{ color: "#66bb6a" }}>Reproduciondo ahora</span>
        <h3 style={{ color: "#66bb6a" }}>{currentSong?.details?.title}</h3>
        <span style={{ color: "#6B7280" }}>{currentSong?.details?.author_name} - {toMinSec(songData.duration)}</span>
      </div>

    </div>
  );
};

export default CurrentSong;
