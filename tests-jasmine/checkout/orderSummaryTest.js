import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

import { loadFromStorage } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  it("display the cart", () => {
    //HTML appears here because CartSummaryHTML(the that generates the html for the cart Items) is equal to the DOM of '.js-order-summary'
    document.querySelector(".js-test-container").innerHTML =
      `<div class="js-order-summary"></div>
      <a class="js-return-to-home-link"></a>`;

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();

    renderOrderSummary();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2,
    );

    //.toContain() is basically self-explanatory it is used to verify that a specific item exists within a collection
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText,
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText,
    ).toContain("Quantity: 1");
  });
  it("removes a product", () => {
    document.querySelector(".js-test-container").innerHTML =
      `<div class="js-order-summary"></div>
      <a class="js-return-to-home-link"></a>
      <div class="js-payment-summary"></div>`;

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();

    renderOrderSummary();
    document.querySelector(`.js-delete-link-${productId1}`).click();
  });
});
