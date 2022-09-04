import React from "react";
import { useSelector } from "react-redux";
import { selectProducts, selectProductsCountPerPage } from "../../slice";
import Product from "../product/Product";
import "./ProductsList.css";

const ProductsList = () => {
  const products = useSelector(selectProducts);
  const productsCountPerPage = useSelector(selectProductsCountPerPage);

  return (
    <ol
      className={`productsList__container productsList__container--${
        productsCountPerPage / 2
      }columns`}
    >
      {products.map((product) => (
        <li key={product.id}>
          <Product product={product} />
        </li>
      ))}
    </ol>
  );
};

export default ProductsList;
