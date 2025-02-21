import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, decrementQuantity, CheckOut } from "../Store/Actions";
import "./Cart.css";

const Cart = () => {
  const Data = useSelector((state) => state);
  let cartItems = Data.cart;
  let orderHistory = Data.orderHistory;
  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecrement = (item) => {
    if (item.quantityInCart > 1) {
      dispatch(decrementQuantity(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };

  const handleCheckout = () => {
    dispatch(CheckOut());
  };

  const handleIncrement = (item) => {
    if (item.quantityInCart >= item.quantity) {
      alert(`The product has only ${item.quantity} in stock.`);
    } else {
      dispatch(addToCart(item));
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantityInCart, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imageURL} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <span className="cart-item-color">{item.color}</span>
              <p className="cart-price">₹{item.price}</p>
              <div className="quantity-control">
                <button className="quantity-btn" onClick={() => handleDecrement(item)}>-</button>
                <span className="quantity-count">{item.quantityInCart}</span>
                <button className="quantity-btn" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button className="cart-remove-btn" onClick={() => handleRemoveItem(item)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-cart-message">Cart is empty</p>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="cart-summary">
            <h1>Total Price: ₹{totalPrice}</h1>
          </div>
          <div>
            <button className="Checkout-button" onClick={handleCheckout}>CheckOut</button>
          </div>
        </>
      )}

      {orderHistory.length > 0 && (
        <div className="order-history">
          <h2>Order History</h2>
          <table className="order-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Color</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.imageURL} alt={item.name} className="order-item-image" /></td>
                  <td className="order-item-name">{item.name}</td>
                  <td className="order-item-color">{item.color}</td>
                  <td className="order-item-price">₹{item.price}</td>
                  <td className="order-item-quantity">{item.quantityInCart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
