// cart.js
import { getCart, saveCart, updateCartItemQuantity, getCartSubtotal } from './cart-manager.js';

const cartItemsEl = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartContainer = document.getElementById('cart-container');
const checkoutBtn = document.getElementById('checkout-btn');

function formatPrice(value) {
    return `$${value.toFixed(2)}`;
}

function renderCart() {
    const cartItems = getCart(); // Get full cart from manager
    cartItemsEl.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.classList.add('hidden'); // Use Tailwind hidden class
        emptyCartMsg.classList.remove('hidden'); // Show empty message
        return;
    } else {
        cartContainer.classList.remove('hidden'); // Show cart container
        emptyCartMsg.classList.add('hidden'); // Hide empty message
    }

    let subtotal = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const li = document.createElement('li');
        li.className = 'py-4 flex items-center justify-between';

        li.innerHTML = `
            <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-gray-500">${formatPrice(item.price)} each</p>
            </div>
            <div class="flex items-center space-x-4">
                <button class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" data-product-name="${item.name}" data-change="-1">−</button>
                <span>${item.quantity}</span>
                <button class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" data-product-name="${item.name}" data-change="1">+</button>
                <p class="w-20 text-right font-semibold">${formatPrice(itemTotal)}</p>
            </div>
        `;
        cartItemsEl.appendChild(li);
    });

    subtotalEl.textContent = formatPrice(subtotal);

    // Add event listeners for quantity buttons after rendering
    document.querySelectorAll('#cart-items button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-product-name');
            const change = parseInt(event.target.getAttribute('data-change'));
            updateCartItemQuantity(productName, change); // Use manager function
            renderCart(); // Re-render cart to reflect changes
        });
    });
}

// Proceed to checkout button click handler
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        // Before redirecting, save current cart to localStorage (though getCart/saveCart already handle persistence)
        // This is a good place to ensure the latest cart state is saved, if not implicitly handled by quantity updates.
        window.location.href = 'checkout.html';
    });
}


// Initial render when the page loads
document.addEventListener('DOMContentLoaded', renderCart);
