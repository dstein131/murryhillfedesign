import React from 'react';

const Music = () => {
  const musicList = [
    {
      title: 'Sleep Token - Hypnosis An offering from II',
      description: 'One of my favorite drummers. This song helps me focus when I work.',
      videoUrl: 'https://www.youtube.com/embed/nNZlxQmpV8g',
    },
    {
      title: 'The Yussef Dayes Experience - Full Performance (Live on KEXP)',
      description: 'Another brilliant drummer, great modern jazz fusion.',
      videoUrl: 'https://www.youtube.com/embed/S1BuRprwXNc',
    },
    {
      title: 'Mac DeMarco - Chamber Of Reflection',
      description: 'Great all-round vibes.',
      videoUrl: 'https://www.youtube.com/embed/pQsF3pzOc54',
    },
    {
      title: 'TOPS - Petals',
      description: 'Relaxing and chill.',
      videoUrl: 'https://www.youtube.com/embed/lguSVD7piyo',
    },
    
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
            <iframe
              className="music-card__video"
              src={music.videoUrl}
              title={music.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h2 className="music-card__title">{music.title}</h2>
            <p className="music-card__description">{music.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Music;
