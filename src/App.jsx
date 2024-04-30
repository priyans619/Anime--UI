import React from 'react';
import TopAnime from './components/TopAnime';

const App = () => {
  return (
    <div className=" bg-orange-50 mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-4">Top 20 Anime</h1>
      <TopAnime />
    </div>
  );
};

export default App;
