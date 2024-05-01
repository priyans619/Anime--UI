import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ChartComponent = () => {
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          const processedData = processAnimeData(responseData.data);
          setAnimeData(processedData);
        } else {
          console.error('Error: Data is not in the expected format.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processAnimeData = (data) => {
    const animeMap = new Map();
    data.forEach((anime) => {
      if (!anime.aired || !anime.aired.from || !anime.title) {
        console.error('Error: Data is missing required fields.');
        return;
      }
      const year = new Date(anime.aired.from).getFullYear();
      if (!animeMap.has(year)) {
        animeMap.set(year, []);
      }
      animeMap.get(year).push(anime.title);
    });

    const sortedYears = Array.from(animeMap.keys()).sort((a, b) => a - b);

    const processedData = sortedYears.map((year) => {
      return { year, anime: animeMap.get(year).slice(0, 20) }; // Limit to top 20 anime per year
    });

    return processedData;
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
