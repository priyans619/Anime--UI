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
      } catch (error) {
        console.error('Error fetching top anime:', error);
      }
    };

    fetchTopAnime();
  }, []);

  return (
    <div className="">
      {topAnime.map((anime) => (
        <div key={anime.mal_id} className="bg-white rounded-lg shadow-md p-4">
          <span className="text-sm font-bold text-gray-600">{`#${anime.rank}`}</span>
          <img src={anime.images.jpg.image_url} alt={anime.title} className="mt-2 h-48 w-full object-cover" />
          <h2 className="text-lg font-bold mt-2">{anime.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default TopAnime20;
