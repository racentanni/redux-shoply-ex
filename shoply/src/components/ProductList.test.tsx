import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductList from './ProductList';

const mockStore = configureStore([]);

describe('ProductList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      root: {
        products: [
          { id: '1', name: 'Product 1', price: 100, description: 'Description 1', image_url: 'image1.jpg', numRemaining: 10 },
          { id: '2', name: 'Product 2', price: 200, description: 'Description 2', image_url: 'image2.jpg', numRemaining: 5 },
        ],
      },
    });
  });

  it('renders ProductList with products', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
  });

  it('shows no products available message when product list is empty', () => {
    store = mockStore({
      root: {
        products: [],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(getByText('No products available')).toBeInTheDocument();
  });
});