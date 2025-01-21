import React from 'react';
import './MusicFound.scss';

const MusicFound = ({ music }) => {
  console.log(music);

  const { recognized_song, similar_songs } = music

  return (
    <div className='music-player'>
      <div className='player-main'>
        <div className='main-current'>
          <div className='current-keyvisual'>
            <img
              src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/329679/music-player-freebie-photo.png'
              alt='Current track'
            />
          </div>
          <div className='current-info'>
            <h1>{recognized_song?.title}</h1>
            <p>
              {recognized_song?.artists
                ?.map((artist) => artist.name)
                .join(', ')}
            </p>          </div>
        </div>
        <div className='main-control'>
          <div className='btn _previous'></div>
          <div className='btn _pause'></div>
          <div className='btn _next'></div>
          <div className='btn _timeline'>
            <span className='current-time'>2:32</span>
            <span className='timescope'>
              <span className='timescope-dot'></span>
            </span>
            <span className='end-time'>4:00</span>
          </div>
        </div>

        <div className='redirect-button'>
          <a
            href='https://spotify.com'
            target='_blank'
            rel='noopener noreferrer'
            className='glassmorphic-button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='spotify-icon'
              fill='white'
            >
              <path d='M12 2.25A9.75 9.75 0 1 0 21.75 12 9.75 9.75 0 0 0 12 2.25zm4.31 13.78a.748.748 0 0 1-1.03.21 12.515 12.515 0 0 0-4.62-1.52 12.2 12.2 0 0 0-4.5.54.75.75 0 1 1-.54-1.41 13.7 13.7 0 0 1 5.04-.6c1.83.16 3.58.68 5.2 1.54a.75.75 0 0 1 .21 1.04zm.7-3.12a.75.75 0 0 1-1.03.2 15.4 15.4 0 0 0-4.95-1.56 15.1 15.1 0 0 0-5.47.57.75.75 0 0 1-.47-1.42 16.54 16.54 0 0 1 6-.63c2.06.17 4.04.73 5.86 1.64a.75.75 0 0 1 .2 1.1zm.68-3.24a.75.75 0 0 1-1.05.19A18.33 18.33 0 0 0 12 8.46c-2.19.18-4.3.77-6.22 1.73a.75.75 0 1 1-.66-1.36 19.87 19.87 0 0 1 6.88-1.88 19.58 19.58 0 0 1 6.64 1.9.75.75 0 0 1 .19 1.05z' />
            </svg>
            Listen on Spotify
          </a>
        </div>
      </div>
      <ul className='player-list'>
        {
          similar_songs && similar_songs.map((song,key) => (
            <li key={key}>
              <img
                className='list-cover'
                src={song.cover_image}
                alt='Sunset Lover'
              />
              <div className='list-info'>
                <div className='info-title'>{song.name}</div>
                <div className='info-artist'>{song.artist}</div>
              </div>
            </li>
          ))
        }

        {/* <li>
          <img
            className='list-cover'
            src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/329679/music-player-freebie-a3.png'
            alt='Youth'
          />
          <div className='list-info'>
            <div className='info-title'>Youth</div>
            <div className='info-artist'>TROYE SIVAN</div>
          </div>
        </li>
        <li>
          <img
            className='list-cover'
            src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/329679/music-player-freebie-a4.png'
            alt='Working Girl'
          />
          <div className='list-info'>
            <div className='info-title'>Working Girl</div>
            <div className='info-artist'>LITTLE BOOTS</div>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default MusicFound;
