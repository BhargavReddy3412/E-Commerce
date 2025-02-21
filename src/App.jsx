import AllProducts from "./Components/AllProducts/AllProducts";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Components/Store/Store";
import Cart from "./Components/AddCart/Cart";
import Navbar from "./Components/NAVBAR/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />

          <Routes>
          <Route path="/" element={<AllProducts />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
