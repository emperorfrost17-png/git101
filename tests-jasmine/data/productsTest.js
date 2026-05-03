import { Products, Clothing, Appliances } from "../../data/products";

describe("Testing each class", () => {
  let product

  beforeEach(() => {
    
  })
  it("Testing Products Class", () => {
     product = new Products({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    });
  });
});
