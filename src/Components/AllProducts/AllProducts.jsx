import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./AllProducts.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/Actions";
import useApi from "../API/Api";

const AllProducts = () => {
  const [alldata, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterVisibe, setFilterVisible] = useState(false);

  const [filters, setFilters] = useState({
    color: [],
    gender: [],
    price: [],
    type: [],
  });

  // Fetched Api data stored 
  const apiData = useApi();
  useEffect(() => {
    setAllData(apiData);
    setFilterData(apiData);
  }, [apiData]);

  const dispatch = useDispatch();
 

  // seach the data based on the user input
  useEffect(() => {
    let timer = setTimeout(() => {
      if (inputValue.trim() === "") {
        setFilterData(alldata);
      } else {
        let searchProduct = inputValue.toLowerCase();
        let results = alldata.filter((product) => {
          return (
            (product.name &&
              product.name.toLowerCase().includes(searchProduct)) ||
            (product.type &&
              product.type.toLowerCase().includes(searchProduct)) ||
            (product.color &&
              product.color.toLowerCase().includes(searchProduct)) ||
            (product.gender &&
              product.gender.toLowerCase().includes(searchProduct))
          );
        });

        setFilterData(results);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, alldata]);

   // handle the user data and store continuously when user is typing
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // handle the user giving filter and store in filters
  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (checked) {
        updatedFilters[category] = [...prevFilters[category], value];
      } else {
        updatedFilters[category] = prevFilters[category].filter(
          (item) => item !== value
        );
      }

      return updatedFilters;
    });
  };

  // when usee click apply filters then the filters ths data based on given filters
  const applyFilters = () => {
    let filteredProducts = alldata.filter((product) => {
      return (
        (filters.color.length === 0 || filters.color.includes(product.color)) &&
        (filters.gender.length === 0 ||
          filters.gender.includes(product.gender)) &&
        (filters.type.length === 0 || filters.type.includes(product.type)) &&
        (filters.price.length === 0 ||
          filters.price.some((priceRange) => {
            let price = product.price;
            if (priceRange === "0-450") return price > 0 && price <= 450;
            if (priceRange === "450-above") return price > 450;
            return false;
          }))
      );
    });

    setFilterData(filteredProducts);
    setFilterVisible(false);
  };

  // when user click reset Filter all the fillter will reset
  const resetFilters = () => {
    setFilters({ color: [], gender: [], price: [], type: [] });
    setFilterData(alldata);
    setFilterVisible(false);
  };

  // when user click add to cart that item will take and send the action to reducer based on action the store will update
  const handleAddtoCart = (product) => {
    if (product.quantity > 0) {
      dispatch(addToCart(product));
      alert("Item Added To Cart");
      product.quantity -= 1;
    } else {
      alert("Out Of Stock");
    }
  };
  return (
    <>
      <div className="AllProducts-MainContainer">
        <div className="BoxContainer">
          <input
            type="search"
            value={inputValue}
            onChange={handleInput}
            placeholder="Search products..."
            className="SearchBox"
          />

          <div className={`Filters-Container ${filterVisibe ? "active" : ""}`}>
            {filterVisibe ? (
              <div className="Filter-Container">
                <div className="Filter-Color">
                 <b>Color</b>  
                  <p>
                    <input
                      type="checkbox"
                      value="Red"
                      checked={filters.color.includes("Red")}
                      onChange={(e) => handleCheckboxChange(e, "color")}
                    />
                    <label>Red</label>
                  </p>
 
                  <p>
                    <input
                      type="checkbox"
                      value="Green"
                      checked={filters.color.includes("Green")}
                      onChange={(e) => handleCheckboxChange(e, "color")}
                    />
                    <label>Green</label>
                  </p>
                </div>

                <div className="Filter-Gender">
                <b>Gender</b>  
                  <p>
                    <input
                      type="checkbox"
                      value="Men"
                      checked={filters.gender.includes("Men")}
                      onChange={(e) => handleCheckboxChange(e, "gender")}
                    />
                    <label>Men</label>
                  </p>
                  <p>
                    <input
                      type="checkbox"
                      value="Women"
                      checked={filters.gender.includes("Women")}
                      onChange={(e) => handleCheckboxChange(e, "gender")}
                    />
                    <label>Women</label>
                  </p>
                </div>

                <div className="Filter-Price">
                <b>Price</b>  
 
                  <p>
                    <input
                      type="checkbox"
                      value="0-450"
                      checked={filters.price.includes("0-450")}
                      onChange={(e) => handleCheckboxChange(e, "price")}
                    />
                    <label>₹0-₹450</label>
                  </p>
                  <p>
                    <input
                      type="checkbox"
                      value="450-above"
                      checked={filters.price.includes("450-above")}
                      onChange={(e) => handleCheckboxChange(e, "price")}
                    />
                    <label>₹450 & Above</label>
                  </p>
                </div>

                <div className="Filter-Type">
                <b>Type</b>  
                  <p>
                    <input
                      type="checkbox"
                      value="Polo"
                      checked={filters.type.includes("Polo")}
                      onChange={(e) => handleCheckboxChange(e, "type")}
                    />
                    <label>Polo</label>
                  </p>
                  <p>
                    <input
                      type="checkbox"
                      value="Hoodie"
                      checked={filters.type.includes("Hoodie")}
                      onChange={(e) => handleCheckboxChange(e, "type")}
                    />
                    <label>Hoodie</label>
                  </p>
  
                </div>

                <button onClick={applyFilters}>Apply Filters</button>
                <button onClick={resetFilters}>Reset Filters</button>
              </div>
            ) : (
              <button onClick={() => setFilterVisible(true)}>
                Show Filters
              </button>
            )}
          </div>
        </div>
        <div className="AllProducts-container">
          {filterData.length > 0 ? (
            filterData.map((product, index) => (
              <Card
                handleAddtoCart={() => handleAddtoCart(product)}
                key={product.id || index}
                image={product.imageURL}
                name={product.name}
                type={product.type}
                price={product.price}
                color={product.color}
                gender={product.gender}
              />
            ))
          ) : (
            <p>No products match the selected filters.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;

 