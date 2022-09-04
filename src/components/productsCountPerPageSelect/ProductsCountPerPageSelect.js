import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProductsCountPerPage,
  setProductsCountPerPage,
} from "../../slice";
import { options } from "./constants";
import "./ProductsCountPerPageSelect.css";

const ProductsCountPerPageSelect = () => {
  const productsCountPerPage = useSelector(selectProductsCountPerPage);
  const dispatch = useDispatch();
  const handleSelectChange = useCallback(
    (event) => {
      const newProductsCountPerPage = Number(event.target.value);
      event.preventDefault();
      dispatch(
        setProductsCountPerPage({
          productsCountPerPage: newProductsCountPerPage,
        })
      );
    },
    [dispatch]
  );

  return (
    <select
      className="productsCountPerPageSelect"
      value={productsCountPerPage}
      onChange={handleSelectChange}
      data-testid="products-count-per-page-select"
    >
      {options.map((item) => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default ProductsCountPerPageSelect;
