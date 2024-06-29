import React, { useState } from 'react';
import './AddTrending.css';

const AddTrending = () => {
  const [trendingName, setTrendingName] = useState('');
  const [trendingImage, setTrendingImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add trending item
    console.log('Trending Item Added:', { trendingName, trendingImage });
    setTrendingName('');
    setTrendingImage('');
  };

  return (
    <div className="add-trending">
      <h2>Add Trending</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Trending Name"
          value={trendingName}
          onChange={(e) => setTrendingName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Trending Image URL"
          value={trendingImage}
          onChange={(e) => setTrendingImage(e.target.value)}
        />
        <button type="submit">Add Trending</button>
      </form>
    </div>
  );
};

export default AddTrending;
