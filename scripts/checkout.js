import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//This runs all the code inside the file without importing anything
//import "../data/cart-class.js";
//import "../data/car.js";
//This runs all the code inside the file without importing anything
//import "../data/backend-practice.js";

//Promise class is a better way of handling asynchronous code or function
//It also also allows us to have as many steps as we want

//resolve() function is kind of like done() function in  Jasmine
// It lets us control when to go to the next step

// resolve() finishes the Promise and can send a value out
// then() receives that value in the next step
// They are connected through the Promise

// Promise.all() runs multiple Promises at the same time
// It waits until all of them are finished
// Then it moves to the next step with .then()

// The results come back in an array
// The order of the results matches the order of the Promises

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("value 1");
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('Wo mami Schw3');
    });
  }),
]).then((value) => {
  console.log(value)
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

// resolve() finishes the Promise and can send a value out
// then() receives that value in the next step
// They are connected through the Promise
/*
new Promise((resolve) => {
   resolve() finishes the Promise and can send a value out
  then() receives that value in the next step
   They are connected through the Promise

  loadProducts(() => {
    resolve("value 1");
  });

  .then() is used to add a next step
}).then((value) => {
  console.log(value);
  You can create a new Promise class in then() by using 
  return just like this

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});

*/

// This arrow function is a callback because we pass it into loadProducts() and it will be executed later after loadProducts() is done loading from the backend.

// loadProducts() runs it later, after the products finish loading from the backend.

// Then the callback renders the checkout header, order summary, and payment summary.
/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
