import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Cart.css';

const Cart = () => {
  const cart = useSelector((state: any) => state.root.cart);
  const discount = useSelector((state: any) => state.root.discount);
  const taxRate = useSelector((state: any) => state.root.taxRate);
  const dispatch = useDispatch();
  const [discountCode, setDiscountCode] = useState('');
  const [error, setError] = useState('');

  const total = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const discountedTotal = total - (total * discount / 100);
  const totalWithTax = discountedTotal + (discountedTotal * taxRate);

  const increaseQuantity = (item: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const decreaseQuantity = (item: any) => {
    if (item.quantity > 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    }
  };

  const applyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (discount > 0) {
      setError('A discount has already been applied.');
      return;
    }
    switch (discountCode) {
      case 'REMOVE10':
        dispatch({ type: 'APPLY_DISCOUNT', payload: 10 });
        break;
      case 'REMOVE20':
        dispatch({ type: 'APPLY_DISCOUNT', payload: 20 });
        break;
      case 'REMOVE30':
        dispatch({ type: 'APPLY_DISCOUNT', payload: 30 });
        break;
      default:
        setError('Invalid discount code.');
        return;
    }
    setError('');
  };

  return (
    <div className="container cart">
      <h2>Cart</h2>
      <ul className="list-group">
        {cart.map((item: any) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name} - ${item.price} x {item.quantity}
            <div>
              <button onClick={() => increaseQuantity(item)} className="btn btn-success btn-sm">+</button>
              <button onClick={() => decreaseQuantity(item)} className="btn btn-danger btn-sm ml-2">-</button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="mt-4">Total: ${total.toFixed(2)}</h3>
      <h3 className="mt-4">Discounted Total: ${discountedTotal.toFixed(2)}</h3>
      <h3 className="mt-4">Total with Tax: ${totalWithTax.toFixed(2)}</h3>
      <form onSubmit={applyDiscount} className="mt-4">
        <div className="form-group">
          <label htmlFor="discountCode">Discount Code</label>
          <input
            type="text"
            id="discountCode"
            className="form-control"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Apply Discount</button>
      </form>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Cart;