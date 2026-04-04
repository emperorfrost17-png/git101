//This is called a module i couldn't use the cart variable in this file because cart.js was already using it (with const) so i got the variable out of the cart.js using module

//These are the steps

//1. You add a type="module" attribute to the script file you want to use 
//2.export the variable you want to use in the other script file
//3. import the variable you exported and also use "from '' " inside the qoutation marks you put the file path


//NB: You have to put all the imports at the top of the file 

import {cart} from '../data/cart.js'//I used '../' because 'cart.js' was outside the script folder when it is like that '../' is used to indicate that the file is not in the same folder as the export folder example script

import {products} from '../data/products.js'

let productsHTML = ''

products.forEach((product) => {
 productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
           $${(product.priceCents / 100).toFixed(2)}<!--.toFixed(2) makes the price have two decimal digits for example 10.9 = 10.90-->
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          <!--The data-* attribute is used to store custom data private to the page or application. It has to start with 'data' the name seperated with dashes-->
            Add to Cart
          </button>
        </div>` 
      
})



document.querySelector('.js-products-grid').innerHTML = productsHTML

const addedMessageTimeout = {}

 document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
 const productId = button.dataset.productId//makes the property camelCase even though i wrote product-name it joins it and write it in camel Case 

 

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)

   const quantity = Number(quantitySelector.value) 
 let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item
    }
    })
    if (matchingItem) {
      matchingItem.quantity+= quantity
    }
    else {
      cart.push({
      productId: productId,
      quantity: quantity
    
    })
  }
  let cartQuantity = 0
  cart.forEach((item) => {
    cartQuantity += item.quantity
  })
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
  const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`)
 
 
 addedToCart.classList.add('added-to-cart-message');

 const previousTimeout = addedMessageTimeout[productId]
 if (previousTimeout) {
  clearTimeout(previousTimeoutId)
 }

 
const timeoutId = setTimeout(() => {
    addedToCart.classList.remove('added-to-cart-message')
  }, 2000);

  })
 })
