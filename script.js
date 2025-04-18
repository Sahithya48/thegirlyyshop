fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('product-list');

    data.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';

      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong>${product.price}</strong>
      `;

      container.appendChild(productDiv);
    });
  })
  .catch(error => console.error('Error loading products:', error));
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart(cart);
  alert(`${name} added to cart`);
}

function displayCart() {
  const cart = getCart();
  const cartContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  cartContainer.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p><strong>${item.name}</strong> - $${item.price} x ${item.quantity}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += item.price * item.quantity;
  });

  totalEl.textContent = `Total: $${total}`;
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCart();
}

// Run only on cart page
if (window.location.pathname.includes('cart.html')) {
  displayCart();
}
