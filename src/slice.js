import { createSlice } from "@reduxjs/toolkit";
import { loadProducts, getTotal } from "./services";

const initialState = {
  products: [],
  pageNum: 1,
  productsCountPerPage: 8,
  totalProductsCount: 0,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPageNum: (state, action) => {
      state.pageNum = action.payload.pageNum;
      state.products = loadProducts(state.pageNum, state.productsCountPerPage);
    },
    setProductsCountPerPage: (state, action) => {
      state.productsCountPerPage = action.payload.productsCountPerPage;
      if (state.products?.length > 0) {
        // recalculate the current page number based on the index of the first product in the page,
        // to make sure the first product will be in the reloaded page.
        // e.g. currently 8 products are set in one page,the product id = 9 is on page 2
        // and user switches to 4 products per page.
        // this product should stay in the reloaded page,
        // hence the new page number should be 3.
        state.pageNum = Math.ceil(
          state.products[0].id / action.payload.productsCountPerPage
        );
      }
      state.products = loadProducts(state.pageNum, state.productsCountPerPage);
    },
    loadPage: (state) => {
      state.products = loadProducts(state.pageNum, state.productsCountPerPage);
      state.totalProductsCount = getTotal();
    },
  },
});

export const { setPageNum, setProductsCountPerPage, loadPage } = slice.actions;

export const selectProducts = (state) => state.app.products;
export const selectPageNum = (state) => state.app.pageNum;
export const selectTotalPage = (state) =>
  Math.ceil(state.app.totalProductsCount / state.app.productsCountPerPage);
export const selectProductsCountPerPage = (state) =>
  state.app.productsCountPerPage;
export const selectTotalProductsCount = (state) => state.app.totalProductsCount;

export default slice.reducer;
