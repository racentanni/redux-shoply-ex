import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: any) => state.root.products.find((p: any) => p.id === id));
  const numRemaining = useSelector((state: any) => state.root.products.find((p: any) => p.id === id).numRemaining);
  const dispatch = useDispatch();

  const addToCart = () => {
    if (numRemaining > 0) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  if (!product) {
    return <div className="alert alert-danger">Product not found</div>;
  }

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <img src={product.image_url} alt={product.name} className="img-fluid" />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Remaining: {numRemaining}</p>
      <button onClick={addToCart} className="btn btn-success" disabled={numRemaining === 0}>Add to Cart</button>
      <button onClick={removeFromCart} className="btn btn-danger ml-2">Remove from Cart</button>
    </div>
  );
};

export default ProductDetails;