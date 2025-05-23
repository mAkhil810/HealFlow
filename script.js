// script.js
import { getCart, addToCart, getTotalCartQuantity } from './cart-manager.js';

// Mobile menu toggle (for index.html)
const mobileMenuButtonIndex = document.getElementById('mobile-menu-button');
const mobileNavMenuIndex = document.getElementById('mobile-nav-menu');

if (mobileMenuButtonIndex && mobileNavMenuIndex) {
    mobileMenuButtonIndex.addEventListener('click', () => {
        mobileNavMenuIndex.classList.toggle('hidden');
    });
}

// Mobile menu toggle (for shop.html)
const mobileMenuButtonShop = document.getElementById('mobile-menu-button-shop');
const mobileNavMenuShop = document.getElementById('mobile-nav-menu-shop');

if (mobileMenuButtonShop && mobileNavMenuShop) {
    mobileMenuButtonShop.addEventListener('click', () => {
        mobileNavMenuShop.classList.toggle('hidden');
    });
}

// Cart Modal Elements (common to index.html and shop.html)
const cartModal = document.getElementById('cart-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const quantityInput = document.getElementById('quantity');
const modalProductImage = document.getElementById('modal-product-image');
const modalProductName = document.getElementById('modal-product-name');
const modalProductPrice = document.getElementById('modal-product-price');

let currentProduct = null; // Stores the product currently being added via the modal

// Get cart icon badges (desktop and mobile for both index and shop)
const cartBadgeDesktopIndex = document.getElementById('cart-badge');
const cartBadgeMobileIndex = document.getElementById('cart-badge-mobile');
const cartBadgeDesktopShop = document.getElementById('cart-badge-desktop');
const cartBadgeMobileShop = document.getElementById('cart-badge-mobile-shop');


function updateCartBadges() {
    const totalQuantity = getTotalCartQuantity();

    [cartBadgeDesktopIndex, cartBadgeMobileIndex, cartBadgeDesktopShop, cartBadgeMobileShop].forEach(badge => {
        if (badge) {
            if (totalQuantity > 0) {
                badge.textContent = totalQuantity;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    });
}


// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        currentProduct = {
            name: button.getAttribute('data-product'),
            price: parseFloat(button.getAttribute('data-price')),
            img: button.getAttribute('data-img') // Get image source
        };

        // Fill modal with product data
        modalProductImage.src = currentProduct.img;
        modalProductImage.alt = currentProduct.name;
        modalProductName.textContent = currentProduct.name;
        modalProductPrice.textContent = `$${currentProduct.price.toFixed(2)}`;

        quantityInput.value = 1; // Reset quantity to 1

        // Show modal
        cartModal.classList.remove('hidden');
    });
});

// Close modal handlers
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });
}

// Confirm button handler
if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity < 1) {
            alert('Please enter a valid quantity (1 or more).');
            return;
        }

        if (currentProduct) {
            addToCart({ ...currentProduct, quantity: quantity }); // Add to cart using cart-manager
            alert(`Added ${quantity} x ${currentProduct.name} to cart!`);
            updateCartBadges(); // Update badges after adding
        }

        cartModal.classList.add('hidden');
    });
}

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', updateCartBadges);
