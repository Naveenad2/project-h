import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './FoodDisplay.css';
import { app } from './firebase'; // Ensure you import your Firebase app configuration

const FoodDisplay = () => {
  const [foodCategories, setFoodCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const db = getDatabase(app);
    const foodCategoriesRef = ref(db, 'foodCategories'); // Adjust the reference as needed

    onValue(foodCategoriesRef, (snapshot) => {
      const data = snapshot.val();
      const categories = Object.keys(data).map(key => ({
        ...data[key],
        id: key,
      }));
      setFoodCategories(categories);
    });
  }, []);

  const filteredCategories = foodCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="food-display">
      <h1>Grab your <span>Delicious food</span></h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search food"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="categories">
        {filteredCategories.map((category) => (
          <div key={category.id} className="category">
            <img src={category.imageUrl} alt={category.title} />
            <h2>{category.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
