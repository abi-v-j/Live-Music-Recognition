import React from "react";
import styles from "./MusicRecognition.module.css";

const RecognizedMusic = ({ data }) => {
  const { recognized_song, similar_songs, genre_used } = data;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎵 Recognized Music 🎶</h1>
      <div className={styles.songDetails}>
        <h2>{recognized_song.title}</h2>
        <p>
          <strong>Artist:</strong> {recognized_song.artists.map((artist) => artist.name).join(", ")}
        </p>
        <p>
          <strong>Album:</strong> {recognized_song.album.name}
        </p>
        <p>
          <strong>Genre:</strong> {genre_used}
        </p>
        <p>
          <strong>Release Date:</strong> {recognized_song.release_date}
        </p>
        <p>
          <strong>Label:</strong> {recognized_song.label}
        </p>
      </div>

      <div className={styles.similarSongs}>
        <h3>🎧 Similar Songs</h3>
        <ul>
          {similar_songs.map((song, index) => (
            <li key={index} className={styles.songCard}>
              <img
                src={song.cover_image}
                alt={song.name}
                className={styles.coverImage}
              />
              <div className={styles.songInfo}>
                <h4>{song.name}</h4>
                <p>
                  <strong>Artist:</strong> {song.artist}
                </p>
                <p>
                  <strong>Album:</strong> {song.album}
                </p>
                <p>
                  <strong>Genre:</strong> {song.genre}
                </p>
                <p>
                  <strong>Popularity:</strong> {song.popularity}
                </p>
                <a
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Listen on Spotify
                </a>
                <audio controls className={styles.audioPreview}>
                  <source src={song.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecognizedMusic;
