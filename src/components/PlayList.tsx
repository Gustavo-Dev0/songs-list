import SongItem from "./SongItem"
import "./PlayList.css"
import usePlaylistStore from "../store/playlistStore"
import { useEffect, useState } from "react"
import { DndContext, DragEndEvent, PointerSensor, useSensor } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { useIsSmallScreen } from "../hooks/useIsSmallScreen"

/*interface PlayListProps {
}
*/

const PlayList = () => {

  const playList = usePlaylistStore((state) => state.playList)
  const fetchSongs = usePlaylistStore((state) => state.fetchSongs)
  const swapSongs = usePlaylistStore((state) => state.swapSongs)

  const [isDragging, setIsDragging] = useState(false)

  const isSmallScreen = useIsSmallScreen()

  useEffect(() => {
    if (playList.length === 0)
      fetchSongs()
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return
    swapSongs(event.active.id.toString(), event.over.id.toString())
    setIsDragging(false)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const sensors = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3
    }
  });

  return (
    <div className="songs-container" style={{ overflowY: isDragging ? 'hidden' : 'auto' }}>
      <DndContext onDragEnd={handleDragEnd} sensors={[sensors]} onDragStart={handleDragStart} >
        <SortableContext items={playList.map((song) => song.id)}>
          {playList.map((song) => {
            return <SongItem key={song.id} song={song} isSmallScreen={isSmallScreen} ></SongItem>
          })}
        </SortableContext>
      </DndContext>
    </div>
  )
}
export default PlayList