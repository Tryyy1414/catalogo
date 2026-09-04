/**
 * Catálogo Virtual Chocolates Tony - Lógica Frontend
 */

(function () {
  'use strict';

  // Constants
  const STORAGE_KEY = 'tony_chocolates_catalog_cache_v7';
  const DATA_URL = 'data/products.json';

  // Fixed Categories
  const CATEGORIES = [
    { id: 'all',          label: '✨ Todos' },
    { id: 'Frutados',     label: '🍓 Frutados' },
    { id: 'Frutos secos', label: '🥜 Frutos secos' },
    { id: '% Cacao',      label: '🍫 % Cacao' },
    { id: 'Packs',        label: '🎁 Packs' }
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // PRECIOS DE REFERENCIA
  //   60% barra 50g  → S/ 12
  //   70% barra 50g  → S/ 12
  //   60% barra 70g  → S/ 16
  //   70% barra 70g  → S/ 16
  //   80% barra 70g  → S/ 17
  //   Cacao polvo 90g   → S/ 10
  //   Cacao polvo 180g  → S/ 18
  //   Nibs 100g  → S/ 10
  //   Nibs 250g  → S/ 22
  //   Pasta cacao 100g  → S/ 10
  //   Maní 70% 20g      → S/  4
  //
  // PACKS (suma de unidades interiores)
  //   Pack 1: 3 × S/12 = S/ 36
  //   Pack 2: 3 × S/12 = S/ 36
  //   Pack 3: 4 × S/12 = S/ 48
  //   Pack 4: 3 × S/16 = S/ 48
  //   Pack 5: 3 × S/16 = S/ 48
  //   Pack 6: 4 × S/17 = S/ 68
  //   Pack 7: 4 × S/16 = S/ 64
  // ─────────────────────────────────────────────────────────────────────────────

  const SOCIAL = {
    tiktok:    'https://www.tiktok.com/@chocolatetony1?_t=8oO1gCgX6e7&_r=1',
    facebook:  'https://www.facebook.com/share/1D6uEoHzGq/',
    instagram: 'https://www.instagram.com/tonny.oxa?igsh=MXV6OGExZjJ2dmRvYw=='
  };
  const WA = 'faw.tong';
  const IMG = 'assets/images/tony/';

  /** Helper para crear entradas de producto */
  function p(id, title, description, tags, price, images) {
    return {
      id, brand: 'Tony', title, description,
      category: tags.includes('Packs') ? 'Packs' : 'Chocolates',
      tags, price,
      mainImage: IMG + images[0],
      images: images.map(i => IMG + i),
      sellerWhatsapp: WA, socialLinks: SOCIAL
    };
  }

  function buildWhatsappUrl(product) {
    const rawTarget = (product.sellerWhatsapp || WA).trim().replace(/^@/, '');
    const msg = `Hola Chocolates Tony, me interesa: *${product.title}* (S/ ${product.price.toFixed(2)}). ¿Tienen stock disponible?`;
    
    // Si contiene solo números, usar wa.me/numero
    if (/^\d+$/.test(rawTarget)) {
      return `https://wa.me/${rawTarget}?text=${encodeURIComponent(msg)}`;
    }
    // Si es un username / ID de WhatsApp (ej. pjce1)
    return `https://wa.me/${rawTarget}?text=${encodeURIComponent(msg)}`;
  }

  const INLINE_PRODUCTS = [

    // ══════════════════════════════════════════════════════════════════════════
    // 60 % – 50 g  → S/ 12
    // ══════════════════════════════════════════════════════════════════════════
    p('chocolate_arandanos_60_barra_50g',
      'Barra Chocolate 60% Cacao con Arándanos 50g',
      'Barra de chocolate semiamargo 60% cacao orgánico de Oxapampa con arándanos deshidratados. Notas frutales intensas y antioxidantes naturales.',
      ['% Cacao', 'Frutados'], 12.00,
      ['chocolate_arandanos_60_barra_50g.webp', 'chocolate_arandanos_60_barra_50g_2.webp']),

    p('chocolate_fresa_60_barra_50g',
      'Barra Chocolate 60% Cacao con Fresa 50g',
      'Barra de chocolate semiamargo 60% cacao de Oxapampa con trozos de fresa deshidratada. Equilibrio perfecto entre dulce y amargo.',
      ['% Cacao', 'Frutados'], 12.00,
      ['chocolate_fresa_60_barra_50g.webp', 'chocolate_fresa_60_barra_50g_2.webp']),

    p('chocolate_kiwi_60_barra_50g',
      'Barra Chocolate 60% Cacao con Kiwi 50g',
      'Barra de chocolate semiamargo 60% cacao con relleno de kiwi deshidratado. Sabor frutal exótico con el toque intenso del cacao oxapampino.',
      ['% Cacao', 'Frutados'], 12.00,
      ['chocolate_kiwi_60_barra_50g.webp', 'chocolate_kiwi_60_barra_50g_2.webp']),

    p('chocolate_quitoquito_60_barra_50g',
      'Barra Chocolate 60% Cacao con Quito Quito 50g',
      'Barra de chocolate semiamargo 60% cacao con quito quito, fruta silvestre exótica de la selva peruana. Sabor único y sorprendente.',
      ['% Cacao', 'Frutados'], 12.00,
      ['chocolate_quitoquito_60_barra_50g.webp',
       'chocolate_quitoquito_60_barra_50g_2.webp',
       'chocolate_quitoquito_60_barra_50g_3.webp',
       'chocolate_quitoquito_60_barra_50g_4.webp',
       'chocolate_quitoquito_60_barra_50g_5.webp']),

    // ══════════════════════════════════════════════════════════════════════════
    // 70 % – 50 g  → S/ 12
    // ══════════════════════════════════════════════════════════════════════════
    p('chocolate_arandanos_70_barra_50g',
      'Barra Chocolate 70% Cacao con Arándanos 50g',
      'Barra de chocolate amargo 70% cacao orgánico de Oxapampa con arándanos deshidratados. Intensidad del cacao con notas frutales vibrantes.',
      ['% Cacao', 'Frutados'], 12.00,
      ['chocolate_arandanos_70_barra_50g.webp',
       'chocolate_arandanos_70_barra_50g_2.webp',
       'chocolate_arandanos_70_barra_50g_3.webp']),

    p('chocolate_fresa_70_barra_50g',
      'Barra Chocolate 70% Cacao con Fresa 50g',
      'Barra de chocolate amargo 70% cacao con trozos de fresa deshidratada. Combinación frutal e intensa de cacao puro oxapampino.',
      ['% Cacao', 'Frutados'], 12.00,
      ['chocolate_fresa_70_barra_50g.webp',
       'chocolate_fresa_70_barra_50g_2.webp',
       'chocolate_fresa_70_barra_50g_3.webp']),

    p('chocolate_kiwi_70_barra_50g',
      'Barra Chocolate 70% Cacao con Kiwi 50g',
      'Barra de chocolate amargo 70% cacao con kiwi deshidratado. Contraste exótico entre la potencia del cacao y el kiwi.',
      ['% Cacao', 'Frutados'], 12.00,
      ['chocolate_kiwi_70_barra_70g.webp']),   // imagen de referencia (misma variedad)

    p('chocolate_quitoquito_70_barra_50g',
      'Barra Chocolate 70% Cacao con Quito Quito 50g',
      'Barra de chocolate amargo 70% cacao con quito quito, fruta silvestre de la selva peruana. Sabor silvestre con intensidad máxima.',
      ['% Cacao', 'Frutados'], 12.00,
      ['chocolate_quitoquito_60_barra_50g.webp']),  // imagen de referencia

    // ══════════════════════════════════════════════════════════════════════════
    // 60 % – 70 g  → S/ 16
    // ══════════════════════════════════════════════════════════════════════════
    p('chocolate_arandanos_60_barra_70g',
      'Barra Chocolate 60% Cacao con Arándanos 70g',
      'Barra grande de chocolate semiamargo 60% cacao con arándanos deshidratados. Antioxidante y delicioso.',
      ['% Cacao', 'Frutados'], 16.00,
      ['chocolate_arandanos_60_barra_70g.webp']),

    p('chocolate_fresa_60_barra_70g',
      'Barra Chocolate 60% Cacao con Fresa 70g',
      'Barra grande de chocolate semiamargo 60% cacao con fresa deshidratada. Presentación perfecta para regalar.',
      ['% Cacao', 'Frutados'], 16.00,
      ['chocolate_fresa_60_barra_70g.webp']),

    p('chocolate_almendra_60_barra_70g',
      'Barra Chocolate 60% Cacao con Almendra 70g',
      'Barra de chocolate semiamargo 60% cacao con almendras enteras seleccionadas. Textura crujiente y sabor equilibrado.',
      ['% Cacao', 'Frutos secos'], 16.00,
      ['chocolate_almendra_60_barra_70g.webp']),

    p('chocolate_pecana_60_barra_70g',
      'Barra Chocolate 60% Cacao con Pecana 70g',
      'Barra de chocolate semiamargo 60% cacao con pecanas seleccionadas. Crujiente y con personalidad.',
      ['% Cacao', 'Frutos secos'], 16.00,
      ['chocolate_pecana_60_barra_70g.webp']),

    p('chocolate_pasas_60_barra_70g',
      'Barra Chocolate 60% Cacao con Pasas 70g',
      'Barra de chocolate semiamargo 60% cacao con pasas selectas. Dulzura natural de la uva con el suave amargor del cacao.',
      ['% Cacao', 'Frutados'], 16.00,
      ['chocolate_pasas_70_barra_70g.webp']),   // imagen de referencia

    p('chocolate_nueces_60_barra_70g',
      'Barra Chocolate 60% Cacao con Nueces 70g',
      'Barra de chocolate semiamargo 60% cacao con nueces seleccionadas. Combinación clásica de cacao intenso y fruto seco.',
      ['% Cacao', 'Frutos secos'], 16.00,
      ['chocolate_almendra_60_barra_70g.webp']), // imagen de referencia

    // ══════════════════════════════════════════════════════════════════════════
    // 70 % – 70 g  → S/ 16
    // ══════════════════════════════════════════════════════════════════════════
    p('chocolate_70_barra_70g',
      'Barra Chocolate 70% Cacao Puro 70g',
      'Barra pura de chocolate amargo 70% cacao nativo de Oxapampa. Sin rellenos, para apreciar el sabor auténtico del cacao de finca.',
      ['% Cacao'], 16.00,
      ['chocolate_70_barra_70g.webp']),

    p('chocolate_arandano_70_barra_70g',
      'Barra Chocolate 70% Cacao con Arándano 70g',
      'Barra de chocolate amargo 70% cacao con arándano deshidratado. Intensidad del cacao oxapampino con notas frutales.',
      ['% Cacao', 'Frutados'], 16.00,
      ['chocolate_arandano_70_barra_70g.webp']),

    p('chocolate_fresa_70_barra_70g',
      'Barra Chocolate 70% Cacao con Fresa 70g',
      'Barra grande de chocolate amargo 70% cacao con fresa deshidratada. Combinación clásica de chocolate intenso y fruta.',
      ['% Cacao', 'Frutados'], 16.00,
      ['chocolate_fresa_70_barra_70g.webp']),

    p('chocolate_kiwi_70_barra_70g',
      'Barra Chocolate 70% Cacao con Kiwi 70g',
      'Barra de chocolate amargo 70% cacao con kiwi deshidratado. Sabor frutal exótico con la intensidad del cacao nativo.',
      ['% Cacao', 'Frutados'], 16.00,
      ['chocolate_kiwi_70_barra_70g.webp']),

    p('chocolate_pasas_70_barra_70g',
      'Barra Chocolate 70% Cacao con Pasas 70g',
      'Barra de chocolate amargo 70% cacao con pasas seleccionadas. Dulzura natural de la uva pasa con el amargor del cacao puro.',
      ['% Cacao', 'Frutados'], 16.00,
      ['chocolate_pasas_70_barra_70g.webp', 'chocolate_pasas_70_barra_70g_2.webp']),

    p('chocolate_pecana_70_barra_70g',
      'Barra Chocolate 70% Cacao con Pecana 70g',
      'Barra de chocolate amargo 70% cacao con pecanas enteras. Combinación perfecta de intensidad y textura crujiente.',
      ['% Cacao', 'Frutos secos'], 16.00,
      ['chocolate_pecana_70_barra_70g.webp']),

    p('chocolate_almendra_70_barra_70g',
      'Barra Chocolate 70% Cacao con Almendra 70g',
      'Barra de chocolate amargo 70% cacao con almendras enteras seleccionadas. Intensidad del cacao con la cremosidad de la almendra.',
      ['% Cacao', 'Frutos secos'], 16.00,
      ['chocolate_almendra_60_barra_70g.webp']),  // imagen de referencia

    p('chocolate_nueces_70_barra_70g',
      'Barra Chocolate 70% Cacao con Nueces 70g',
      'Barra de chocolate amargo 70% cacao con nueces seleccionadas. El clásico maridaje de cacao intenso con fruto seco.',
      ['% Cacao', 'Frutos secos'], 16.00,
      ['chocolate_pecana_70_barra_70g.webp']),    // imagen de referencia

    p('chocolate_manzana_70_barra_70g',
      'Barra Chocolate 70% Cacao con Manzana 70g',
      'Barra de chocolate amargo 70% cacao con manzana deshidratada. Contraste frutal dulce con la profundidad del cacao oxapampino.',
      ['% Cacao', 'Frutados'], 16.00,
      ['chocolate_fresa_70_barra_70g.webp']),     // imagen de referencia

    // ══════════════════════════════════════════════════════════════════════════
    // 80 % – 70 g  → S/ 17
    // ══════════════════════════════════════════════════════════════════════════
    p('chocolate_80_barra_70g',
      'Barra Chocolate 80% Cacao Puro 70g',
      'Barra pura de chocolate extra amargo 80% cacao nativo de Oxapampa. Intensidad máxima, rico en antioxidantes y flavonoides.',
      ['% Cacao'], 17.00,
      ['chocolate_80_barra_70g.webp']),

    p('chocolate_arandanos_80_barra_70g',
      'Barra Chocolate 80% Cacao con Arándanos 70g',
      'Barra de chocolate extra amargo 80% cacao con arándanos deshidratados. La máxima expresión del cacao con un toque frutal.',
      ['% Cacao', 'Frutados'], 17.00,
      ['chocolate_arandanos_80_barra_70g.webp']),

    p('chocolate_kiwi_80_barra_70g',
      'Barra Chocolate 80% Cacao con Kiwi 70g',
      'Barra de chocolate extra amargo 80% cacao con kiwi deshidratado. Contraste exótico entre la potencia del cacao y el kiwi.',
      ['% Cacao', 'Frutados'], 17.00,
      ['chocolate_kiwi_80_barra_70g.webp']),

    p('chocolate_pasas_80_barra_70g',
      'Barra Chocolate 80% Cacao con Pasas 70g',
      'Barra de chocolate extra amargo 80% cacao con pasas selectas. Dulzura natural con potencia de cacao al máximo.',
      ['% Cacao', 'Frutados'], 17.00,
      ['chocolate_pasas_80_barra_70g.webp']),

    // ══════════════════════════════════════════════════════════════════════════
    // OTROS PRODUCTOS
    // ══════════════════════════════════════════════════════════════════════════
    p('chocolate_mani_70_20g',
      'Chocolate 70% Cacao con Maní 20g',
      'Pequeña tableta de chocolate amargo 70% cacao con maní tostado. Snack perfecto para llevar, crujiente y con sabor intenso.',
      ['% Cacao', 'Frutos secos'], 4.00,
      ['chocolate_mani_70_20g.webp']),

    p('cacao_polvo_90g',
      'Cacao en Polvo 90g',
      'Cacao puro en polvo 100% orgánico de Oxapampa. Sin azúcar añadida. Ideal para bebidas calientes, repostería y smoothies. Presentación 90g.',
      ['% Cacao'], 10.00,
      ['cacao_polvo_90g.webp']),

    p('cacao_polvo_180g',
      'Cacao en Polvo 180g',
      'Cacao puro en polvo 100% orgánico de Oxapampa. Sin azúcar añadida. Ideal para bebidas calientes, repostería y smoothies. Presentación familiar 180g.',
      ['% Cacao'], 18.00,
      ['cacao_polvo_180g.webp', 'cacao_polvo_180g_2.webp']),

    p('nibs_cacao_100g',
      'Nibs de Cacao Tostado y Triturado 100g',
      'Trozos crujientes de cacao tostado y triturado sin procesar. Snack saludable con sabor intenso a cacao puro. Alto en magnesio y antioxidantes. Presentación 100g.',
      ['% Cacao'], 10.00,
      ['nibs_cacao.webp']),

    p('nibs_cacao_250g',
      'Nibs de Cacao Tostado y Triturado 250g',
      'Trozos crujientes de cacao tostado y triturado sin procesar. Snack saludable con sabor intenso a cacao puro. Alto en magnesio y antioxidantes. Presentación familiar 250g.',
      ['% Cacao'], 22.00,
      ['nibs_cacao.webp']),

    p('pasta_cacao_100g',
      'Pasta de Cacao 100g',
      'Pasta de cacao orgánico 100% puro de Oxapampa. Sin aditivos. Ideal para repostería artesanal o consumo directo. Presentación 100g.',
      ['% Cacao'], 10.00,
      ['pasta_cacao_100g.webp', 'pasta_cacao_100g_2.webp', 'pasta_cacao_100g_3.webp']),

    // ══════════════════════════════════════════════════════════════════════════
    // PACKS  (precio = suma de las unidades incluidas)
    // ══════════════════════════════════════════════════════════════════════════

    p('pack1',
      'Pack 1 – Mix 50g (3 unidades)',
      '• Chocolate 70% cacao con Arándanos 50g — S/ 12\n• Chocolate 70% cacao con Fresa 50g — S/ 12\n• Chocolate 60% cacao con Quito Quito 50g — S/ 12\n\nTotal: S/ 36',
      ['Packs'], 36.00,
      ['pack1.webp', 'pack1_2.webp', 'pack1_3.webp']),

    p('pack2',
      'Pack 2 – Mix 60% 50g (3 unidades)',
      '• Chocolate 60% cacao con Arándanos 50g — S/ 12\n• Chocolate 60% cacao con Fresa 50g — S/ 12\n• Chocolate 60% cacao con Kiwi 50g — S/ 12\n\nTotal: S/ 36',
      ['Packs'], 36.00,
      ['pack2.webp', 'pack2_2.webp', 'pack2_3.webp']),

    p('pack3',
      'Pack 3 – Mix 70% 50g (4 unidades)',
      '• Chocolate 70% cacao con Fresa 50g — S/ 12\n• Chocolate 70% cacao con Arándanos 50g — S/ 12\n• Chocolate 70% cacao con Kiwi 50g — S/ 12\n• Chocolate 70% cacao con Quito Quito 50g — S/ 12\n\nTotal: S/ 48',
      ['Packs'], 48.00,
      ['pack3.webp', 'pack3_2.webp']),

    p('pack4',
      'Pack 4 – Mix 70% 70g Frutos (3 unidades)',
      '• Chocolate 70% cacao con Pasas 70g — S/ 16\n• Chocolate 70% cacao con Pecana 70g — S/ 16\n• Chocolate 70% cacao con Kiwi 70g — S/ 16\n\nTotal: S/ 48',
      ['Packs'], 48.00,
      ['pack4.webp']),

    p('pack5',
      'Pack 5 – Mix 70% 70g Surtido (3 unidades)',
      '• Chocolate 70% cacao con Fresa 70g — S/ 16\n• Chocolate 70% cacao con Arándanos 70g — S/ 16\n• Chocolate 70% cacao Puro 70g — S/ 16\n\nTotal: S/ 48',
      ['Packs'], 48.00,
      ['pack5.webp']),

    p('pack6',
      'Pack 6 – Mix 80% 70g (4 unidades)',
      '• Chocolate 80% cacao Puro 70g — S/ 17\n• Chocolate 80% cacao con Kiwi 70g — S/ 17\n• Chocolate 80% cacao con Arándanos 70g — S/ 17\n• Chocolate 80% cacao con Pasas 70g — S/ 17\n\nTotal: S/ 68',
      ['Packs'], 68.00,
      ['pack6.webp', 'pack6_2.webp']),

    p('pack7',
      'Pack 7 – Mix 60% 70g Surtido (4 unidades)',
      '• Chocolate 60% cacao con Fresa 70g — S/ 16\n• Chocolate 60% cacao con Arándanos 70g — S/ 16\n• Chocolate 60% cacao con Almendra 70g — S/ 16\n• Chocolate 60% cacao con Pecana 70g — S/ 16\n\nTotal: S/ 64',
      ['Packs'], 64.00,
      ['pack7.webp', 'pack7_2.webp'])

  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // ESTADO
  // ─────────────────────────────────────────────────────────────────────────────
  let allProducts = [];
  let currentTag  = 'all';
  let searchQuery = '';

  // DOM Elements
  const productGrid       = document.getElementById('product-grid');
  const resultsCount      = document.getElementById('results-count');
  const searchInput       = document.getElementById('search-input');
  const tagPillsContainer = document.getElementById('tag-pills');
  const statusBanner      = document.getElementById('status-banner');
  const statusMessage     = document.getElementById('status-message');

  // Modal Elements
  const productModal   = document.getElementById('product-modal');
  const modalCloseBtn  = document.getElementById('modal-close-btn');
  const modalTitle     = document.getElementById('modal-title');
  const modalBrand     = document.getElementById('modal-brand');
  const modalPrice     = document.getElementById('modal-price');
  const modalDesc      = document.getElementById('modal-desc');
  const modalTags      = document.getElementById('modal-tags');
  const modalWhatsapp  = document.getElementById('modal-whatsapp');
  const modalSocials   = document.getElementById('modal-socials');
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

  // ─────────────────────────────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initNetworkListeners();
    registerServiceWorker();
    setupEventListeners();
    renderSkeletons();
    loadProductsData();
  });

  function initNetworkListeners() {
    window.addEventListener('online',  updateNetworkStatus);
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

  // ─────────────────────────────────────────────────────────────────────────────
  // CARGA DE DATOS
  // ─────────────────────────────────────────────────────────────────────────────
  async function loadProductsData() {
    // file:// no permite fetch – usar datos embebidos directamente
    if (window.location.protocol === 'file:') {
      loadInlineProducts();
      return;
    }
    try {
      const response = await fetch(DATA_URL, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      allProducts = data;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* noop */ }
      renderCatalog();
    } catch (error) {
      console.info('Fetch no disponible, usando datos integrados:', error.message);
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
    } catch (e) { /* noop */ }
    loadInlineProducts();
  }

  function loadInlineProducts() {
    allProducts = INLINE_PRODUCTS;
    renderCatalog();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  function renderSkeletons() {
    if (!productGrid) return;
    let html = '';
    for (let i = 0; i < 8; i++) {
      html += `
        <div class="product-card skeleton-card">
          <div class="card-image-wrapper skeleton"></div>
          <div class="card-body">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width:80%;"></div>
            <div class="skeleton skeleton-btn"></div>
          </div>
        </div>`;
    }
    productGrid.innerHTML = html;
  }

  function renderCatalog() {
    renderTagPills();
    filterAndRenderProducts();
  }

  function renderTagPills() {
    if (!tagPillsContainer) return;
    let html = '';
    CATEGORIES.forEach(cat => {
      const active = currentTag === cat.id ? 'active' : '';
      html += `<button class="tag-pill ${active}" data-tag="${escapeAttr(cat.id)}">${escapeHTML(cat.label)}</button>`;
    });
    tagPillsContainer.innerHTML = html;
    tagPillsContainer.querySelectorAll('.tag-pill').forEach(btn => {
      btn.addEventListener('click', e => {
        currentTag = e.currentTarget.dataset.tag;
        tagPillsContainer.querySelectorAll('.tag-pill').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        filterAndRenderProducts();
      });
    });
  }

  function filterAndRenderProducts() {
    if (!productGrid) return;
    const filtered = allProducts.filter(product => {
      if (currentTag !== 'all') {
        if (!Array.isArray(product.tags) || !product.tags.includes(currentTag)) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = product.title.toLowerCase().includes(q);
        const inDesc  = product.description.toLowerCase().includes(q);
        const inTags  = Array.isArray(product.tags) && product.tags.some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inTags) return false;
      }
      return true;
    });

    if (resultsCount) {
      resultsCount.textContent = `Mostrando ${filtered.length} de ${allProducts.length} productos`;
    }

    if (filtered.length === 0) {
      showEmptyState('No se encontraron productos en esta categoría.');
      return;
    }

    productGrid.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
    attachCardEvents(filtered);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // CARD
  // ─────────────────────────────────────────────────────────────────────────────
  window.handleImgError = function (img) {
    if (!img) return;
    img.onerror = null;
    const parent = img.parentNode;
    if (parent) parent.insertAdjacentHTML('beforeend', SVG_PLACEHOLDER);
    img.remove();
  };

  function createProductCardHTML(product) {
    const waUrl    = buildWhatsappUrl(product);
    const tagsHTML = Array.isArray(product.tags)
      ? product.tags.map(t => `<span class="card-tag">${escapeHTML(t)}</span>`).join('')
      : '';
    const descHTML = escapeHTML(product.description).replace(/\n/g, '<br>');

    return `
      <article class="product-card" data-id="${escapeAttr(product.id)}">
        <div class="card-image-wrapper">
          <span class="brand-badge">Tony</span>
          <img src="${escapeAttr(product.mainImage)}"
               alt="${escapeAttr(product.title)}"
               class="card-image" loading="lazy"
               onerror="window.handleImgError(this)"/>
        </div>
        <div class="card-body">
          <h3 class="product-title">${escapeHTML(product.title)}</h3>
          <p class="product-description">${descHTML}</p>
          <div class="card-tags">${tagsHTML}</div>
          <div class="card-footer">
            <div class="product-price">S/ ${product.price.toFixed(2)}</div>
          </div>
          <div class="card-actions" style="margin-top:12px;">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" title="Pedir por WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm.01 16.67c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.38c0-4.51 3.67-8.18 8.18-8.18 2.18 0 4.24.85 5.78 2.39 1.54 1.54 2.39 3.6 2.39 5.79 0 4.51-3.67 8.18-8.18 8.18zm4.49-6.13c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31z"/></svg>
              Pedir por WhatsApp
            </a>
            <button type="button" class="btn-detail" data-id="${escapeAttr(product.id)}">Ver Detalle</button>
          </div>
        </div>
      </article>`;
  }


  function attachCardEvents(productsList) {
    productGrid.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', e => {
        const product = productsList.find(pr => pr.id === e.currentTarget.dataset.id);
        if (product) openModal(product);
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // MODAL
  // ─────────────────────────────────────────────────────────────────────────────
  function openModal(product) {
    if (!productModal) return;
    if (modalTitle)  modalTitle.textContent  = product.title;
    if (modalBrand)  modalBrand.textContent  = product.brand;
    if (modalPrice)  modalPrice.textContent  = `S/ ${product.price.toFixed(2)}`;
    if (modalDesc)   modalDesc.innerHTML     = escapeHTML(product.description).replace(/\n/g, '<br>');

    if (modalTags && Array.isArray(product.tags)) {
      modalTags.innerHTML = product.tags.map(t => `<span class="card-tag">${escapeHTML(t)}</span>`).join('');
    }
    if (modalWhatsapp) modalWhatsapp.href = buildWhatsappUrl(product);

    if (modalImgWrapper) {
      modalImgWrapper.innerHTML = `
        <img src="${escapeAttr(product.mainImage)}"
             alt="${escapeAttr(product.title)}"
             class="modal-image"
             onerror="window.handleImgError(this)"/>`;
    }

    if (modalSocials) {
      let s = '';
      const sl = product.socialLinks || {};
      if (sl.tiktok)    s += `<a href="${escapeAttr(sl.tiktok)}"    target="_blank" rel="noopener" class="social-link">TikTok</a>`;
      if (sl.instagram) s += `<a href="${escapeAttr(sl.instagram)}" target="_blank" rel="noopener" class="social-link">Instagram</a>`;
      if (sl.facebook)  s += `<a href="${escapeAttr(sl.facebook)}"  target="_blank" rel="noopener" class="social-link">Facebook</a>`;
      modalSocials.innerHTML = s;
    }

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!productModal) return;
    productModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // EVENTOS
  // ─────────────────────────────────────────────────────────────────────────────
  function setupEventListeners() {
    if (searchInput) {
      let t;
      searchInput.addEventListener('input', e => {
        clearTimeout(t);
        t = setTimeout(() => { searchQuery = e.target.value; filterAndRenderProducts(); }, 150);
      });
    }
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (productModal) {
      productModal.addEventListener('click', e => { if (e.target === productModal) closeModal(); });
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && productModal && productModal.classList.contains('active')) closeModal();
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
      </div>`;
    if (resultsCount) resultsCount.textContent = '0 productos';
  }

  function registerServiceWorker() {
    if (window.location.protocol === 'file:') return;
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(r  => console.log('SW registrado:', r.scope))
          .catch(er => console.warn('Error SW:', er));
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // UTILIDADES
  // ─────────────────────────────────────────────────────────────────────────────
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

})();
