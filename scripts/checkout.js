import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//This runs all the code inside the file without importing anything
//import "../data/cart-class.js";
//import "../data/car.js";
//This runs all the code inside the file without importing anything
//import "../data/backend-practice.js";

// This arrow function is a callback because we pass it into loadProducts().
// loadProducts() runs it later, after the products finish loading from the backend.
// Then the callback renders the checkout header, order summary, and payment summary.
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
