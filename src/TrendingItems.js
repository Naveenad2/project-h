import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import './App.css'; // Import custom CSS
import { app } from "./firebase";

const TrendingItems = () => {
  const [food, setFood] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const db = getDatabase(app);
        const foodRef = ref(db, 'fooditems');
        onValue(foodRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const fetchedFoodItems = Object.keys(data).map((key) => ({
              id: key,
              name: data[key].foodName,
              price: data[key].price,
              image: data[key].imageUrl,
              sales: data[key].sales,
              percent: data[key].percent,
            }));
            setFood(fetchedFoodItems);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const filteredFood = food.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <header className="App-header">
        <h2>Trending Items</h2>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <Form className="my-4">
          <Form.Control
            type="text"
            placeholder="Search food"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </Form>
        <div className="trending-items">
          {filteredFood.map(item => (
            <div className="item" key={item.id}>
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h2 className="item-name">{item.name}</h2>
                <p className="item-info">
                  {item.price} <span className="item-type">{item.type}</span>
                </p>
              </div>
              <div className="item-sales">
                <span className="sales-number">{item.sales}</span>
                <span className="sales-text">Sales ({item.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </header>
    </Container>
  );
};

export default TrendingItems;
