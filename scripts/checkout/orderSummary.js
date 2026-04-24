import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";

import { products, getProduct } from "../../data/products.js";

// I used './' because './' means current folder then you find utils folder then you find money.js
import { formatCurrency } from "../utils/money.js";

//This is how you import a variable or function form an external library by putting the url in the from '' instead of a file path
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";

// Import notes:
// Use import dayjs from '...' for a default export.
// Use import { dayjs } from '...' for a named export.
// dayjs is a default export, so it works without {}.
// If you use { dayjs }, JavaScript looks for a named export called dayjs.
// dayjs is not a named export because the library exports one main value as the default export.
// A named export would be written like export const dayjs = ...
// But this library is exported like export default dayjs
// That is why we write import dayjs from '...' and not import { dayjs } from '...'

import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

/*
I put all the code below in a function so that when for example using the delivery options because i put all the code in a function i can just regenerate the HTML using the function i used (renderOrderSummary) when i click a different delivery option and it will for example update the date immediately instead of me refreshing the page  for it to manually update (Don't forget it does this because i put the function in the event listener of the deliveryOptions) 

The Process of doing this function thing is called MVC
Model = saves and manages the data e.g cart.js
View = It takes the data and displays it on the page e.g checkout.js
Controller = Runs some code when we interact with the page e.g Event Listener
*/

calculateDeliveryDate(deliveryOptions);
export function renderOrderSummary() {
  let cartSummaryHTML = "";
  //I created 'cartSummaryHTML' so that everytime we loop through the cart it will add the  HTML below inside the variable
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);  

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    
    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
      <div class="cart-item-container
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input type="number" min="0" max="999" class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>

              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
            
            
              
          </div>
        </div>


                
        `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      
      const dateString = calculateDeliveryDate(deliveryOption);

      //This is a ternary  operator = a shortcut to if{} and else{} statements
      //                              helps to assign a variable based on a condition
      //                              condition ? codeIfTrue : codeIfFalse
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
          <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
              <input type="radio"
              ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} - Shipping
                </div>
              </div>
            </div>
            `;
    });
    return html;
  }

  updateCartQuantity();
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      console.log(cart);
      renderOrderSummary();
      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector(".js-return-to-home-link").innerHTML =
      `${cartQuantity} Items`;
  }

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.classList.add("is-editing-quantity");
    });
  });
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`,
      );

      const newQuantity = Number(quantityInput.value);

      //This is called an early return so that if it is less than 1 or more than 1000 the code will not run
      if (newQuantity < 1 || newQuantity >= 1000) {
        alert("Quantity must be atleast 1 and less than 1000");
        return;
      }

      updateQuantity(productId, newQuantity);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    //The same thing as this:
    //const productId = element.dataset.productId;
    //const deliveryOptionId = element.dataset.deliveryOptionId;

    const { productId, deliveryOptionId } = element.dataset;

    element.addEventListener("click", () => {
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });
}
