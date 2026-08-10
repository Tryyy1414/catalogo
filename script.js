/**
 * Catálogo Virtual Chocolates Tony - Lógica Frontend
 * Categorías simplificadas: Frutados, Con leche, % Cacao.
 */

(function () {
  'use strict';

  // Constants
  const STORAGE_KEY = 'tony_chocolates_catalog_cache';
  const DATA_URL = 'data/products.json';

  // Fixed Simplified Categories
  const CATEGORIES = [
    { id: 'all', label: 'Todos' },
    { id: 'Frutados', label: 'Frutados' },
    { id: 'Con leche', label: 'Con leche' },
    { id: '% Cacao', label: '% Cacao' }
  ];

  // State Management
  let allProducts = [];
  let currentTag = 'all';
  let searchQuery = '';

  // DOM Elements
  const productGrid = document.getElementById('product-grid');
  const resultsCount = document.getElementById('results-count');
  const searchInput = document.getElementById('search-input');
  const tagPillsContainer = document.getElementById('tag-pills');
  const statusBanner = document.getElementById('status-banner');
  const statusMessage = document.getElementById('status-message');

  // Modal Elements
  const productModal = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBrand = document.getElementById('modal-brand');
  const modalPrice = document.getElementById('modal-price');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalWhatsapp = document.getElementById('modal-whatsapp');
  const modalSocials = document.getElementById('modal-socials');
  const modalImgWrapper = document.getElementById('modal-img-wrapper');

  // SVG Placeholder
  const SVG_PLACEHOLDER = `
    <div class="image-placeholder">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span>Imagen no disponible</span>
    </div>
  `;

  // Embedded Fallback Dataset for Chocolates Tony
  const INLINE_PRODUCTS_FALLBACK = [
    {
      "id": "tony-70-fresa",
      "brand": "Tony",
      "title": "Chocolate 70% Cacao con Fresa",
      "description": "Chocolate amargo 70% cacao orgánico de Oxapampa combinado con trozos de fresas deshidratadas. Deliciosa combinación frutal e intensa.",
      "category": "Chocolates",
      "tags": ["Frutados", "% Cacao"],
      "price": 23.00,
      "mainImage": "assets/images/tony/chocolate_tony_70_fresa.webp",
      "sellerWhatsapp": "51987654321",
      "socialLinks": {
        "facebook": "https://www.facebook.com/share/1D6uEoHzGq/",
        "instagram": "https://www.instagram.com/tonny.oxa?igsh=MXV6OGExZjJ2dmRvYw=="
      }
    },
    {
      "id": "tony-50-cacao",
      "brand": "Tony",
      "title": "Chocolate 50% Cacao",
      "description": "Chocolate suave con leche elaborado con 50% cacao orgánico oxapampino. Notas cremosas.",
      "category": "Chocolates",
      "tags": ["Con leche", "% Cacao"],
      "price": 16.00,
      "mainImage": "assets/images/tony/chocolate_50.webp",
      "sellerWhatsapp": "51987654321",
      "socialLinks": {
        "facebook": "https://www.facebook.com/share/1D6uEoHzGq/",
        "instagram": "https://www.instagram.com/tonny.oxa?igsh=MXV6OGExZjJ2dmRvYw=="
      }
    },
    {
      "id": "tony-60-cacao",
      "brand": "Tony",
      "title": "Chocolate Bitter 60% Cacao",
      "description": "Chocolate semiamargo al 60% cacao fino de aroma oxapampino. Sabor intenso.",
      "category": "Chocolates",
      "tags": ["% Cacao"],
      "price": 18.00,
      "mainImage": "assets/images/tony/chocolate_tony_60.webp",
      "sellerWhatsapp": "51987654321",
      "socialLinks": {
        "facebook": "https://www.facebook.com/share/1D6uEoHzGq/",
        "instagram": "https://www.instagram.com/tonny.oxa?igsh=MXV6OGExZjJ2dmRvYw=="
      }
    },
    {
      "id": "tony-70-cacao",
      "brand": "Tony",
      "title": "Chocolate Dark 70% Cacao",
      "description": "Chocolate amargo premium 70% pureza. Rico en antioxidantes y cacao puro.",
      "category": "Chocolates",
      "tags": ["% Cacao"],
      "price": 20.00,
      "mainImage": "assets/images/tony/chocolate_tony_70.webp",
      "sellerWhatsapp": "51987654321",
      "socialLinks": {
        "facebook": "https://www.facebook.com/share/1D6uEoHzGq/",
        "instagram": "https://www.instagram.com/tonny.oxa?igsh=MXV6OGExZjJ2dmRvYw=="
      }
    },
    {
      "id": "tony-80-cacao",
      "brand": "Tony",
      "title": "Chocolate Finca 80% Cacao",
      "description": "Edición especial 80% cacao puro nativo seleccionado de finca.",
      "category": "Chocolates",
      "tags": ["% Cacao"],
      "price": 24.00,
      "mainImage": "assets/images/tony/chocolate_80.webp",
      "sellerWhatsapp": "51987654321",
      "socialLinks": {
        "facebook": "https://www.facebook.com/share/1D6uEoHzGq/",
        "instagram": "https://www.instagram.com/tonny.oxa?igsh=MXV6OGExZjJ2dmRvYw=="
      }
    },
    {
      "id": "tony-arandanos",
      "brand": "Tony",
      "title": "Chocolate con Arándanos",
      "description": "Chocolate semiamargo 65% combinado con arándanos deshidratados de la región.",
      "category": "Chocolates",
      "tags": ["Frutados"],
      "price": 23.00,
      "mainImage": "assets/images/tony/chocolate_arandanos.webp",
      "sellerWhatsapp": "51987654321",
      "socialLinks": {
        "facebook": "https://www.facebook.com/share/1D6uEoHzGq/",
        "instagram": "https://www.instagram.com/tonny.oxa?igsh=MXV6OGExZjJ2dmRvYw=="
      }
    },
    {
      "id": "tony-miel-nueces",
      "brand": "Tony",
      "title": "Chocolate con Miel & Nueces",
      "description": "Chocolate 50% con leche, enriquecido con miel pura de abeja y nueces crujientes.",
      "category": "Chocolates",
      "tags": ["Frutados", "Con leche"],
      "price": 21.00,
      "mainImage": "assets/images/tony/chocolate_miel.webp",
      "sellerWhatsapp": "51987654321",
      "socialLinks": {
        "facebook": "https://www.facebook.com/share/1D6uEoHzGq/",
        "instagram": "https://www.instagram.com/tonny.oxa?igsh=MXV6OGExZjJ2dmRvYw=="
      }
    },
    {
      "id": "tony-nibs-cafe",
      "brand": "Tony",
      "title": "Chocolate 60% Nibs & Café",
      "description": "Chocolate 60% cacao con nibs crujientes de cacao tostado y granos de café especial.",
      "category": "Chocolates",
      "tags": ["Frutados"],
      "price": 22.00,
      "mainImage": "assets/images/tony/chocolate_cafe.webp",
      "sellerWhatsapp": "51987654321",
      "socialLinks": {
        "facebook": "https://www.facebook.com/share/1D6uEoHzGq/",
        "instagram": "https://www.instagram.com/tonny.oxa?igsh=MXV6OGExZjJ2dmRvYw=="
      }
    }
  ];

  // Initialize App
  document.addEventListener('DOMContentLoaded', () => {
    initNetworkListeners();
    registerServiceWorker();
    setupEventListeners();
    renderSkeletons();
    loadProductsData();
  });

  // Network Status
  function initNetworkListeners() {
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    updateNetworkStatus();
  }

  function updateNetworkStatus() {
    if (!navigator.onLine) {
      showStatusBanner('offline', 'Modo sin conexión: mostrando catálogo guardado.');
    } else {
      hideStatusBanner();
    }
  }

  function showStatusBanner(type, message) {
    if (!statusBanner) return;
    statusBanner.className = `status-banner ${type}`;
    if (statusMessage) statusMessage.textContent = message;
  }

  function hideStatusBanner() {
    if (!statusBanner) return;
    statusBanner.className = 'status-banner';
  }

  // Load Data
  async function loadProductsData() {
    try {
      const response = await fetch(DATA_URL, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      allProducts = data;

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('No se pudo guardar en localStorage:', e);
      }

      renderCatalog();
    } catch (error) {
      console.info('Carga fetch no disponible, usando datos locales:', error.message);
      loadFromLocalStorageOrInline();
    }
  }

  function loadFromLocalStorageOrInline() {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        allProducts = JSON.parse(cached);
        showStatusBanner('cache', 'Cargado desde memoria local.');
        renderCatalog();
        return;
      }
    } catch (e) {
      console.warn('No se pudo leer localStorage:', e);
    }

    allProducts = INLINE_PRODUCTS_FALLBACK;
    if (window.location.protocol === 'file:') {
      showStatusBanner('cache', 'Modo archivo local (file://): mostrando catálogo integrado.');
    }
    renderCatalog();
  }

  // Skeleton UI
  function renderSkeletons() {
    if (!productGrid) return;
    let skeletonsHTML = '';
    for (let i = 0; i < 6; i++) {
      skeletonsHTML += `
        <div class="product-card skeleton-card">
          <div class="card-image-wrapper skeleton"></div>
          <div class="card-body">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 80%;"></div>
            <div class="skeleton skeleton-btn"></div>
          </div>
        </div>
      `;
    }
    productGrid.innerHTML = skeletonsHTML;
  }

  // Render Catalog
  function renderCatalog() {
    renderTagPills();
    filterAndRenderProducts();
  }

  // Simplified Fixed Category Pills Render
  function renderTagPills() {
    if (!tagPillsContainer) return;

    let pillsHTML = '';
    CATEGORIES.forEach(cat => {
      const isActive = currentTag === cat.id ? 'active' : '';
      pillsHTML += `<button class="tag-pill ${isActive}" data-tag="${escapeAttr(cat.id)}">${escapeHTML(cat.label)}</button>`;
    });

    tagPillsContainer.innerHTML = pillsHTML;

    tagPillsContainer.querySelectorAll('.tag-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentTag = e.currentTarget.dataset.tag;
        tagPillsContainer.querySelectorAll('.tag-pill').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        filterAndRenderProducts();
      });
    });
  }

  // Filter Logic
  function filterAndRenderProducts() {
    if (!productGrid) return;

    const filtered = allProducts.filter(product => {
      // Tag Category Filter
      if (currentTag !== 'all') {
        const hasTag = Array.isArray(product.tags) && product.tags.includes(currentTag);
        if (!hasTag) return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = product.title.toLowerCase().includes(query);
        const descMatch = product.description.toLowerCase().includes(query);
        const tagsMatch = Array.isArray(product.tags) && product.tags.some(t => t.toLowerCase().includes(query));

        if (!titleMatch && !descMatch && !tagsMatch) {
          return false;
        }
      }

      return true;
    });

    if (resultsCount) {
      resultsCount.textContent = `Mostrando ${filtered.length} de ${allProducts.length} chocolates`;
    }

    if (filtered.length === 0) {
      showEmptyState('No se encontraron chocolates en esta categoría.');
      return;
    }

    productGrid.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
    attachCardEvents(filtered);
  }

  // Global Image Error Handler (Clean & Safe)
  window.handleImgError = function (img) {
    if (!img) return;
    img.onerror = null;
    const parent = img.parentNode;
    if (parent) {
      parent.insertAdjacentHTML('beforeend', SVG_PLACEHOLDER);
    }
    img.remove();
  };

  // Card HTML Template
  function createProductCardHTML(product) {
    const whatsappUrl = buildWhatsappUrl(product);
    const tagsHTML = Array.isArray(product.tags)
      ? product.tags.map(t => `<span class="card-tag">${escapeHTML(t)}</span>`).join('')
      : '';

    return `
      <article class="product-card" data-id="${escapeAttr(product.id)}">
        <div class="card-image-wrapper">
          <span class="brand-badge">Tony</span>
          <img 
            src="${escapeAttr(product.mainImage)}" 
            alt="${escapeAttr(product.title)}"
            class="card-image"
            loading="lazy"
            onerror="window.handleImgError(this)"
          />
        </div>
        <div class="card-body">
          <h3 class="product-title">${escapeHTML(product.title)}</h3>
          <p class="product-description">${escapeHTML(product.description)}</p>
          <div class="card-tags">${tagsHTML}</div>
          <div class="card-footer">
            <div class="product-price">S/ ${product.price.toFixed(2)}</div>
          </div>
          <div class="card-actions" style="margin-top: 12px;">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" title="Pedir por WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm.01 16.67c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.38c0-4.51 3.67-8.18 8.18-8.18 2.18 0 4.24.85 5.78 2.39 1.54 1.54 2.39 3.6 2.39 5.79 0 4.51-3.67 8.18-8.18 8.18zm4.49-6.13c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31z"/></svg>
              Pedir por WhatsApp
            </a>
            <button type="button" class="btn-detail" data-id="${escapeAttr(product.id)}">Ver Detalle</button>
          </div>
        </div>
      </article>
    `;
  }

  // Build WhatsApp URL
  function buildWhatsappUrl(product) {
    const phone = product.sellerWhatsapp || '51987654321';
    const message = `Hola Chocolates Tony, me interesa pedir el producto: *${product.title}* (S/ ${product.price.toFixed(2)}) del catálogo virtual. ¿Tienen stock disponible?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  // Events
  function attachCardEvents(productsList) {
    const detailBtns = productGrid.querySelectorAll('.btn-detail');
    detailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.currentTarget.dataset.id;
        const product = productsList.find(p => p.id === productId);
        if (product) openModal(product);
      });
    });
  }

  // Modal
  function openModal(product) {
    if (!productModal) return;

    if (modalTitle) modalTitle.textContent = product.title;
    if (modalBrand) modalBrand.textContent = product.brand;
    if (modalPrice) modalPrice.textContent = `S/ ${product.price.toFixed(2)}`;
    if (modalDesc) modalDesc.textContent = product.description;

    if (modalTags && Array.isArray(product.tags)) {
      modalTags.innerHTML = product.tags.map(t => `<span class="card-tag">${escapeHTML(t)}</span>`).join('');
    }

    if (modalWhatsapp) {
      modalWhatsapp.href = buildWhatsappUrl(product);
    }

    if (modalImgWrapper) {
      modalImgWrapper.innerHTML = `
        <img 
          src="${escapeAttr(product.mainImage)}" 
          alt="${escapeAttr(product.title)}"
          class="modal-image"
          onerror="window.handleImgError(this)"
        />
      `;
    }

    if (modalSocials) {
      let socialsHTML = '';
      if (product.socialLinks) {
        if (product.socialLinks.facebook) {
          socialsHTML += `<a href="${escapeAttr(product.socialLinks.facebook)}" target="_blank" rel="noopener" class="social-link">Facebook</a>`;
        }
        if (product.socialLinks.instagram) {
          socialsHTML += `<a href="${escapeAttr(product.socialLinks.instagram)}" target="_blank" rel="noopener" class="social-link">Instagram</a>`;
        }
      }
      modalSocials.innerHTML = socialsHTML;
    }

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!productModal) return;
    productModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function setupEventListeners() {
    if (searchInput) {
      let debounceTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          searchQuery = e.target.value;
          filterAndRenderProducts();
        }, 150);
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (productModal) {
      productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && productModal && productModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function showEmptyState(message) {
    if (!productGrid) return;
    productGrid.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2"/>
        </svg>
        <h3 class="empty-state-title">Sin resultados</h3>
        <p class="empty-state-desc">${escapeHTML(message)}</p>
      </div>
    `;
    if (resultsCount) resultsCount.textContent = '0 chocolates';
  }

  function registerServiceWorker() {
    if (window.location.protocol === 'file:') {
      console.info('[ServiceWorker] Omitiendo registro en protocolo file://.');
      return;
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(reg => console.log('ServiceWorker registrado con éxito:', reg.scope))
          .catch(err => console.warn('Error al registrar ServiceWorker:', err));
      });
    }
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeAttr(str) {
    if (!str) return '';
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function escapeJSString(str) {
    return str.replace(/\n/g, '').replace(/'/g, "\\'");
  }

})();
