import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ product }: { product: any }) => {
  const dispatch = useDispatch();
  const numRemaining = useSelector((state: any) => state.root.products.find((p: any) => p.id === product.id).numRemaining);

  const addToCart = () => {
    if (numRemaining > 0) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  return (
    <div>
      <p className="card-text">{product.price}</p>
      <p className="card-text">Remaining: {numRemaining}</p>
      <button onClick={addToCart} className="btn btn-success" disabled={numRemaining === 0}>Add to Cart</button>
      <button onClick={removeFromCart} className="btn btn-danger ml-2">Remove from Cart</button>
    </div>
  );
};

export default Product;