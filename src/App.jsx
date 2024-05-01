import React from 'react';
import TopAnime from './components/TopAnime';
import AnimeChart from './components/AnimeChart';

const App = () => {
  return (
    <div className=" bg-orange-50 mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold">Top 20 Anime</h1>
      <TopAnime />
      <AnimeChart />
    </div>
  );
};

export default App;
