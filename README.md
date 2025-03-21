# 🎵 YouTube Music Player

Este proyecto es un reproductor de música basado en YouTube, desarrollado con React y TypeScript. Permite la reproducción de videos de YouTube, navegación por una lista de reproducción y control de reproducción adaptable a pantallas pequeñas.

## 🚀 Características
- 📺 Reproducción de videos de YouTube mediante la API de YouTube.
- 🔁 Controles de reproducción: reproducir, pausar, anterior, siguiente, aleatorio y repetición.
- 📱 Diseño responsivo con adaptaciones para pantallas pequeñas.
- 🎵 Manejo de estado con Zustand para la lista de reproducción.
- 💾 Guarda la lista de reproducción en el Local Storage.
- ➕ Permite agregar canciones manualmente.
- 🎯 Usa drag and drop con DnD Kit para reordenar canciones.

## 🛠️ Tecnologías Utilizadas
- React 18 + TypeScript
- Zustand (manejo de estado)
- DnD Kit (drag and drop)
- API de YouTube
- CSS para estilos personalizados

## 📂 Estructura del Proyecto
```
📦 src
 ┣ 📂 assets          # Íconos y recursos gráficos
 ┣ 📂 components      # Componentes principales
 ┃ ┣ 📜 CurrentSong.tsx  # Componente del reproductor actual
 ┃ ┗ 📜 CustomButton.tsx # Botón personalizado
 ┣ 📂 hooks           # Hooks personalizados
 ┃ ┗ 📜 useIsSmallScreen.ts  # Hook para detectar pantallas pequeñas
 ┃ ┗ 📜 useYouTubePlayer.ts  # Hook para incrustar el video de YouTube
 ┣ 📂 store           # Almacenamiento global con Zustand
 ┃ ┗ 📜 playlistStore.ts  # Estado de la lista de reproducción
 ┗ 📜 App.tsx         # Componente principal
```

## ⚡ Instalación y Uso
1. Clona este repositorio:
   ```sh
   git clone https://github.com/Gustavo-Dev0/songs-list.git
   ```
2. Navega al directorio del proyecto:
   ```sh
   cd songs-list
   ```
3. Instala las dependencias:
   ```sh
   npm install
   ```
4. Inicia el proyecto en modo desarrollo:
   ```sh
   npm run dev
   ```

## 🌐 Demo
Puedes probar la aplicación en el siguiente enlace:
[YouLife - Demo](https://youlife.pages.dev)

## 🏗️ Futuras Mejoras
- 🔍 Búsqueda de canciones dentro de la lista de reproducción.
- 🎨 Mejoras en la UI/UX.
- 🛑 Manejo de errores más robusto para la API de YouTube.

## 📄 Licencia
Este proyecto está bajo la licencia MIT.

