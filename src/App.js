import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddCategory from './Components/Admin/AddCategory';
import AddFood from './Components/Admin/AddFood';
import AddTrending from './Components/Admin/AddTrending';
import AdminNav from './Components/Admin/AdminNav';
import AdminPage from './Components/Admin/AdminPage';
import Analytics from './Components/Admin/Analytics';
import BottomNav from './Components/BottomNav';
import Categories from './Components/Categories';
import CheckoutPage from './Components/CheckoutPage';
import FoodItems from './Components/FoodItems';
import Header from './Components/Header';
import OrderConfirmation from './Components/OrderConfirmation';
import OrderStatus from './Components/OrderStatus';
import SearchBar from './Components/SearchBar';
import BilledPage from './Components/BilledPage';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search term when a category is selected
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedCategory(''); // Clear selected category when searching
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <SearchBar onSearch={handleSearch} />
              {!searchTerm && <Categories onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />}
              <FoodItems selectedCategory={selectedCategory} searchTerm={searchTerm} />
              <div style={{"height":"200px"}}></div>
              <BottomNav />
            </>
          } />
          <Route path="/admin" element={
            <>
              <AdminPage />
              <AdminNav />
            </>
          } />
          <Route path="/admin/add-category" element={
            <>
              <AddCategory />
              <AdminNav />
            </>
          } />
          <Route path="/admin/add-food" element={
            <>
              <AddFood />
              <AdminNav />
            </>
          } />
          <Route path="/admin/add-trending" element={
            <>
              <AddTrending />
              <AdminNav />
            </>
          } />
          <Route path="/admin/analytics" element={
            <>
              <Analytics />
              <AdminNav />
            </>
          } />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/billed" element={<BilledPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
