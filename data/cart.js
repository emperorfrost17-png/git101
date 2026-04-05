export const cart = []

// I put it here because it more related to the cart 
export function addToCart (productId, quantity) {
let matchingItem;
  cart.forEach((cartItem) => {
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

 
