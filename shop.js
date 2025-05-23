// Example: Add product to cart and keep only the selected one
function addToCart(name, price) {
  const product = { name, price, quantity: 1 };
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  alert(`${name} added to cart`);
}
