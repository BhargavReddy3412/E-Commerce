 import { createStore } from "redux";

const initialState = {
  cart: [],
  orderHistory:[]
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":         //This helps that when user clcik two times the add to cart that will increase the quantity in store
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantityInCart: item.quantityInCart + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantityInCart: 1 }],
        };
      }

    case "REMOVE_FROM_CART":                  // user click remove item then that will remove from cart
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case "DECREMENT_QUANTITY":                     // when quantity decreases to zero then the amount will remove from cart
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantityInCart: item.quantityInCart - 1 }
              : item
          )
          .filter((item) => item.quantityInCart > 0),  
      };
      case "CHECKOUT_CART":                              // when user click checkout then that will store in orderhistory and the cart be zero
        return {
          ...state,
          orderHistory: [...state.orderHistory, ...state.cart],
          cart: [],  
        };
  

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;


 