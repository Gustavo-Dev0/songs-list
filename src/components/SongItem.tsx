import { useEffect, useState } from "react"
import { YouTubeOEmbed } from "../types"
import "./SongItem.css"
import QueueMusic from"./../assets/queue_music.svg"
import Remove from"./../assets/close.svg"
import { getSongs, removeSong } from "../data/songsDB"

interface ISongProps {
  songId: string
  setCurrentSongId: (songId: string) => void
  isCurrentSong: boolean
  setSongs: (songs: string[]) => void
}

const SongItem = ({ songId, setCurrentSongId, isCurrentSong, setSongs }: ISongProps) => {

  const [song, setSong] = useState<YouTubeOEmbed | undefined>(undefined)

  useEffect(() => {
    async function fetchVideoInfo(videoId: string) {
      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        const data = await response.json();
        setSong(data);
      } catch (error) {
        console.error("Error obteniendo los datos:", error);
      }
    }
    fetchVideoInfo(songId)
  }, [])

  const handleClick = () => {
      setCurrentSongId(songId)
  }

  //console.log(songId === songId)

  return (
    <>
      {song ?
        <div className="song-item" onClick={handleClick} style={isCurrentSong ? { backgroundColor: "#A5D6A7" } : {}}>
          <img src={QueueMusic} alt='list_music' width={25} />
          <img src={song.thumbnail_url} alt={song.title} width={50} />
          <span className="song-title">{song.title}</span>
          
          {!isCurrentSong && <img className="remove-button" src={Remove} alt={song.title} width={25} onClick={(event)=>{removeSong(songId);setSongs(getSongs());event.preventDefault();event.stopPropagation()}}/>}
        </div>
        : <div></div>}
    </>

  )
}
export default SongItem


//https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=SDopQqrG85E&format=json