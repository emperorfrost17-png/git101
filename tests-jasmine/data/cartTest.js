import {
  addToCart,
  cart,
  loadFromStorage,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    //This is to mock localStorage.setIem
    spyOn(localStorage, "setItem");
  });

  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "1",
          },
        ]),
      ),
    );
    expect(cart.length).toEqual(1);
    //.toHaveBeenCalledTimes() This checks how many times localStorage.setItems was called in the code above
    //I put 1 because i expect it to be called once
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  //This is a flaky code because it can work sometimes and sometimes it wouldn't This is because cart depends on what is in the localStorage
  it("adds a new product to the cart", () => {
    //spyOn is used for mock code
    //spyOn takes two values 1.Object 2.String(Method example getItem)
    //Now what i did below is that I replaced localStorage.getItem with an empty array.
    //  and reloaded the cart because the cart is saved in localStorage so i have to reload it here for it to be empty after i replace.
    //  Hope you understand
    // And don't forget the order of the Code matters

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    //.toHaveBeenCalledTimes() This checks how many times localStorage.setItems was called in the code above
    //I put 1 because i expect it to be called once
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "1",
          },
        ]),
      ),
    );
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });

  it("test for updateDeliveryOption", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    updateDeliveryOption(productId1, "3");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual("3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        { productId: productId1, quantity: 2, deliveryOptionId: "3" },
      ]),
    );
  });

  it("does nothing if the product is not in the cart", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    updateDeliveryOption("it does not exist", "3");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("does nothing if the product is not in the cart", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();
    updateDeliveryOption(productId1, "it does not exist");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  });
});
