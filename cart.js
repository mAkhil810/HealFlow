// cart-manager.js
// Centralized logic for managing the shopping cart in localStorage

const CART_STORAGE_KEY = 'healflowCart';

export function getCart() {
    try {
        const cartJSON = localStorage.getItem(CART_STORAGE_KEY);
        return cartJSON ? JSON.parse(cartJSON) : [];
    } catch (error) {
        console.error("Error getting cart from localStorage:", error);
        return [];
    }
}

export function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving cart to localStorage:", error);
    }
}

export function addToCart(productToAdd) {
    let cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.name === productToAdd.name);

    if (existingItemIndex > -1) {
        // Item exists, update quantity
        cart[existingItemIndex].quantity += productToAdd.quantity;
    } else {
        // New item, add to cart
        cart.push(productToAdd);
    }
    saveCart(cart);
}

export function updateCartItemQuantity(productName, change) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.name === productName);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            // Remove item if quantity drops to 0 or less
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
    }
}

export function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
}

export function getTotalCartQuantity() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}
