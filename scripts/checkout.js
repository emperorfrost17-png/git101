import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//This runs all the code inside the file without importing anything
//import "../data/cart-class.js";
renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
