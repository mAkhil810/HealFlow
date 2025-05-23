// checkout.js
import { getCart, clearCart, getCartSubtotal } from './cart-manager.js';

const summaryList = document.getElementById('summary-list');
const summaryTotal = document.getElementById('summary-total');
const cartSummary = document.getElementById('cart-summary');
const checkoutForm = document.getElementById('checkout-form');
const confirmationMessage = document.getElementById('confirmation');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

function formatPrice(value) {
    return `$${value.toFixed(2)}`;
}

// Function to render cart summary on checkout page
function renderCheckoutSummary() {
    const cart = getCart(); // Get full cart from manager
    summaryList.innerHTML = ''; // Clear previous summary

    if (cart.length > 0) {
        cartSummary.classList.remove('hidden');
        let subtotal = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            const li = document.createElement('li');
            li.textContent = `${item.quantity}x ${item.name} - ${formatPrice(itemTotal)}`;
            summaryList.appendChild(li);
        });
        summaryTotal.textContent = formatPrice(subtotal);
    } else {
        cartSummary.classList.add('hidden');
        // Optionally redirect if cart is empty on checkout page
        // window.location.href = 'shop.html';
    }
}

// Event listener for checkout form submission
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Save customer name for thank you page
        const customerName = nameInput.value;
        localStorage.setItem('orderComplete', JSON.stringify({ name: customerName }));

        clearCart(); // Clear the entire cart using manager function

        this.classList.add('hidden'); // Hide the form
        confirmationMessage.classList.remove('hidden'); // Show confirmation message

        console.log(`Order placed by ${customerName}, confirmation to ${emailInput.value}`);

        // Redirect to thank-you page after 3 seconds
        setTimeout(() => {
            window.location.href = "thank-you.html";
        }, 3000);
    });
}

// Render summary when the page loads
document.addEventListener('DOMContentLoaded', renderCheckoutSummary);
