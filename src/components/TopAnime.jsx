import React, { useState, useEffect } from 'react';

const TopAnime20 = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        if (!response.ok) {
          throw new Error('Failed to fetch top anime');
        }
        const data = await response.json();
        if (!data.data) {
          throw new Error('Top anime data is undefined');
        }
        setTopAnime(data.data.slice(0, 20));
      } catch (error) {
        console.error('Error fetching top anime:', error);
      }
    };

    fetchTopAnime();
  }, []);

  const handleCardClick = (animeId) => {
    setExpandedCard(animeId === expandedCard ? null : animeId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-12 relative">
      {topAnime.map((anime) => (
        <div
          key={anime.mal_id}
          className={`relative p-1 transition-transform duration-300 ease-out overflow-hidden ${expandedCard === anime.mal_id ? 'z-30 scale-125' : 'z-0 transform scale-100'
            }`}

          style={{
            width: '100%',
            height: '300px',
          }}
         
        >
          <span className="absolute bg-pink-500 rounded-tr-lg px-2 py-1 top-0 right-0 text-sm font-bold text-gray-600">{`${anime.rank}`}</span>
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="rounded-t-lg h-48 w-full object-cover"
            style={{ height: '300px' }}
          />
          <h2 className="text-lg text-center font-bold overflow-hidden line-clamp-2">{anime.title}</h2>
          
        </div>
      ))}
    </div>
  );
};

export default TopAnime20;
