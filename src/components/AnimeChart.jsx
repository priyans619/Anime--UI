import React, { useEffect, useState } from 'react';
import { ResponsiveContainer } from 'recharts';

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

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
