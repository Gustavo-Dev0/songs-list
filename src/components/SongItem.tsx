import "./SongItem.css"
import QueueMusic from"./../assets/queue_music.svg"
import Remove from"./../assets/close.svg"
import usePlaylistStore, { Song } from "../store/playlistStore"
import { useEffect } from "react"

interface ISongProps {
  song: Song
}

const SongItem = ({ song }: ISongProps) => {

  const currentSongId = usePlaylistStore((state) => state.currentSong?.videoId)
  const setCurrentSong = usePlaylistStore((state) => state.setCurrentSong)
  const removeFromPlayList = usePlaylistStore((state) => state.removeFromPlayList)
  const fetchSongDetails = usePlaylistStore((state) => state.fetchSongDetails)

  useEffect(() => {
    if(!song.details) fetchSongDetails(song)
  }, [])

  const isCurrentSong = currentSongId === song.videoId

  const handleSetCurrentSong = () => {
      setCurrentSong(song)
  }

  const handleRemoveSong = () => {
    removeFromPlayList(song)
  }

  return (
    <>
      {song ?
        <div className="song-item" onClick={handleSetCurrentSong} style={isCurrentSong ? { backgroundColor: "#A5D6A7" } : {}}>
          <img src={QueueMusic} alt='list_music' width={25} />
          <img src={song.details?.thumbnail_url} alt={song.details?.title} width={50} />
          <span className="song-title">{song.details?.title}</span>
          
          {!isCurrentSong && <img className="remove-button" src={Remove} alt='remove' width={25} onClick={(event)=>{event.preventDefault();event.stopPropagation();handleRemoveSong()}}/>}
        </div>
        : <div></div>}
    </>

  )
}
export default SongItem


//https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=SDopQqrG85E&format=json