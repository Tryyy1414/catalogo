Role: Senior Frontend Developer (Optimización Web & Performance)

Objetivo: Crear una Web App ligera para un Catálogo Virtual de productos regionales de Oxapampa, optimizada para conexiones móviles lentas (3G/2G) y desplegable en GitHub Pages.

### Stack & Restricciones Técnicas
- Tech Stack: HTML5 semántico, CSS (Tailwind CSS por CDN/Build minimalista o CSS puro) y Vanilla JS. SIN frameworks pesados (No React, Vue, ni Angular).
- Assets: Implementar lazy loading nativo (`loading="lazy"`), formatos WebP/AVIF y placeholders livianos (Blur/Color).
- Navegación: Single Page Application (SPA) ultra ligera o Multi-page estática liviana.
- Despliegue: GitHub Pages + Cloudflare CDN (HTML/CSS/JS debe ser estático).

### Criterios de UX / Accesibilidad
- Target Audience: Usuarios de 28 a 65 años. UI extremadamente clara, botones grandes (mínimo 48px de área táctil), contraste alto e íconos intuitivos.
- CTA Principal: Botón flotante/destacado "Pedir por WhatsApp" que genere una URL `wa.me` con mensaje predeterminado (ej: "Hola, me interesa [Nombre del producto]").

### Estructura de Datos (Data-Driven Architecture)
Crea una estructura JSON local (`data/products.json`) para alimentar el catálogo fácilmente:
- Marcas iniciales:
  1. "Tony" (Categoría: Chocolates | Filtros: 50% cacao, 60% cacao, 70% cacao).
  2. "Waru" (Categoría: Artesanías y Souvenirs).
- Schema por Producto: id, brand, title, description, category, tags, price, mainImage, sellerWhatsapp, socialLinks: {facebook, instagram}.

### Estrategia de Carga Rápida (Low-Bandwidth Strategy)
1. Skeleton Loaders mientras cargan datos/imágenes.
2. Caché local con Service Worker básico para permitir navegación offline/conexiones intermitentes.
3. No usar tipografías pesadas ni librerías JS de terceros innecesarias.

### Entregable
Genera en este primer paso:
1. `index.html`: Estructura base responsiva con filtro por marca y subcategorías.
2. `data/products.json`: JSON con datos de prueba para "Tony" y "Waru".
3. `script.js`: Lógica de renderizado dinámico, filtrado y construcción del enlace a WhatsApp. No debe ser pesado y debe cargar rapido, no debe tener dependencias externas. Debe tener un fallback a localStorage para cargar los datos en caso de que no haya internet.
4. `styles.css`: Paleta de colores cálida/artesanal (tonos tierra, madera y verde naturaleza de Oxapampa), limpia y accesible. No debe ser pesado y debe cargar rapido, no debe tener dependencias externas. Debe tener un fallback a localStorage para cargar los datos en caso de que no haya internet.
5. `assets/images`: Carpeta donde residen las imagenes locales que cargaran en la web. Estaran divididas por marca y nombre del producto. Por ejemplo: `assets/images/tony/producto1.webp` y `assets/images/waru/producto2.webp`.
6. `assets/fonts`: Carpeta donde residen las fuentes locales que cargaran en la web. Estas se usarán como fallback si las fuentes principales no cargan o estan muy lentas. No deben ser necesarias, la web debe verse bien sin ellas.