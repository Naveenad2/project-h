import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { app } from '../firebase';
import './Categories.css';

const Categories = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const categoryContainerRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(app);
    const categoryRef = ref(db, 'category');
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedCategories = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCategories(fetchedCategories);
      }
    });

    const scrollContainer = categoryContainerRef.current;
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }, 50); // Adjust scroll speed here
    };

    startAutoScroll();

    return () => clearInterval(scrollInterval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="categories-container">
      <h2 className="categories-heading">Categories</h2>
      <p className="categories-description">Explore our variety of categories</p>
      <div className="categories" ref={categoryContainerRef}>
        {categories.map((category) => (
          <div
            className={`category-card ${selectedCategory === category.categoryName ? 'selected' : ''}`}
            key={category.id}
            onClick={() => onSelectCategory(category.categoryName)}
          >
            <img src={category.imageUrl} alt={category.categoryName} className="category-img" />
            <span className="category-name">{category.categoryName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
