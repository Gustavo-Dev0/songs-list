import './App.css'
import PlayList from './components/PlayList'
import CurrentSong from './components/CurrentSong'
import TextInput from './components/TextInput'
import TopBar from './components/TopBar'

declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function App() {

  return (
    <>
      <div className='topbar-container'>
        <TopBar></TopBar>
      </div>
      <div className="main-container">
        <div className="current-song-container">
          <CurrentSong />
        </div>
        <div className="playlist-container">
          <h3 className='playlist-title'>Mi lista favorita</h3>
          <TextInput />
          <PlayList />
        </div>
      </div>
    </>
  )
}

export default App
