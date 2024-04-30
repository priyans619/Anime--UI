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
  );
};

export default TopAnime20;
