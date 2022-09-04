import reducer, {
  setPageNum,
  setProductsCountPerPage,
  loadPage,
  selectProducts,
  selectPageNum,
  selectTotalPage,
  selectProductsCountPerPage,
  selectTotalProductsCount,
} from "./slice";
import { loadProducts, getTotal } from "./services";

jest.mock("./services", () => ({
  loadProducts: jest.fn(),
  getTotal: jest.fn(),
}));

const initialState = {
  products: [],
  pageNum: 1,
  productsCountPerPage: 8,
  totalProductsCount: 0,
};

const mockedProducts = [{ id: 9 }];

let newState = null;

describe("reducer", () => {
  it("returns initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
});

describe("actions", () => {
  beforeEach(() => {
    loadProducts.mockReset().mockReturnValue([]);
  });

  describe("setPageNum", () => {
    beforeEach(() => {
      newState = reducer(
        initialState,
        setPageNum({
          pageNum: 2,
        })
      );
    });

    it("sets page number", () => {
      expect(newState).toEqual({
        products: [],
        pageNum: 2,
        productsCountPerPage: 8,
        totalProductsCount: 0,
      });
    });

    it("calls loadProducts", () => {
      expect(loadProducts).toBeCalledTimes(1);
      expect(loadProducts).toBeCalledWith(2, 8);
    });
  });

  describe("setProductsCountPerPage", () => {
    beforeEach(() => {
      newState = reducer(
        initialState,
        setProductsCountPerPage({
          productsCountPerPage: 6,
        })
      );
    });

    it("sets products count per page", () => {
      expect(newState).toEqual({
        products: [],
        pageNum: 1,
        productsCountPerPage: 6,
        totalProductsCount: 0,
      });
    });

    it("calls loadProducts", () => {
      expect(loadProducts).toBeCalledTimes(1);
      expect(loadProducts).toBeCalledWith(1, 6);
    });

    describe("if products length greater than 0", () => {
      beforeEach(() => {
        loadProducts.mockReset().mockReturnValue(mockedProducts);
        newState = reducer(
          {
            products: mockedProducts,
            pageNum: 2,
            productsCountPerPage: 8,
            totalProductsCount: 9,
          },
          setProductsCountPerPage({
            productsCountPerPage: 4,
          })
        );
      });
      it("recalculates page number", () => {
        expect(newState).toEqual({
          products: mockedProducts,
          pageNum: 3,
          productsCountPerPage: 4,
          totalProductsCount: 9,
        });
      });
    });
  });

  describe("loadPage", () => {
    beforeEach(() => {
      getTotal.mockReset().mockReturnValue(1);
      loadProducts.mockReset().mockReturnValue([
        {
          id: 1,
        },
      ]);
      newState = reducer(initialState, loadPage());
    });

    it("loads products for the curent page", () => {
      expect(newState).toEqual({
        products: [{ id: 1 }],
        pageNum: 1,
        productsCountPerPage: 8,
        totalProductsCount: 1,
      });
    });

    it("calls loadProducts", () => {
      expect(loadProducts).toBeCalledTimes(1);
      expect(loadProducts).toBeCalledWith(1, 8);
    });

    it("calls getTotal", () => {
      expect(getTotal).toBeCalledTimes(1);
    });
  });
});

describe("selectors", () => {
  describe("selectProducts", () => {
    it("selects products", () => {
      expect(
        selectProducts({
          app: initialState,
        })
      ).toEqual([]);
    });
  });

  describe("selectPageNum", () => {
    it("selects page number", () => {
      expect(
        selectPageNum({
          app: initialState,
        })
      ).toEqual(1);
    });
  });

  describe("selectTotalPage", () => {
    it("selects total page", () => {
      expect(
        selectTotalPage({
          app: initialState,
        })
      ).toEqual(0);
    });
  });

  describe("selectProductsCountPerPage", () => {
    it("selects products count per page", () => {
      expect(
        selectProductsCountPerPage({
          app: initialState,
        })
      ).toEqual(8);
    });
  });

  describe("selectTotalProductsCount", () => {
    it("selects total products count", () => {
      expect(
        selectTotalProductsCount({
          app: initialState,
        })
      ).toEqual(0);
    });
  });
});
