import { addToCart, cart } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {});
  //This is a flaky code because it can work sometimes and sometimes it wouldn't This is because cart depends on what is in the localStorage
  it("adds a new product to the cart", () => {
    //spyOn is used for mock code
    //spyOn takes two values 1.Object 2.String(Method example getItem)
    //Now what i did below is to replace localStorage.getItem with what i want basically a fake version
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem('cart'))
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
  });
});
