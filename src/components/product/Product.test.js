import { render } from "@testing-library/react";
import Product from "./Product";

describe("Product", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Product
        product={{
          product_image: "test_image.url",
          product_name: "test_name",
          description: "test product description",
          price: "123",
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
