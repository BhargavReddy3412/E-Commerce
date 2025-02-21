 export const addToCart = (item) => ({
    type: "ADD_TO_CART",
    payload: item,
  });
  
  export const removeFromCart = (item) => ({
    type: "REMOVE_FROM_CART",
    payload: item,
  });
  
  export const decrementQuantity = (item) => ({
    type: "DECREMENT_QUANTITY",
    payload: item,
  });
  
    
  export const  CheckOut= () => ({
    type: "CHECKOUT_CART",
  });
  