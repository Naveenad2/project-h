import { getDatabase, onValue, push, ref } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageReff, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { FaPepperHot, FaStar } from 'react-icons/fa';
import { app } from '../../firebase';
import './AddFood.css';

const AddFood = () => {
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodImage, setFoodImage] = useState(null);
  const [category, setCategory] = useState('');
  const [spicy, setSpicy] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [offer, setOffer] = useState('');
  const [todaySpecial, setTodaySpecial] = useState(false);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const db = getDatabase(app);
    const categoryRef = ref(db, 'category');
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedCategories = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].categoryName,
        }));
        setCategories(fetchedCategories);
      }
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFoodImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foodName || !foodPrice || !foodImage || !category || !description || !quantity) {
      alert('Please fill in all fields and select an image.');
      return;
    }

    setLoading(true);

    const storage = getStorage(app);
    const storageRef = storageReff(storage, `food-images/${foodImage.name}`);

    try {
      await uploadBytes(storageRef, foodImage);
      const downloadURL = await getDownloadURL(storageRef);

      const db = getDatabase(app);
      const dataRef = ref(db, 'fooditems');
      await push(dataRef, {
        foodName,
        foodPrice,
        imageUrl: downloadURL,
        category,
        spicy,
        isNew,
        offer,
        todaySpecial,
        description,
        quantity,
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFoodName('');
      setFoodPrice('');
      setFoodImage(null);
      setCategory('');
      setSpicy(false);
      setIsNew(false);
      setOffer('');
      setTodaySpecial(false);
      setDescription('');
      setQuantity('');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadFoodItems = () => {
    const db = getDatabase(app);
    const foodRef = ref(db, 'fooditems');
    onValue(foodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedFoodItems = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFoodItems(fetchedFoodItems);
      }
    });
  };

  return (
    <div className="add-food-a-container">
      {loading && <div className="loading-screen">Loading...</div>}
      <div className="add-food-a">
        <h2>Add Food</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Food Price"
            value={foodPrice}
            onChange={(e) => setFoodPrice(e.target.value)}
            className="input-field"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-field"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <label className="spicy-checkbox">
            <input
              type="checkbox"
              checked={spicy}
              onChange={(e) => setSpicy(e.target.checked)}
            />
            Spicy
          </label>
          <label className="new-checkbox">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
            />
            New
          </label>
          <input
            type="text"
            placeholder="Offer %"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            className="input-field"
          />
          <label className="today-special-checkbox">
            <input
              type="checkbox"
              checked={todaySpecial}
              onChange={(e) => setTodaySpecial(e.target.checked)}
            />
            Today Special
          </label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            rows="4"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="submit-button">Add Food</button>
        </form>
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
          <p>Food added successfully!</p>
        </div>
      )}
      <button onClick={loadFoodItems} className="load-button">Load Food Items</button>
      <div className="food-items-grid">
        {foodItems.map((item) => (
          <div key={item.id} className="food-card">
            <img src={item.imageUrl} alt={item.foodName} className="food-card-image" />
            <div className="food-card-body">
              <h5>{item.foodName}</h5>
              <p>Price: {item.foodPrice}</p>
              {item.spicy && <FaPepperHot className="icon-spicy" />}
              {item.todaySpecial && <FaStar className="icon-special" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFood;
