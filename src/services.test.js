import { loadProducts, getTotal } from "./services";

jest.mock("./data/productsData.json", () => [{ id: 1 }, { id: 2 }]);

describe("loadProducts", () => {
  it("loads products", () => {
    expect(loadProducts(1, 1)).toEqual([{ id: 1 }]);
  });

  describe("tries to load products exceeded the list", () => {
    it("loads an empty array", () => {
      expect(loadProducts(2, 8)).toEqual([]);
    });
  });

  describe("if loaded products less than 1 page", () => {
    it("loads products", () => {
      expect(loadProducts(1, 2)).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });
});

describe("getTotal", () => {
  it("gets total products count", () => {
    expect(getTotal()).toEqual(2);
  });
});
