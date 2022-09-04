import { useSelector, useDispatch } from "react-redux";
import {
  selectProductsCountPerPage,
  setProductsCountPerPage,
} from "../../slice";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductsCountPerPageSelect from "./ProductsCountPerPageSelect";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../slice", () => ({
  ...jest.requireActual("../../slice"),
  selectProductsCountPerPage: jest.fn(),
  setProductsCountPerPage: jest.fn(),
}));

const mockedEvent = {
  target: {
    value: "4",
  },
  preventDefault: jest.fn(),
};

const dispatchSpy = jest.fn();

describe("ProductsCountPerPageSelect", () => {
  beforeEach(() => {
    useSelector.mockReset().mockImplementation((selector) => selector());
    selectProductsCountPerPage.mockReset().mockReturnValue(8);
    useDispatch.mockReset().mockReturnValue(dispatchSpy);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<ProductsCountPerPageSelect />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays the selected products count per page", () => {
    render(<ProductsCountPerPageSelect />);
    expect(screen.getByText("8 per page")).toBeInTheDocument();
  });

  describe("when selected option is changed", () => {
    it("displays the new value", () => {
      render(<ProductsCountPerPageSelect />);
      const select = screen.getByTestId("products-count-per-page-select");
      fireEvent.change(select, mockedEvent);
      expect(screen.getByText("4 per page")).toBeInTheDocument();
    });

    it("dispatches setProductsCountPerPage", () => {
      render(<ProductsCountPerPageSelect />);
      const select = screen.getByTestId("products-count-per-page-select");
      fireEvent.change(select, mockedEvent);
      expect(dispatchSpy).toBeCalledTimes(1);
      expect(setProductsCountPerPage).toBeCalledTimes(1);
      expect(setProductsCountPerPage).toBeCalledWith({
        productsCountPerPage: 4,
      });
    });
  });
});
