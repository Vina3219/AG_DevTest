import React from "react";
import "./Product.css";

const Product = ({ product }) => {
  return (
    <div className="product__container">
      <div className="product-image__container">
        <img
          className="product__image"
          src={product.product_image}
          alt={product.product_name}
        ></img>
      </div>

      <div className="product__detail">
        <h3>{product.product_name}</h3>
        <span className="product__description">{product.description}</span>
        <span className="product__price">{product.price}</span>
      </div>
    </div>
  );
};

export default Product;
