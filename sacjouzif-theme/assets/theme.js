/* ============================================
   SACJOUZIF — Theme JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('hide');
        setTimeout(() => { loader.style.display = 'none'; }, 800);
      }
      document.querySelector('.site-header')?.classList.add('loaded');
    }, 1950);
  });

  /* ── CUSTOM CURSOR ── */
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cursor && cursorRing && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    const hoverTargets = 'a, button, .product-card, .cat-card, .testi-card, input';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor--hover');
        cursorRing.classList.add('cursor-ring--hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor--hover');
        cursorRing.classList.remove('cursor-ring--hover');
      });
    });
  } else {
    // Touch device: hide cursor elements
    if (cursor) cursor.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  /* ── SCROLL: NAV + PARALLAX ── */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
    // Parallax on hero shapes
    const geos = document.querySelectorAll('.hero-geo');
    const scrollY = window.scrollY;
    geos.forEach((geo, i) => {
      geo.style.transform = `translateY(${scrollY * (0.15 * (i + 1))}px)`;
    });
  });

  /* ── MOUSE PARALLAX (hero) ── */
  document.addEventListener('mousemove', e => {
    const geos = document.querySelectorAll('.hero-geo');
    const cx = (e.clientX / window.innerWidth  - 0.5) * 20;
    const cy = (e.clientY / window.innerHeight - 0.5) * 20;
    geos.forEach((g, i) => {
      const f = (i + 1) * 0.4;
      g.style.transform = `translate(${cx * f}px, ${cy * f}px)`;
    });
  });

  /* ── MOBILE MENU ── */
  const btnMenu   = document.querySelector('.btn-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  if (btnMenu && mobileNav) {
    btnMenu.addEventListener('click', () => {
      btnMenu.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        btnMenu.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── CART DRAWER ── */
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const cartDrawer  = document.querySelector('.cart-drawer');
  const cartCloseBtn = document.querySelector('.cart-close');
  const cartCountEls = document.querySelectorAll('.cart-count');

  function openCart() {
    cartOverlay?.classList.add('open');
    cartDrawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartOverlay?.classList.remove('open');
    cartDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', openCart);
  });
  cartCloseBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  /* Cart: Add to cart buttons */
  let cartItems = {};

  function updateCartUI() {
    const total = Object.values(cartItems).reduce((sum, item) => sum + item.qty, 0);
    cartCountEls.forEach(el => {
      el.textContent = total;
      if (total > 0) el.classList.add('bump');
      setTimeout(() => el.classList.remove('bump'), 300);
    });
    renderCartItems();
    updateCartTotal();
  }

  function renderCartItems() {
    const container = document.querySelector('.cart-drawer-items');
    if (!container) return;
    const keys = Object.keys(cartItems);
    if (keys.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <p>Votre panier est vide</p>
        </div>`;
      return;
    }
    container.innerHTML = keys.map(key => {
      const item = cartItems[key];
      return `
        <div class="cart-item" data-key="${key}">
          <div class="cart-item-img">
            ${item.img ? `<img src="${item.img}" alt="${item.title}">` : '<div style="width:100%;height:100%;background:var(--cream)"></div>'}
          </div>
          <div class="cart-item-info">
            <h4>${item.title}</h4>
            <div class="cart-item-price">${formatMoney(item.price)}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" data-action="dec" data-key="${key}">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" data-action="inc" data-key="${key}">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-key="${key}" aria-label="Supprimer">×</button>
        </div>`;
    }).join('');

    // Qty controls
    container.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const action = btn.dataset.action;
        if (action === 'inc') cartItems[key].qty++;
        else cartItems[key].qty--;
        if (cartItems[key].qty <= 0) delete cartItems[key];
        updateCartUI();
      });
    });
    container.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        delete cartItems[btn.dataset.key];
        updateCartUI();
      });
    });
  }

  function updateCartTotal() {
    const totalEl = document.querySelector('.cart-total span:last-child');
    if (!totalEl) return;
    const sum = Object.values(cartItems).reduce((s, i) => s + i.price * i.qty, 0);
    totalEl.textContent = formatMoney(sum);
  }

  function formatMoney(cents) {
    return (cents / 100).toLocaleString('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 });
  }

  // ATC buttons (JS fallback — works with or without Shopify fetch)
  document.querySelectorAll('.product-atc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card  = btn.closest('.product-card');
      const title = card?.querySelector('.product-title')?.textContent?.trim() || 'Produit';
      const priceText = card?.querySelector('.product-price')?.textContent?.replace(/[^\d]/g,'') || '0';
      const price = parseInt(priceText) * 100 || 99000;
      const img   = card?.querySelector('.product-media img')?.src || '';
      const key   = title.toLowerCase().replace(/\s+/g,'-');

      if (cartItems[key]) cartItems[key].qty++;
      else cartItems[key] = { title, price, img, qty: 1 };

      // Button feedback
      const orig = btn.textContent;
      btn.textContent = '✓ Ajouté';
      btn.style.background = 'var(--dark)';
      btn.style.color = 'var(--gold)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
      }, 1800);

      updateCartUI();
      setTimeout(openCart, 400);
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .product-card, .testi-card').forEach(el => {
    revealObserver.observe(el);
  });

  /* ── COUNTER ANIMATION ── */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      const hasPlus = raw.includes('+');
      const target  = parseInt(raw);
      if (isNaN(target)) return;
      let current = 0;
      const step = Math.max(1, target / 55);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target + (hasPlus ? '+' : '');
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
      }, 28);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

  /* ── NEWSLETTER ── */
  const nlForm = document.querySelector('.nl-form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = nlForm.querySelector('.nl-input');
      const btn   = nlForm.querySelector('.nl-btn');
      if (!input?.value) return;
      btn.textContent = '✓ Inscrit(e)!';
      btn.style.background = '#2A2018';
      input.value = '';
      setTimeout(() => { btn.textContent = "S'inscrire"; btn.style.background = ''; }, 3000);
    });
  }

  /* ── CHECKOUT BUTTON ── */
  document.querySelector('.btn-checkout')?.addEventListener('click', () => {
    window.location.href = '/checkout';
  });

});
