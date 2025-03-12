import SongItem from "./SongItem"
import "./PlayList.css"

interface PlayListProps {
  songs: string[]
  setCurrentSongId: (songId: string) => void
  currentSongId: string
  setSongs: (songs: string[]) => void
}

const PlayList = ({ songs, setCurrentSongId, currentSongId, setSongs }: PlayListProps) => {
  return (
    <div className="songs-container">
      {
        songs.map((song) => {
          return <SongItem key={song} songId={song} setCurrentSongId={setCurrentSongId} isCurrentSong={currentSongId === song} setSongs={setSongs}></SongItem>
        })
      }
    </div>
  )
}
export default PlayList