import { getDatabase, onValue, ref, remove, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { app } from '../firebase';
import './FoodItems.css';
import OrderSummaryPopup from './OrderSummaryPopup';

const FoodItems = ({ selectedCategory, searchTerm }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const db = getDatabase(app);
      const foodItemsRef = ref(db, 'fooditems');
      const cartRef = ref(db, 'cart');

      onValue(foodItemsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fetchedFoodItems = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setFoodItems(fetchedFoodItems);
        }
        setLoading(false);
      });

      onValue(cartRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCart(data);
        } else {
          setCart({});
        }
      });
    };

    fetchData();
  }, [selectedCategory, searchTerm]);

  const addToCart = (item) => {
    const db = getDatabase(app);
    const cartRef = ref(db, `cart/${item.id}`);
    const updatedQuantity = (cart[item.id]?.quantity || 0) + 1;

    update(cartRef, { ...item, quantity: updatedQuantity });
  };

  const incrementQuantity = (item) => {
    const db = getDatabase(app);
    const cartRef = ref(db, `cart/${item.id}`);
    const updatedQuantity = (cart[item.id]?.quantity || 0) + 1;

    update(cartRef, { quantity: updatedQuantity });
  };

  const decrementQuantity = (item) => {
    const db = getDatabase(app);
    const cartRef = ref(db, `cart/${item.id}`);
    const updatedQuantity = (cart[item.id]?.quantity || 0) - 1;

    if (updatedQuantity <= 0) {
      update(cartRef, null); // Remove item from cart if quantity is 0 or less
    } else {
      update(cartRef, { quantity: updatedQuantity });
    }
  };

  const clearCart = () => {
    const db = getDatabase(app);
    const cartRef = ref(db, 'cart');
    remove(cartRef);
  };

  const filteredFoodItems = searchTerm
    ? foodItems.filter(item => item.foodName.toLowerCase().includes(searchTerm.toLowerCase()))
    : selectedCategory === 'All'
      ? foodItems
      : foodItems.filter(item => item.category === selectedCategory);

  const cartItems = Object.values(cart);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.foodPrice) * item.quantity, 0);

  return (
    <div className="food-items-container">
      <h2 className="food-list-heading">Food List</h2>
      <p className="food-list-description">Explore our delicious menu and find your favorite dishes.</p>
      <hr className="separator" />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="food-items">
          {filteredFoodItems.map((item, index) => (
            <div className="food-item" key={index}>
              <div className="badges">
                {item.spicy && <span className="badge badge-spicy">Spicy</span>}
                {item.todaySpecial && <span className="badge badge-special">Today's Special</span>}
                {item.offer && <span className="badge badge-offer">{item.offer}% OFF</span>}
              </div>
              <img src={item.imageUrl} alt={item.foodName} className="food-image" />
              <div className="food-details">
                <div className="top-details">
                  <span className="badge-free-delivery">Free Delivery</span>
                </div>
                <h3>{item.foodName}</h3>
                <p className="description">{item.description}</p>
                <div className="rating-time">
                  <span className="rating">{item.rating} ★</span>
                  <span className="time">{item.time} mins</span>
                </div>
                <p className="food-price">{Number(item.foodPrice).toFixed(2)}</p>
                {cart[item.id] ? (
                  <div className="quantity-buttons">
                    <button onClick={() => decrementQuantity(item)}>-</button>
                    <span>{cart[item.id].quantity}</span>
                    <button onClick={() => incrementQuantity(item)}>+</button>
                  </div>
                ) : (
                  <button className="add-food" onClick={() => addToCart(item)}>Add Food</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {totalQuantity > 0 && (
        <OrderSummaryPopup totalQuantity={totalQuantity} totalPrice={totalPrice} onClearCart={clearCart} />
      )}
    </div>
  );
};

export default FoodItems;
