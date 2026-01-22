import { render, screen } from "@testing-library/react";
import { ProductCard } from "./product-card";
import { formatPrice, Product } from "@/data/products";

describe("ProductCard", () => {
  const product: Product = {
    id: "test",
    name: "Bosch 42lbs Fuel Injector",
    priceCents: 12000,
    rating: { stars: 4.8, count: 120 },
    keywords: ["fuel", "bosch", "injector"],
    description: "Bosch 42lbs injector for turbo setups.",
    image: "images/products/bicos-bosch-42lbs.png",
    badge: "Top rated",
  };

  it("renders product information", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    const expectedPrice = formatPrice(product.priceCents).replace(/\s/g, "");
    expect(
      screen.getByText((content) => content.replace(/\s/g, "") === expectedPrice),
    ).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(screen.getByText("120 reviews")).toBeInTheDocument();
    product.keywords.forEach((keyword) => {
      expect(screen.getByText(keyword)).toBeInTheDocument();
    });
  });
});
