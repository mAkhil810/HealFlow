document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear cart on order
  localStorage.removeItem('selectedProduct');

  this.style.display = 'none';
  const confirmation = document.getElementById('confirmation');
  confirmation.style.display = 'block';

  // Simulated order info log
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  console.log(`Order placed by ${name}, confirmation sent to ${email}`);

  // Redirect to thank-you page after 3 seconds
  setTimeout(() => {
    window.location.href = "thank-you.html";
  }, 3000);
});

// Prefill form if product in cart
window.addEventListener('DOMContentLoaded', () => {
  const productJSON = localStorage.getItem('selectedProduct');
  if (productJSON) {
    const product = JSON.parse(productJSON);
    // Example: You can show product info somewhere on the checkout page if needed
    // or fill hidden inputs for order tracking
    console.log('Checkout product:', product.name, product.price);
  }
});
