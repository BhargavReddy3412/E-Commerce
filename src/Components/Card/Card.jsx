import "./Card.css";

const Card = ({ name, image, type, price, color, gender,handleAddtoCart,disable}) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={image} alt={name}  className="product-image"/>
      </div>
      <div className="details-container">
        <h3 className="product-name">{name}</h3>
        <p className="product-type">{type}</p>
        <div className="extra-details">
          <span className="product-color">{color}</span>
          <span className="product-gender">{gender}</span>
        </div>
        <p className="product-price">₹{price}</p>
        <button className="add-to-cart-btn" onClick={handleAddtoCart} disabled={disable}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;

 
 