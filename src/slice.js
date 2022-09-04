import { createSlice } from '@reduxjs/toolkit';
import { loadProducts, getTotal } from './services'

const initialState = {
    products: [],
    pageNum: 1,
    productsCountPerPage: 8,
    totalProductsCount: 0
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers:{
        setPageNum: (state, action) => {
            state.pageNum = action.payload.pageNum;
            state.products = loadProducts(state.pageNum, state.productsCountPerPage);
        },
        setProductsPerPage: (state, action) => {
            state.productsCountPerPage = action.payload.productsCountPerPage;
            state.pageNum = Math.ceil(state.products[0].id/action.payload.productsCountPerPage);
            state.products = loadProducts(state.pageNum, state.productsCountPerPage);
        },
        loadPage: (state) => {
            state.products = loadProducts(state.pageNum, state.productsCountPerPage);
            state.totalProductsCount = getTotal();
        }
    }
})

export const { setPageNum, setProductsPerPage: setProductsCountPerPage, loadPage } = slice.actions;

export const selectProducts = (state) => state.app.products;
export const selectPageNum = (state) => state.app.pageNum;
export const selectTotalPage = (state) => Math.ceil(state.app.totalProductsCount/state.app.productsCountPerPage);
export const selectProductsCountPerPage = (state) => state.app.productsCountPerPage;
export const selectTotalProductsCount = (state) => state.app.totalProductsCount;

export default slice.reducer;
