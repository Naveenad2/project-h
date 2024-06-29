import { getDatabase, onValue, push, ref } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageReff, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { app } from '../../firebase';
import './AddCategory.css';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const db = getDatabase(app);
    const categoryRef = ref(db, 'category');
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedCategories = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].categoryName,
          imageUrl: data[key].imageUrl,
        }));
        setCategories(fetchedCategories);
      }
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      setMessage('Please enter a category name and select an image.');
      return;
    }

    setLoading(true);

    const storage = getStorage(app);
    const storageRef = storageReff(storage, `category-images/${categoryImage.name}`);

    try {
      // Upload the image to Firebase storage
      await uploadBytes(storageRef, categoryImage);
      const downloadURL = await getDownloadURL(storageRef);

      // Push the category data to Firebase database
      const db = getDatabase(app);
      const dataRef = ref(db, 'category');
      await push(dataRef, {
        categoryName,
        imageUrl: downloadURL,
      });

      setMessage('Category added successfully!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setCategoryName('');
      setCategoryImage(null);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-category-container">
      {loading && <div className="loading-screen">Loading...</div>}
      <div className="demo-card">
        <h3>Preview of Categories</h3>
        <div className="card-slider">
          {categories.map((category) => (
            <div key={category.id} className="card">
              <img src={category.imageUrl} alt={category.name} className="card-image" />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="add-category">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="input-field"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-field"
          />
          <button type="submit" className="submit-button">Add Category</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      {showSuccess && (
        <div className="success-popup">
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <p>Category added successfully!</p>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
