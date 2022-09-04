import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { selectTotalProductsCount, loadPage } from "./slice";
import ProductsCountPerPageSelect from "./components/productsCountPerPageSelect/ProductsCountPerPageSelect";
import Pagination from "./components/pagination/Pagination";
import React, { useEffect } from "react";
import ProductsList from "./components/productsList/ProductsList";

const App = () => {
  const dispatch = useDispatch();
  const totalProductCount = useSelector(selectTotalProductsCount);

  useEffect(() => {
    dispatch(loadPage());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__title">
          <h2>All Products</h2>
          <span>{totalProductCount} Products</span>
        </div>

        <div className="app-header__select">
          <ProductsCountPerPageSelect />
        </div>
      </header>

      <hr />

      <ProductsList />

      <footer className="app-footer">
        <Pagination />
      </footer>
    </div>
  );
};

export default App;
