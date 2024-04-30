import React, { useState, useEffect } from 'react';

const TopAnime20 = () => {
  const [topAnime, setTopAnime] = useState([]);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {topAnime.map((anime) => (
        <div key={anime.mal_id} className="bg-white rounded-lg shadow-md p-4">
          <span className="text-sm font-bold text-gray-600">{`#${anime.rank}`}</span>
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="mt-2 h-48 w-full object-cover"
            style={{ height: '250px' }}
          />
          <h2 className="text-lg text-center font-bold mt-2 overflow-hidden line-clamp-2">{anime.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default TopAnime20;
