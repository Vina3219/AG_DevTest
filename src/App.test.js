import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import App from "./App";
import { loadPage } from "./slice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn((selector) => selector()),
}));

jest.mock("./slice", () => ({
  ...jest.requireActual("./slice"),
  selectTotalProductsCount: jest.fn(),
  loadPage: jest.fn(),
}));

jest.mock(
  "./components/productsCountPerPageSelect/ProductsCountPerPageSelect",
  () => jest.fn()
);

jest.mock("./components/pagination/Pagination", () => jest.fn());

jest.mock("./components/productsList/ProuctsList", () => jest.fn());

const dispatchSpy = jest.fn();

describe("App", () => {
  beforeEach(() => {
    useDispatch.mockReset().mockReturnValue(dispatchSpy);
    loadPage.mockReset().mockReturnValue("load page");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("loads page", () => {
    render(<App />);
    expect(dispatchSpy).toBeCalledTimes(1);
    expect(dispatchSpy).toBeCalledWith("load page");
  });
});
