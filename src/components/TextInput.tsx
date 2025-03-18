import { useState } from "react"
import "./TextInput.css"
import CustomButton from "./CustomButton"
import usePlaylistStore from "../store/playlistStore"

/*interface ITextInputProps {
}*/

const TextInput = () => {

  const addToPlayList = usePlaylistStore((state) => state.addToPlayList)

  const [link, setLink] = useState<string>('')

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value)
  }

  const [error, setError] = useState<string | undefined>(undefined)

  const handleAddSong = () => {
    if(link && link === '') return
    const linkParsed = URL.parse(link)
    const idVideo = linkParsed?.searchParams.get('v')
    if(idVideo === undefined){
      setError("Link inválido")
      return
    }
    addToPlayList({id: crypto.randomUUID(), videoId: idVideo!})
    setLink('')
    setError(undefined)
  }

  return (
    <div className="input-container" style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
      <input className="text-input" type="text" value={link} onChange={handleLinkChange} placeholder="Enlace de YouTube..." />
      {error && <span style={{color: 'red'}}>{error}</span>}
      <CustomButton onClick={handleAddSong} >Agregar</CustomButton>
    </div>
  )
}
export default TextInput