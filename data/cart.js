//The reason why we just use the id is because when using id the id will find the rest of the other details like price rating and image etc. That is why we just only use id and quantity this is called normalizing the data
import { validDeliveryOption } from "./deliveryOptions.js";
export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// I put it here because it more related to the cart
export function addToCart(productId, quantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    //incase you forget the only reason why you can use 'Id' is because since you used 'cart.forEach((cartItem) => {})' cartItem has becomes a variable for each individual object in the cart arrays that is why you can use cartItem.productId or cartItem.quantity and stuff  Hope you understand
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  // This Goes through the cart, keep only the items whose productId does not match, then replace cart with the updated list.
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      // '!==' means not equal to
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    //incase you forget the only reason why you can use '.quantity' is because since you used 'cart.forEach((cartItem) => {})' cartItem has become a variable for each individual object in the cart arrays that is why you can use cartItem.quantity and stuff  Hope you understand
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
  //You need 'return' because there is a calculation inside the function without 'return' calculation result will stay inside the function with 'return' it gives back the value. Hope you understand
}
export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) {
    return;
  }
  // Stop here if the passed delivery option id is not one of the valid options.
  if (!validDeliveryOption(deliveryOptionId)) {
    return;
  }
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
