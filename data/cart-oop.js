//The reason why we just use the id is because when using id the id will find the rest of the other details like price rating and image etc. That is why we just only use id and quantity this is called normalizing the data

//let cart; is the same as cart = undefined

import { validDeliveryOption } from "./deliveryOptions.js";

//It is advisable to use PascalCase when naming for things that generate objects in OOP
//For PascalCase you start every word with a capital letter including the first word
function Cart(localStorageKey) {
  //This is called Object-Oriented Programming(OOP)
  //Where you organize your code into objects
  const cart = {
    cartItems: undefined,

    //You caould have also written it as loadFromStorage: function() {} the one under is a shorcut
    loadFromStorage() {
      // "this" means the object that is calling this method, so here this.cartItems means cart.cartItems.
      //It is better to use 'this' incase if i want to change the object name
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

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
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

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
    },

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
    },

    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        //incase you forget the only reason why you can use '.quantity' is because since you used 'cart.forEach((cartItem) => {})' cartItem has become a variable for each individual object in the cart arrays that is why you can use cartItem.quantity and stuff  Hope you understand
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
      //You need 'return' because there is a calculation inside the function without 'return' calculation result will stay inside the function with 'return' it gives back the value. Hope you understand
    },

    updateQuantity(productId, newQuantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    },

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
    },
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
