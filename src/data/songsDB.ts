const templateSongs = [
  "idFGrL2EH8c", "_ulh3hkEMUQ", "A2aixdFINOQ", "mnwoxXWgosg", "V3R06qkyiUo", "e2c8NkNY41U"
]

export function getSongs(): string[] { //from local storage
  let songs = JSON.parse(localStorage.getItem('songs') || '[]')
  if(songs.length === 0){
    setSongs(templateSongs)
    songs = JSON.parse(localStorage.getItem('songs') || '[]')
  }
  //console.log(songs)
  return songs
}

export function setSongs(songs: string[]) { //to local storage
  localStorage.setItem('songs', JSON.stringify(songs))
}

export function addSong(song: string) {
  const songs = getSongs()
  songs.push(song)
  setSongs(songs)
}

export function removeSong(song: string) {
  const songs = getSongs()
  const newSongs = songs.filter((s) => s !== song)
  setSongs(newSongs)
}

export function clearSongs() {
  localStorage.removeItem('songs')
}

export function getNextSong(currentSongId: string): string {
  const songs = getSongs()
  const currentIndex = songs.indexOf(currentSongId)
  if (currentIndex === -1) return songs[0]
  const nextIndex = (currentIndex + 1) % songs.length
  return songs[nextIndex]
}

export function getPrevSong(currentSongId: string): string {
  const songs = getSongs()
  const currentIndex = songs.indexOf(currentSongId)
  if (currentIndex === -1) return songs[0]
  const nextIndex = (currentIndex - 1) % songs.length
  return songs[nextIndex]
}

