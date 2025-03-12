import { useEffect, useState } from 'react'
import './App.css'
import PlayList from './components/PlayList'
import CurrentSong from './components/CurrentSong'
import TextInput from './components/TextInput'
import { getSongs } from './data/songsDB'
import TopBar from './components/TopBar'

declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function App() {

  const [songs, setSongs] = useState<string[]>([])
  const [currentSongId, setCurrentSongId] = useState<string>('')

  useEffect(() => {
    const songsSaved = getSongs()
    setSongs(songsSaved)
    if (songsSaved.length > 0 && currentSongId === '') {
      setCurrentSongId(() => songsSaved[0] + '')
    }
  }, [])

  //return <iframe ref={(el) => (playerRef.current = el as HTMLIFrameElement)} />;

  return (
    <>
      <div className='topbar-container'>
        <TopBar></TopBar>
      </div>
      <div className="main-container">
        <div className="current-song-container">
          <CurrentSong currentSongId={currentSongId} setCurrentSongId={setCurrentSongId} />
        </div>
        <div className="playlist-container">
          <h3 className='playlist-title'>Mi lista favorita</h3>
          <TextInput setSongs={setSongs} />
          <PlayList songs={songs} setCurrentSongId={setCurrentSongId} currentSongId={currentSongId} setSongs={setSongs}/>
        </div>
      </div>
    </>
  )
}

export default App
