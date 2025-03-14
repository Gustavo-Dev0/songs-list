import { useEffect, useRef, useState } from "react";
import "./CurrentSong.css";
import { getNextSong, getPrevSong } from "../data/songsDB";
import CustomButton from "./CustomButton";
import { YouTubeOEmbed } from "../types";

interface ICurrentSongProps {
  currentSongId: string;
  setCurrentSongId: (songId: string) => void;
}

declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const CurrentSong = ({ currentSongId, setCurrentSongId }: ICurrentSongProps) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerInstance = useRef<YT.Player | null>(null);
  const [ytReady, setYtReady] = useState(false);
  const [isPaused, setIsPaused] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Solo define onYouTubeIframeAPIReady una vez
    if (!window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => {
        console.log("🎥 API de YouTube lista");
        setYtReady(true);
      };
    }

    // Cargar la API de YouTube si no está cargada
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    } else {
      setYtReady(true);
    }
  }, []);



  useEffect(() => {
    if (ytReady && playerRef.current && window.YT) {
      if (!playerInstance.current) {
        // 📌 Crea el reproductor solo una vez
        playerInstance.current = new window.YT.Player(playerRef.current, {
          videoId: currentSongId,
          playerVars: { autoplay: 1 },
          events: {
            onStateChange: (event: YT.OnStateChangeEvent) => {
              if (event.data === window.YT!.PlayerState.ENDED) {
                console.log("🎬 El video terminó.");
                handleNextSong();
              }

              if (event.data === window.YT!.PlayerState.PLAYING) {
                updateInfo(event);
                setIsPaused(false);
              }

              if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPaused(true); // El video está pausado
              }
            }
          },
        });
      } else {
        // 📌 Cambia el video sin crear un nuevo reproductor
        playerInstance.current.loadVideoById(currentSongId);
      }
    }
  }, [ytReady, currentSongId]);

  function handleNextSong() {
    const url = URL.parse(playerInstance.current!.getVideoUrl());
    const next = getNextSong(url?.searchParams.get('v') || '');
    //console.log(JSON.stringify(next), JSON.stringify(url?.searchParams.get('v') || ''))
    setCurrentSongId(next);
  }

  function handlePrevSong() {
    const url = URL.parse(playerInstance.current!.getVideoUrl());
    const next = getPrevSong(url?.searchParams.get('v') || '');
    //console.log(JSON.stringify(next), JSON.stringify(url?.searchParams.get('v') || ''))
    setCurrentSongId(next);
  }

  const [songData, setSongData] = useState({ duration: 0 })

  function updateInfo(event: YT.PlayerEvent) {
    setSongData({
      duration: event.target.getDuration()
    })
  }

  const [currentSongExtraInfo, setCurrentSongExtraInfo] = useState<YouTubeOEmbed | undefined>(undefined)

  useEffect(() => {
    async function fetchVideoInfo(videoId: string) {
      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        const data = await response.json();
        setCurrentSongExtraInfo(data);
      } catch (error) {
        console.error("Error obteniendo los datos:", error);
      }
    }
    if (currentSongId) fetchVideoInfo(currentSongId)
  }, [currentSongId])

  const toMinSec = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)
    const strSec = sec < 10 ? ('0' + sec) : sec + ''
    return `${min}:${strSec}`
  }

  return (
    <div className="card current-song">
      {/* 📌 El reproductor de YouTube se monta en este `div` */}
      <div className="video-container" ref={playerRef} />
      <div className="controls">
        <CustomButton onClick={() => {  }} disabled>Aleatorio</CustomButton>
        <CustomButton onClick={() => { handlePrevSong() }} >Anterior</CustomButton>
        <CustomButton onClick={() => { if(isPaused === undefined){ playerInstance.current?.playVideo() }else if (!isPaused) { playerInstance.current?.pauseVideo()} else {playerInstance.current?.playVideo()} }} >{isPaused === undefined ? 'Iniciar' : isPaused ? 'Continuar' : 'Detener'}</CustomButton>
        <CustomButton onClick={() => { handleNextSong() }} >Siguiente</CustomButton>
        <CustomButton onClick={() => {  }} disabled>Repetir</CustomButton>
      </div>
      <div className="song-description">
        <span style={{ color: "#66bb6a" }}>Reproduciondo ahora</span>
        <h3 style={{ color: "#66bb6a" }}>{currentSongExtraInfo?.title}</h3>
        <span style={{ color: "#6B7280" }}>{currentSongExtraInfo?.author_name} - {toMinSec(songData.duration)}</span>
        {/* <p style={{ color: "#000000" }}>industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galle
          y of type and scrambled it to make a type specimen book. It has survived not o
          nly five centuries, but also the leap into electronic typesetting, remaining e
          ssentially unchanged. It was</p> */}
      </div>

    </div>
  );
};

export default CurrentSong;
