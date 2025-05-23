// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileNavMenu = document.getElementById('mobile-nav-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileNavMenu.classList.toggle('hidden');
});

// Cart logic
const cart = [];
const cartModal = document.getElementById('cart-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const quantityInput = document.getElementById('quantity');

const modalProductImage = document.getElementById('modal-product-image');
const modalProductName = document.getElementById('modal-product-name');
const modalProductPrice = document.getElementById('modal-product-price');

let currentProduct = null;

// Get cart icon (desktop & mobile)
const cartIconDesktop = document.querySelector('a[href="cart.html"] svg');
const cartIconMobile = document.querySelector('#mobile-nav-menu a[href="cart.html"]');

function updateCartUI() {
  // Calculate total quantity
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Show quantity as a badge on the desktop cart icon
  let badge = document.getElementById('cart-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.id = 'cart-badge';
    badge.className = 'absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold';
    // Positioning relative for cart icon container
    cartIconDesktop.parentElement.style.position = 'relative';
    cartIconDesktop.parentElement.appendChild(badge);

    // For mobile menu cart text, append badge too
    cartIconMobile.style.position = 'relative';
    const mobileBadge = badge.cloneNode(true);
    mobileBadge.id = 'cart-badge-mobile';
    cartIconMobile.appendChild(mobileBadge);
  }

  if (totalQuantity > 0) {
    badge.textContent = totalQuantity;
    document.getElementById('cart-badge-mobile').textContent = totalQuantity;
    badge.style.display = 'flex';
    document.getElementById('cart-badge-mobile').style.display = 'flex';
  } else {
    badge.style.display = 'none';
    document.getElementById('cart-badge-mobile').style.display = 'none';
  }

  console.log('Cart Contents:', cart);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    currentProduct = {
      name: button.getAttribute('data-product'),
      price: parseFloat(button.getAttribute('data-price')),
      img: button.closest('div').querySelector('img').src
    };

    // Fill modal with product data
    modalProductImage.src = currentProduct.img;
    modalProductImage.alt = currentProduct.name;
    modalProductName.textContent = currentProduct.name;
    modalProductPrice.textContent = `$${currentProduct.price.toFixed(2)}`;

    quantityInput.value = 1;

    // Show modal
    cartModal.classList.remove('hidden');
  });
});

// Close modal handlers
closeModalBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

cancelBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Confirm button handler
confirmBtn.addEventListener('click', () => {
  const quantity = parseInt(quantityInput.value);
  if (!quantity || quantity < 1) {
    alert('Please enter a valid quantity (1 or more).');
    return;
  }

  const item = cart.find(i => i.product === currentProduct.name);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({
      product: currentProduct.name,
      price: currentProduct.price,
      quantity: quantity
    });
  }

  alert(`Added ${quantity} x ${currentProduct.name} to cart!`);
  updateCartUI();

  cartModal.classList.add('hidden');
});

