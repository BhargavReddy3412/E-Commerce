import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div><h1>Shopping</h1></div>
      <div>
        <Link to="/products" className="AllProducts-Link">
          All Products
        </Link>
        <Link to="/cart" className="Cart-Link">
          <FaShoppingCart />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
