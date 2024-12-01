import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import SecretDiscountsPage from './components/SecretDiscountsPage';
import AddProduct from './components/AddProduct';

const App = () => (
  <Provider store={store}>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/secret_discounts_page" element={<SecretDiscountsPage />} />
        <Route path="/products/new" element={<AddProduct />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
