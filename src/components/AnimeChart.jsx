import React, { useEffect } from 'react';
import { ResponsiveContainer } from 'recharts';

const ChartComponent = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
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
