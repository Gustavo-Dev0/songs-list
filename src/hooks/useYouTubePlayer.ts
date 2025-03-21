import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface IYouTubePlayerProps {
  playerRef: React.RefObject<HTMLDivElement | null>
  videoId: string
  onEnd: () => void
  onPlay: (event: YT.PlayerEvent) => void
  onPause: () => void
}


export function useYouTubePlayer({ playerRef, videoId, onEnd, onPlay, onPause }: IYouTubePlayerProps) {

  const [ytReady, setYtReady] = useState(false);
  const playerInstance = useRef<YT.Player | null>(null);

  useEffect(() => {
    if (!window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => setYtReady(true);
    }

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
    if (playerRef &&ytReady && playerRef.current && window.YT && videoId) {
      if (!playerInstance.current) {
        playerInstance.current = new window.YT.Player(playerRef.current, {
          videoId,
          playerVars: { autoplay: 1 },
          events: {
            onStateChange: (event: YT.OnStateChangeEvent) => {
              if (event.data === window.YT!.PlayerState.ENDED) onEnd();
              else if (event.data === window.YT!.PlayerState.PLAYING) onPlay(event);
              else if (event.data === window.YT!.PlayerState.PAUSED) onPause();
            },
          },
        });
      } else {
        playerInstance.current.loadVideoById(videoId);
      }
    }
  }, [ytReady, videoId]);

  return playerInstance;
}
