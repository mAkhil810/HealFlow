// thankyou.js

document.addEventListener('DOMContentLoaded', () => {
    const orderData = JSON.parse(localStorage.getItem('orderComplete'));
    const messageEl = document.getElementById('thank-you-message');

    if (orderData && orderData.name) {
        messageEl.textContent = `Thank you for your purchase, ${orderData.name}!`;
    } else {
        messageEl.textContent = 'Thank you for your order!';
        console.warn("HealFlow Thank You Page: 'orderComplete' data not found or missing 'name' in localStorage.");
    }

    // Clear the stored order data from localStorage
    localStorage.removeItem('orderComplete');

    // Redirect to the home page after 5 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 5000);
});
