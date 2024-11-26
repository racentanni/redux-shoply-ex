import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import NavBar from './NavBar';

const mockStore = configureStore([]);

describe('NavBar', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      root: {
        cart: [],
      },
    });
  });

  it('renders NavBar with links', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );

    expect(getByText('Shoply')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Cart (0 items - $0.00)')).toBeInTheDocument();
  });
});