import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from './Cart';

const mockStore = configureStore([]);

describe('Cart', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      root: {
        cart: [
          { id: '1', name: 'Product 1', price: 100, quantity: 2 },
          { id: '2', name: 'Product 2', price: 200, quantity: 1 },
        ],
        discount: 0,
        taxRate: 0.0725,
      },
    });
  });

  it('renders Cart with items', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(getByText('Product 1 - $100 x 2')).toBeInTheDocument();
    expect(getByText('Product 2 - $200 x 1')).toBeInTheDocument();
  });

  it('applies discount when valid discount code is submitted', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    fireEvent.change(getByLabelText('Discount Code'), { target: { value: 'REMOVE10' } });
    fireEvent.click(getByText('Apply Discount'));

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'APPLY_DISCOUNT', payload: 10 }]);
  });
});