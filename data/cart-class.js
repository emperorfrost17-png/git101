//The reason why we just use the id is because when using id the id will find the rest of the other details like price rating and image etc. That is why we just only use id and quantity this is called normalizing the data

//let cart; is the same as cart = undefined

import { validDeliveryOption } from "./deliveryOptions.js";

//A class is an object generator
//In a class, you do not add commas after methods because a class body is not an object literal.
//For class properties, you do not use ':' like objects, you use '=' and usually end the line with ';'.

//It is advisable to use PascalCase when naming for things that generate objects in OOP
//For PascalCase you start every word with a capital letter including the first word
class Cart {
  cartItems;

  localStorageKey;

  //everytime we generate an object it will run the code inside here
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;

    this.loadFromStorage();
  }

  loadFromStorage() {
    // "this" means the object that is calling this method, so here this.cartItems means cart.cartItems.
    //It is better to use 'this' incase if i want to change the object name
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
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

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId, quantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      //incase you forget the only reason why you can use 'Id' is because since you used 'cart.forEach((cartItem) => {})' cartItem has becomes a variable for each individual object in the cart arrays that is why you can use cartItem.productId or cartItem.quantity and stuff  Hope you understand
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    // This Goes through the cart, If an item's productId is not equal (!==) to the one we want to delete, it gets pushed into newCart
    //That if statement is saying: “Only keep the items that are not the one we want to delete.”

    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        // '!==' means not equal to
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      //incase you forget the only reason why you can use '.quantity' is because since you used 'cart.forEach((cartItem) => {})' cartItem has become a variable for each individual object in the cart arrays that is why you can use cartItem.quantity and stuff  Hope you understand
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
    //You need 'return' because there is a calculation inside the function without 'return' calculation result will stay inside the function with 'return' it gives back the value. Hope you understand
  }
  updateQuantity(productId, newQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
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

    this.saveToStorage();
  }
}

// We use 'new' because Cart is a class, and 'new' creates a new object from that class.
// Without 'new', JavaScript will give an error because classes cannot be called like normal functions.

//each object we generate from a class is called an instance of the class
// The value passed into new Cart('cart-oop') goes into the constructor parameter localStorageKey.

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);

//This is to check if businessCart is an instance of Cart
console.log(businessCart instanceof Cart);
