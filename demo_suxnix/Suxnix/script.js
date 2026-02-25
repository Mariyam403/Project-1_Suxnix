// Shopping Cart Management
let cart = [];

// Load cart from localStorage
window.addEventListener('DOMContentLoaded', function() {
    const saved = localStorage.getItem('suxnixCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
});

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    showToast(name + ' added to cart!');
    
    // Open cart offcanvas
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartOffcanvas.show();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('suxnixCart', JSON.stringify(cart));
}

function updateCartUI() {
    const container = document.getElementById('cartItems');
    const subtotal = document.getElementById('cartSubtotal');
    const badge = document.getElementById('cartBadge');
    
    let total = 0;
    let count = 0;
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-cart-x" style="font-size: 48px; opacity: 0.3;"></i><p class="mt-2">Your cart is empty</p></div>';
        subtotal.textContent = 'Tk 0.00';
        badge.style.display = 'none';
        return;
    }
    
    let html = '';
    cart.forEach((item, i) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;
        
        html += `
            <div class="mb-3 pb-3 border-bottom">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div class="flex-grow-1">
                        <h6 class="mb-1" style="font-size: 14px; font-weight: 600;">${item.name}</h6>
                        <small class="text-muted">${item.quantity} × Tk ${item.price.toLocaleString()}</small>
                    </div>
                    <button class="btn btn-sm btn-link text-danger p-0" onclick="removeFromCart(${i})">
                        <i class="bi bi-x-circle"></i>
                    </button>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${i}, -1)">-</button>
                        <button class="btn btn-outline-secondary" disabled style="min-width: 40px;">${item.quantity}</button>
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${i}, 1)">+</button>
                    </div>
                    <strong>Tk ${itemTotal.toLocaleString()}</strong>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    subtotal.textContent = 'Tk ' + total.toLocaleString();
    badge.textContent = count;
    badge.style.display = 'inline-block';
}

function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toastId = 'toast_' + Date.now();
    
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white border-0" role="alert" style="background: #14cc65;">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-check-circle-fill me-2"></i>${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        showToast('Searching for: ' + query);
        bootstrap.Modal.getInstance(document.getElementById('searchModal')).hide();
    }
}

// Search on Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Carousel scroll function
function scrollCarousel(direction) {
    const carousel = document.getElementById('productCarousel');
    const scrollAmount = 284; // card width + gap
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Hide carousel scrollbar
const style = document.createElement('style');
style.textContent = `
    #productCarousel::-webkit-scrollbar { display: none; }
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .hover-bg-light:hover { background-color: #f8f9fa !important; }
`;
document.head.appendChild(style);

// Pulse animation for play button
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
        }
    }
    
    button:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 0 0 20px rgba(20, 204, 101, 0.3), 0 0 0 40px rgba(20, 204, 101, 0.2), 0 25px 50px rgba(0,0,0,0.5) !important;
    }
`;
document.head.appendChild(style);

// YouTube Video Configuration
// Replace this with your actual YouTube video ID
const youtubeVideoId = 'dQw4w9WgXcQ'; // Example: Rick Astley - Never Gonna Give You Up

// When modal is shown, load the video
const videoModal = document.getElementById('videoModal');
const youtubeIframe = document.getElementById('youtubeVideo');

videoModal.addEventListener('show.bs.modal', function () {
    // Load video when modal opens (with autoplay)
    youtubeIframe.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`;
});

videoModal.addEventListener('hide.bs.modal', function () {
    // Stop video when modal closes
    youtubeIframe.src = '';
});

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.btn');
    
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 15px 40px rgba(20, 204, 101, 0.4)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(20, 204, 101, 0.3)';
    });

    // Floating animation for capsules
    const floaters = document.querySelectorAll('[style*="right: -40px"], [style*="right: -60px"]');
    
    floaters.forEach((floater, index) => {
        floater.style.animation = `float ${3 + index}s ease-in-out infinite`;
    });

    // Add keyframes for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
});

// Custom carousel behavior
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('testimonialCarousel');
    const bsCarousel = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true, // This enables infinite loop
        touch: true
    });

    // Style active indicator
    const updateIndicators = () => {
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        indicators.forEach(indicator => {
            if (indicator.classList.contains('active')) {
                indicator.style.opacity = '1';
                indicator.style.backgroundColor = 'white';
            } else {
                indicator.style.opacity = '0.5';
                indicator.style.backgroundColor = 'white';
            }
        });
    };

    // Update on slide
    carousel.addEventListener('slid.bs.carousel', updateIndicators);
    updateIndicators();

    // Pause on hover
    carousel.addEventListener('mouseenter', function() {
        bsCarousel.pause();
    });

    carousel.addEventListener('mouseleave', function() {
        bsCarousel.cycle();
    });
});

// Instagram carousel animation
const style = document.createElement('style');
style.textContent = `
    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }
    
    .instagram-item:hover .instagram-overlay {
        opacity: 1 !important;
    }
    
    footer a:hover {
        color: #14cc65 !important;
    }
    
    footer .d-flex a:hover {
        background: #14cc65 !important;
        transform: translateY(-3px);
    }
    
    @media (prefers-reduced-motion: reduce) {
        #instagramCarousel {
            animation: none !important;
        }
    }
`;
document.head.appendChild(style);

// Pause animation on hover
const carousel = document.getElementById('instagramCarousel');
carousel.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
});
carousel.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
});

// *********************************************************************************************************************************************** 
// cartpage.html

const CART_KEY = 'suxnix_cart';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function fmt(n) {
    return 'Tk ' + parseFloat(n).toFixed(2);
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  function renderCart() {
    const cart       = getCart();
    const tbody      = document.getElementById('cart-tbody');
    const filled     = document.getElementById('cart-filled');
    const empty      = document.getElementById('empty-state');
    const badge      = document.getElementById('cart-badge');

    // Badge
    badge.textContent = cart.reduce((s, i) => s + i.qty, 0);

    if (cart.length === 0) {
      filled.classList.add('d-none');
      empty.classList.remove('d-none');
      return;
    }

    filled.classList.remove('d-none');
    empty.classList.add('d-none');

    tbody.innerHTML = '';
    let subtotal = 0;

    const fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f0f0f0'/%3E%3Ctext x='40' y='44' text-anchor='middle' font-size='11' fill='%23bbb'%3EIMG%3C/text%3E%3C/svg%3E";

    cart.forEach((item, idx) => {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="ps-0">
          <div class="d-flex align-items-center gap-3">
            <img src="${item.image || fallback}"
                 class="prod-img"
                 alt="${item.name}"
                 onerror="this.src='${fallback}'"/>
            <span class="prod-name">${item.name}</span>
          </div>
        </td>
        <td class="text-center price-val">${fmt(item.price)}</td>
        <td class="text-center">
          <div class="qty-stepper">
            <button onclick="changeQty(${idx}, -1)">−</button>
            <input type="number" min="1" value="${item.qty}"
                   onchange="setQty(${idx}, this.value)"/>
            <button onclick="changeQty(${idx}, 1)">+</button>
          </div>
        </td>
        <td class="text-center price-val">${fmt(lineTotal)}</td>
        <td class="text-center pe-0">
          <button class="btn-remove" onclick="removeItem(${idx})" title="Remove item">
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('subtotal-val').textContent = fmt(subtotal);
    document.getElementById('total-val').textContent    = fmt(subtotal);
  }

  function changeQty(idx, delta) {
    const cart = getCart();
    cart[idx].qty = Math.max(1, cart[idx].qty + delta);
    saveCart(cart);
    renderCart();
  }

  function setQty(idx, val) {
    const cart = getCart();
    const n = parseInt(val);
    if (isNaN(n) || n < 1) return;
    cart[idx].qty = n;
    saveCart(cart);
    renderCart();
  }

  function removeItem(idx) {
    const cart = getCart();
    const name = cart[idx].name;
    cart.splice(idx, 1);
    saveCart(cart);
    renderCart();
    showToast(`"${name}" removed from cart`);
  }

  function applyCoupon() {
    const code = document.getElementById('coupon-input').value.trim();
    if (!code) { showToast('Please enter a coupon code'); return; }
    showToast(`Coupon "${code}" applied! (demo)`);
  }

  // Init on load
  renderCart();

  // Sync across tabs
  window.addEventListener('storage', e => {
    if (e.key === CART_KEY) renderCart();
  });

// ***********************************************************************************************************************************************************

function openForgotPassword() {
    document.getElementById('forgot-password-section').classList.remove('d-none');
    document.getElementById('forgot-password-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function closeForgotPassword() {
    document.getElementById('forgot-password-section').classList.add('d-none');
    document.getElementById('forgot-email').value = '';
  }

  function submitForgotPassword() {
    const email = document.getElementById('forgot-email').value.trim();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    // TODO: wire up to your backend / Shopify reset endpoint
    alert(`A password reset link has been sent to ${email}`);
    closeForgotPassword();
  }

// *********************************************************************************************************************************************************** 
//ourblog.html

const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 300);
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// *********************************************************************************************************************************************************************
// checkout.html

// ── Live update order summary ──
    // Read cart from localStorage (set by cartpage.html), or use defaults
    function loadCartAndUpdate() {
      let cart = null;
      try { cart = JSON.parse(localStorage.getItem('suxnix_cart')); } catch(e){}

      if (cart && cart.items && cart.items.length > 0) {
        const item = cart.items[0]; // show first item
        document.getElementById('summaryProductName').textContent = item.name || 'Antiaging and Longevity';
        document.getElementById('summaryProductPrice').textContent = '$' + parseFloat(item.price || 49.99).toFixed(2);
        document.getElementById('summaryQty').textContent = item.qty || 1;
        document.getElementById('headerCartCount').textContent = cart.items.reduce((a,i) => a + (i.qty||1), 0);

        const subtotal = parseFloat(item.price || 49.99) * (item.qty || 1);
        const tax = +(subtotal * 0.15).toFixed(2);
        const total = (subtotal + tax).toFixed(2);

        document.getElementById('summarySubtotal').textContent = '$' + subtotal.toFixed(2);
        document.getElementById('summaryTax').textContent = '$' + tax;
        document.getElementById('summaryTotal').textContent = '৳' + total;
      }
    }

    loadCartAndUpdate();