import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductDetails from './ProductDetails';

const mockStore = configureStore([]);

describe('ProductDetails', () => {
  let store: any;
  let product: any;

  beforeEach(() => {
    product = { id: '1', name: 'Product 1', price: 100, description: 'Description 1', image_url: 'image1.jpg', numRemaining: 10 };
    store = mockStore({
      root: {
        products: [product],
        cart: [],
      },
    });
  });

  it('renders ProductDetails with product details', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
  });

  it('adds product to cart when Add to Cart button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    );

    fireEvent.click(getByText('Add to Cart'));
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'ADD_TO_CART', payload: product }]);
  });
});