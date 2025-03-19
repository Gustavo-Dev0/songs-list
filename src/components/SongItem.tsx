import "./SongItem.css"
import QueueMusic from "./../assets/queue_music.svg"
import Drag from "./../assets/drag.svg"
import Remove from "./../assets/close.svg"
import usePlaylistStore, { Song } from "../store/playlistStore"
import { useEffect } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';

interface ISongProps {
  song: Song
  isSmallScreen: boolean
}

const SongItem = ({ song, isSmallScreen }: ISongProps) => {

  const currentSongId = usePlaylistStore((state) => state.currentSong?.videoId)
  const setCurrentSong = usePlaylistStore((state) => state.setCurrentSong)
  const removeFromPlayList = usePlaylistStore((state) => state.removeFromPlayList)
  const fetchSongDetails = usePlaylistStore((state) => state.fetchSongDetails)

  useEffect(() => {
    if (!song.details) fetchSongDetails(song)
  }, [])

  const isCurrentSong = currentSongId === song.videoId

  const handleSetCurrentSong = () => {
    setCurrentSong(song)
  }

  const handleRemoveSong = () => {
    removeFromPlayList(song)
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
    transition,
  } = useSortable({ id: song.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 100 : 1,
    transition,
  };

  const backgroundColor = isCurrentSong ? { backgroundColor: "#A5D6A7" } : {}

  const dragHandleAttributes = {
    ...listeners,
    ...attributes,
  }

  return (
    <div ref={setNodeRef} style={{ ...style, ...backgroundColor }} {...(isSmallScreen ? {} : { ...listeners, ...attributes })} onClick={handleSetCurrentSong} className="song-item">
      {
        isSmallScreen &&
        <span {...dragHandleAttributes} style={{ cursor: "move", userSelect: "none", touchAction: "none" }} className="drag-handle">
          <img src={Drag} alt='list_music' width={25} />
        </span>
      }
      <img src={QueueMusic} alt='list_music' width={25} />
      <img src={song.details?.thumbnail_url} alt={song.details?.title} width={50} />
      <span className="song-title">{song.details?.title}</span>

      {!isCurrentSong && <img className="remove-button" src={Remove} alt='remove' width={25} onClick={(event) => { event.preventDefault(); event.stopPropagation(); handleRemoveSong() }} />}
    </div>

  )
}
export default SongItem


//https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=SDopQqrG85E&format=json