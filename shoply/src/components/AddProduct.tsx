import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [numRemaining, setNumRemaining] = useState('');

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: uuidv4(),
      name,
      price: parseFloat(price),
      description,
      image_url: imageUrl,
      numRemaining: parseInt(numRemaining, 10)
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setNumRemaining('');
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={addProduct}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numRemaining">Number Remaining</label>
          <input
            type="number"
            id="numRemaining"
            className="form-control"
            value={numRemaining}
            onChange={(e) => setNumRemaining(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;