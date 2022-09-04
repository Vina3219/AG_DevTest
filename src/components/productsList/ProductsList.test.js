import { useSelector } from "react-redux";
import { render } from "@testing-library/react";
import ProductsList from "./ProductsList";
import { selectProducts, selectProductsCountPerPage } from "../../slice";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../../slice", () => ({
  ...jest.requireActual("../../slice"),
  selectProducts: jest.fn(),
  selectProductsCountPerPage: jest.fn(),
}));

jest.mock("../product/Product", () => jest.fn());

describe("ProductsList", () => {
  beforeEach(() => {
    useSelector.mockReset().mockImplementation((selector) => selector());
    selectProducts.mockReset().mockReturnValue([{ id: 1 }]);
    selectProductsCountPerPage.mockReset().mockReturnValue(8);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<ProductsList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
