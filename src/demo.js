import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Badge, Button, Card, Carousel, Col, Container, Modal, Nav, Navbar, Row } from 'react-bootstrap';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const foodItems = [
    { id: 1, name: 'Pizza', price: '$10', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaWNpb3VzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 2, name: 'Burger', price: '$5', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVsaWNpb3VzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 3, name: 'Salad', price: '$7', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVsaWNpb3VzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D' },
    // Add more food items as needed
  ];

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="#">Restaurant Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#" onClick={handleShowModal}>Add Food</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Carousel fade>
        <Carousel.Item style={{ height: '200px' }}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Trending Food 1"
          />
          <Carousel.Caption>
            <h3>Trending Food 1</h3>
            <p>Description of trending food 1.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: '200px' }}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Trending Food 2"
          />
          <Carousel.Caption>
            <h3>Trending Food 2</h3>
            <p>Description of trending food 2.</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Add more carousel items for new arrivals */}
      </Carousel>

      <Row className="mt-4 mb-4">
  <Col md={3}>
    <Card onClick={() => alert('Veg items selected')}>
      <Card.Body>
        <Card.Title>Veg</Card.Title>
      </Card.Body>
    </Card>
  </Col>
  <Col md={3}>
    <Card onClick={() => alert('Non-Veg items selected')}>
      <Card.Body>
        <Card.Title>Non-Veg</Card.Title>
      </Card.Body>
    </Card>
  </Col>
</Row>

     

      <Container className="mt-5 mb-5">
        <Row xs={1} md={2} lg={3} className="g-4">
          {foodItems.map((food) => (
            <Col key={food.id}>
              <Card>
                <Card.Img variant="top" src={food.image} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>
                    {food.name} 
                    {food.trending && <Badge bg="warning" className="ms-2">Trending</Badge>}
                  </Card.Title>
                  <Card.Text>Price: {food.price}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

 

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form elements for adding food items */}
          <p>Form elements here...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
