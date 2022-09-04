import { useSelector, useDispatch } from "react-redux";
import { selectPageNum, setPageNum, selectTotalPage } from "../../slice";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../slice", () => ({
  ...jest.requireActual("../../slice"),
  selectPageNum: jest.fn(),
  selectTotalPage: jest.fn(),
  setPageNum: jest.fn(),
}));

const dispatchSpy = jest.fn();

describe("Pagination", () => {
  beforeEach(() => {
    useSelector.mockReset().mockImplementation((selector) => selector());
    selectPageNum.mockReset().mockReturnValue(1);
    useDispatch.mockReset().mockReturnValue(dispatchSpy);
    selectTotalPage.mockReset().mockReturnValue(1);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Pagination />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays page number 1", () => {
    render(<Pagination />);
    const pageOneButton = screen.getByRole("button", { name: "1" });
    const previousButton = screen.getByRole("button", {
      name: /Previous page/,
    });
    const nextButton = screen.getByRole("button", {
      name: /Next page/,
    });
    expect(pageOneButton).toBeInTheDocument();
    expect(pageOneButton).toBeDisabled();
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  describe("if there are only two pages", () => {
    beforeEach(() => {
      selectPageNum.mockReset().mockReturnValue(1);
      selectTotalPage.mockReset().mockReturnValue(2);
    });

    it("matches snapshot", () => {
      const { asFragment } = render(<Pagination />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("displays page number 1 and 2", () => {
      render(<Pagination />);
      const pageOneButton = screen.getByRole("button", { name: "1" });
      const pageTwoButton = screen.getByRole("button", { name: "2" });
      const previousButton = screen.getByRole("button", {
        name: /Previous page/,
      });
      const nextButton = screen.getByRole("button", {
        name: /Next page/,
      });
      expect(pageOneButton).toBeInTheDocument();
      expect(pageOneButton).toBeDisabled();
      expect(pageTwoButton).toBeInTheDocument();
      expect(pageTwoButton).toBeEnabled();
      expect(previousButton).toBeInTheDocument();
      expect(previousButton).toBeDisabled();
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeEnabled();
    });

    describe("when the current page number is 2", () => {
      beforeEach(() => {
        selectPageNum.mockReset().mockReturnValue(2);
      });

      it("matches snapshot", () => {
        const { asFragment } = render(<Pagination />);
        expect(asFragment()).toMatchSnapshot();
      });

      it("displays page number 1 and 2", () => {
        render(<Pagination />);
        const pageOneButton = screen.getByRole("button", { name: "1" });
        const pageTwoButton = screen.getByRole("button", { name: "2" });
        const previousButton = screen.getByRole("button", {
          name: /Previous page/,
        });
        const nextButton = screen.getByRole("button", {
          name: /Next page/,
        });
        expect(pageOneButton).toBeInTheDocument();
        expect(pageOneButton).toBeEnabled();
        expect(pageTwoButton).toBeInTheDocument();
        expect(pageTwoButton).toBeDisabled();
        expect(previousButton).toBeInTheDocument();
        expect(previousButton).toBeEnabled();
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();
      });
    });
  });

  describe("when there are 3 pages", () => {
    beforeEach(() => {
      selectPageNum.mockReset().mockReturnValue(1);
      selectTotalPage.mockReset().mockReturnValue(3);
    });

    it("matches snapshot", () => {
      const { asFragment } = render(<Pagination />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("displays page number 1 , 2 , 3", () => {
      render(<Pagination />);
      const pageOneButton = screen.getByRole("button", { name: "1" });
      const pageTwoButton = screen.getByRole("button", { name: "2" });
      const pageThreeButton = screen.getByRole("button", { name: "3" });
      const previousButton = screen.getByRole("button", {
        name: /Previous page/,
      });
      const nextButton = screen.getByRole("button", {
        name: /Next page/,
      });
      expect(pageOneButton).toBeInTheDocument();
      expect(pageOneButton).toBeDisabled();
      expect(pageTwoButton).toBeInTheDocument();
      expect(pageTwoButton).toBeEnabled();
      expect(pageThreeButton).toBeInTheDocument();
      expect(pageThreeButton).toBeEnabled();
      expect(previousButton).toBeInTheDocument();
      expect(previousButton).toBeDisabled();
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeEnabled();
    });

    describe("when current page is 2", () => {
      beforeEach(() => {
        selectPageNum.mockReset().mockReturnValue(2);
      });

      it("matches snapshot", () => {
        const { asFragment } = render(<Pagination />);
        expect(asFragment()).toMatchSnapshot();
      });

      it("displays page number 1 , 2 , 3", () => {
        render(<Pagination />);
        const pageOneButton = screen.getByRole("button", { name: "1" });
        const pageTwoButton = screen.getByRole("button", { name: "2" });
        const pageThreeButton = screen.getByRole("button", { name: "3" });
        const previousButton = screen.getByRole("button", {
          name: /Previous page/,
        });
        const nextButton = screen.getByRole("button", {
          name: /Next page/,
        });
        expect(pageOneButton).toBeInTheDocument();
        expect(pageOneButton).toBeEnabled();
        expect(pageTwoButton).toBeInTheDocument();
        expect(pageTwoButton).toBeDisabled();
        expect(pageThreeButton).toBeInTheDocument();
        expect(pageThreeButton).toBeEnabled();
        expect(previousButton).toBeInTheDocument();
        expect(previousButton).toBeEnabled();
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeEnabled();
      });

      describe("when clicks page 1", () => {
        it("dispatches setPageNum", () => {
          render(<Pagination />);
          const pageOneButton = screen.getByRole("button", { name: "1" });
          fireEvent.click(pageOneButton);
          expect(dispatchSpy).toBeCalledTimes(1);
          expect(setPageNum).toBeCalledTimes(1);
          expect(setPageNum).toBeCalledWith({
            pageNum: 1,
          });
        });
      });

      describe("when clicks previous page button", () => {
        it("dispatches setPageNum", () => {
          render(<Pagination />);
          const previousButton = screen.getByRole("button", {
            name: /Previous page/,
          });
          fireEvent.click(previousButton);
          expect(dispatchSpy).toBeCalledTimes(1);
          expect(setPageNum).toBeCalledTimes(1);
          expect(setPageNum).toBeCalledWith({
            pageNum: 1,
          });
        });
      });

      describe("when clicks next page button", () => {
        it("dispatches setPageNum", () => {
          render(<Pagination />);
          const nextButton = screen.getByRole("button", {
            name: /Next page/,
          });
          fireEvent.click(nextButton);
          expect(dispatchSpy).toBeCalledTimes(1);
          expect(setPageNum).toBeCalledTimes(1);
          expect(setPageNum).toBeCalledWith({
            pageNum: 3,
          });
        });
      });
    });

    describe("when current page is 3", () => {
      beforeEach(() => {
        selectPageNum.mockReset().mockReturnValue(3);
      });

      it("matches snapshot", () => {
        const { asFragment } = render(<Pagination />);
        expect(asFragment()).toMatchSnapshot();
      });

      it("displays page number 1 , 2 , 3", () => {
        render(<Pagination />);
        const pageOneButton = screen.getByRole("button", { name: "1" });
        const pageTwoButton = screen.getByRole("button", { name: "2" });
        const pageThreeButton = screen.getByRole("button", { name: "3" });
        const previousButton = screen.getByRole("button", {
          name: /Previous page/,
        });
        const nextButton = screen.getByRole("button", {
          name: /Next page/,
        });
        expect(pageOneButton).toBeInTheDocument();
        expect(pageOneButton).toBeEnabled();
        expect(pageTwoButton).toBeInTheDocument();
        expect(pageTwoButton).toBeEnabled();
        expect(pageThreeButton).toBeInTheDocument();
        expect(pageThreeButton).toBeDisabled();
        expect(previousButton).toBeInTheDocument();
        expect(previousButton).toBeEnabled();
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();
      });
    });
  });
});
