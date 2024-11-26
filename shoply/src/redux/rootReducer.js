import { combineReducers } from 'redux';
import data from '../data.json';

const TAX_RATE = 0.0725;

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};

const initialState = {
  products: Object.keys(data.products).map(key => ({
    id: key,
    ...data.products[key],
    numRemaining: 10 // Set initial numRemaining value
  })),
  cart: loadCartFromLocalStorage(),
  discount: 0,
  taxRate: TAX_RATE
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      saveCartToLocalStorage(updatedCart);
      return {
        ...state,
        cart: updatedCart,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? { ...product, numRemaining: product.numRemaining - 1 }
            : product
        )
      };
    case 'REMOVE_FROM_CART':
      const itemToRemove = state.cart.find(item => item.id === action.payload.id);
      if (itemToRemove.quantity > 1) {
        updatedCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedCart = state.cart.filter(item => item.id !== action.payload.id);
      }
      saveCartToLocalStorage(updatedCart);
      return {
        ...state,
        cart: updatedCart,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? { ...product, numRemaining: product.numRemaining + 1 }
            : product
        )
      };
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  root: rootReducer
});