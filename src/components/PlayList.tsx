import SongItem from "./SongItem"
import "./PlayList.css"
import usePlaylistStore from "../store/playlistStore"
import { useEffect } from "react"

/*interface PlayListProps {
}
*/

const PlayList = () => {

  const playList = usePlaylistStore((state) => state.playList)
  const fetchSongs = usePlaylistStore((state) => state.fetchSongs)

  useEffect(() => {
    if(playList.length === 0)
      fetchSongs()
  }, [])

  return (
    <div className="songs-container">
      {
        playList.map((song) => {
          return <SongItem key={song.id} song={song} ></SongItem>
        })
      }
    </div>
  )
}
export default PlayList