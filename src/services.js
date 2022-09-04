import products from './data/productsData.json'

export const loadProducts = (pageNum, productsCountPerPage) => {
    const length = products.length;
    const start = (pageNum - 1) * productsCountPerPage;
    const end = pageNum * productsCountPerPage;
    if(length <= start){
        return [];
    }
    return products.slice(start, end >= length ? length : end);
}

export const getTotal = () => products.length;