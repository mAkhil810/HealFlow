const cartItemsEl = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartContainer = document.getElementById('cart-container');

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function getCart() {
  const productJSON = localStorage.getItem('selectedProduct');
  if (!productJSON) return [];
  return [JSON.parse(productJSON)];
}

function saveCart(cart) {
  if (cart.length > 0) {
    localStorage.setItem('selectedProduct', JSON.stringify(cart[0]));
  } else {
    localStorage.removeItem('selectedProduct');
  }
}

function renderCart() {
  const cartItems = getCart();
  cartItemsEl.innerHTML = '';

  if (cartItems.length === 0) {
    cartContainer.style.display = 'none';
    emptyCartMsg.style.display = 'block';
    return;
  } else {
    cartContainer.style.display = 'block';
    emptyCartMsg.style.display = 'none';
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
        <p class="text-gray-500">$${item.price.toFixed(2)} each</p>
      </div>
      <div class="flex items-center space-x-4">
        <button class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" onclick="updateQuantity(${index}, -1)">−</button>
        <span>${item.quantity}</span>
        <button class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" onclick="updateQuantity(${index}, 1)">+</button>
        <p class="w-20 text-right font-semibold">${formatPrice(itemTotal)}</p>
      </div>
    `;
    cartItemsEl.appendChild(li);
  });

  subtotalEl.textContent = formatPrice(subtotal);
}

function updateQuantity(index, change) {
  const cartItems = getCart();
  cartItems[index].quantity += change;
  if (cartItems[index].quantity <= 0) {
    cartItems.splice(index, 1);
  }
  saveCart(cartItems);
  renderCart();
}

document.querySelector('button.bg-green-600').addEventListener('click', () => {
  window.location.href = 'checkout.html';
});

renderCart();
