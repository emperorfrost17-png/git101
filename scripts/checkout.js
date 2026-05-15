import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//This runs all the code inside the file without importing anything
//import "../data/cart-class.js";
//import "../data/car.js";
//This runs all the code inside the file without importing anything
//import "../data/backend-practice.js";

//async makes a function return a promise
async function loadPage() {
  //This return is kind of like resolve() the result will be passed in the then() parameter

  //await lets us write/run asynchronous code like normal/synchronous code
  //So now it will wait for loadProductsFetch to load from the backend before going to the next step
  //Async await can only be used with promises it can't work with a callback
  await loadProductsFetch();

  const value = await new Promise((resolve) => {
    loadCart(() => {
      //the resolve() value gets returned in an async function that is why i did const value = ....
      resolve("Wo mami Schw3");
    });
  });
 

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();
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

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("Wo mami Schw3");
    });
  }),
]).then((value) => {
  console.log(value);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

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
