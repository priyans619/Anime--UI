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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-red-500 rounded-lg p-4">
          <p className="text-center font-bold">{`${label}`}</p>
          <ul className="pl-4">
            {payload[0].payload.anime.map((anime, index) => (
              <li key={index}>{anime}</li>
            ))}
          </ul>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
      <AreaChart data={animeData}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="year" />
          <YAxis type="number" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="anime.length" stroke="#8884d8" fillOpacity={1} fill="url(#colorGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
