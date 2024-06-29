import "bootstrap/dist/css/bootstrap.min.css";
import { getDatabase, onValue, ref } from "firebase/database";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import React, { useEffect, useState } from "react";
import {
    Card,
    Col,
    Container,
    Form,
    Nav,
    Navbar,
    Row
} from "react-bootstrap";
import './App.css'; // Import custom CSS
import PushData from "./PushData";
import { app } from "./firebase";

const App = () => {
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
    <>
      <BrowserRouter>
        <Navbar bg="light" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="#">Restaurant Name</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#">Home</Nav.Link>
                <Link to="/add-food" className="nav-link">Add Food</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/add-food" element={<PushData />} />
        </Routes>
      </BrowserRouter>

      <Container className="text-center my-4">
        <h1>Grab your <span className="fw-bold">Delicious food</span></h1>
        <Form className="my-4">
          <Form.Control
            type="text"
            placeholder="Search food"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </Form>

        <div className="categories">
          {filteredFood.map((item) => (
            <Card key={item.id} className="category-card mb-4">
              <Row noGutters>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    className="category-image"
                  />
                </Col>
                <Col md={8} className="d-flex align-items-center">
                  <Card.Body>
                    <Card.Title className="category-title">{item.name}</Card.Title>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default App;
