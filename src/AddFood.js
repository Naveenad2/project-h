import { getDatabase, ref, set } from "firebase/database";
import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import './App.css'; // Import custom CSS
import { app } from "./firebase";

const AddFood = () => {
  const [foodName, setFoodName] = useState("");
  const [type, setType] = useState("Non-Veg");
  const [description, setDescription] = useState("");
  const [isSpicy, setIsSpicy] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const db = getDatabase(app);
    const foodRef = ref(db, 'fooditems/' + Date.now());

    set(foodRef, {
      foodName,
      type,
      description,
      isSpicy,
      price,
      quantity,
      imageUrl: "https://via.placeholder.com/150"
    }).then(() => {
      setLoading(false);
      alert("Food item added successfully!");
      setFoodName("");
      setType("Non-Veg");
      setDescription("");
      setIsSpicy(false);
      setPrice("");
      setQuantity("");
    }).catch((error) => {
      setLoading(false);
      console.error("Error adding food item: ", error);
    });
  };

  return (
    <Container className="add-food-container">
      <h2 className="text-center">Add Food Item</h2>
      <Form onSubmit={handleSubmit} className="add-food-form">
        <Form.Group controlId="foodName">
          <Form.Label>Food Name</Form.Label>
          <Form.Control
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food name"
            required
          />
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Non-Veg</option>
            <option>Veg</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </Form.Group>

        <Form.Group controlId="isSpicy">
          <Form.Check
            type="checkbox"
            label="Spicy"
            checked={isSpicy}
            onChange={(e) => setIsSpicy(e.target.checked)}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Add Food"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddFood;
