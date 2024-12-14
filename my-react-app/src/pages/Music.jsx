import React from 'react';

const Music = () => {
  const musicList = [
    {
      title: 'Song Title 1',
      description: 'This is one of my favorite songs because it inspires me to keep going.',
      videoUrl: 'https://www.youtube.com/embed/videoid1', // Replace with the actual YouTube video ID
    },
    {
      title: 'Song Title 2',
      description: 'A nostalgic track that reminds me of great memories.',
      videoUrl: 'https://www.youtube.com/embed/videoid2',
    },
    {
      title: 'Song Title 3',
      description: 'This song has incredible energy and helps me focus while coding.',
      videoUrl: 'https://www.youtube.com/embed/videoid3',
    },
    // Add more songs as needed
  ];

  return (
    <div className="music-page">
      <header className="music-page__header">
        <h1>Music I Love</h1>
        <p>Here’s a collection of songs that inspire and motivate me.</p>
      </header>
      <main className="music-page__main">
        {musicList.map((music, index) => (
          <div key={index} className="music-card">
            <h2 className="music-card__title">{music.title}</h2>
            <iframe
              className="music-card__video"
              src={music.videoUrl}
              title={music.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className="music-card__description">{music.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Music;
