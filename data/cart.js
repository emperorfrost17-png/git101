//The reason why we just use the id is because when using id the id will find the rest of the other details like price rating and image etc. That is why we just only use id and quantity this is called normalizing the data
export let cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}]

// I put it here because it more related to the cart 
export function addToCart (productId, quantity) {
let matchingItem;
  cart.forEach((cartItem) => {
    //incase you forget the only reason why you can use 'Id' is because since you used 'cart.forEach((cartItem) => {})' cartItem has becomes a variable for each individual object in the cart arrays that is why you can use cartItem.productId or cartItem.quantity and stuff  Hope you understand
    if (productId === cartItem.productId) {
      matchingItem = cartItem
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
}

export function removeFromCart(productId) {
  // This Goes through the cart, keep only the items whose productId does not match, then replace cart with the updated list.
  const newCart = []

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {// '!==' means not equal to
      newCart.push(cartItem)
    }
  })

  cart = newCart
}
 
