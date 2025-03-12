import { useState } from "react"
import "./TextInput.css"
import { addSong, getSongs } from "../data/songsDB"
import CustomButton from "./CustomButton"

interface ITextInputProps {
  setSongs: (songs: string[]) => void
}

const TextInput = ({ setSongs }: ITextInputProps) => {
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
      console.log('Errorororroor')
      setError("Link inválido")
      return
    }
    addSong(idVideo!)
    setSongs(getSongs())
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