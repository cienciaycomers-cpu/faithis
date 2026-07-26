"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, Product, products } from "./data/products";
import { track } from "./lib/analytics";

function Arrow({ light = false }: { light?: boolean }) {
  return <span className={`arrow ${light ? "arrow-light" : ""}`} aria-hidden="true">↗</span>;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All pieces");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === "All pieces" || product.category === activeCategory;
    const matchesQuery = `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [activeCategory, query]);

  const toggleFavorite = (product: Product) => {
    setFavorites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id]);
    track("wishlist_add", { product: product.name });
  };

  const addToCart = (product: Product) => {
    setCartCount((count) => count + 1);
    track("add_to_cart", { product: product.name, value: product.price });
  };

  const submitNewsletter = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newsletter.trim()) return;
    setNewsletterSent(true);
    track("newsletter_submit");
  };

  return (
    <main>
      <div className="announcement"><span>Winter Sale</span><span>Selected pieces up to 30% off</span><span>Shop now <Arrow light /></span></div>

      <header className="site-header">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? "Close" : "Menu"}</button>
        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Navegación principal">
          <a href="#collection">Collection</a><a href="#edit">The Edit</a><a href="#about">About</a>
        </nav>
        <a className="wordmark" href="#top" aria-label="faithis, volver al inicio">faithis<span className="wordmark-dot">.</span></a>
        <div className="header-actions">
          <label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); track("filter_used", { type: "search" }); }} placeholder="Search" aria-label="Buscar productos" /></label>
          <button onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })} aria-label={`Favoritos, ${favorites.length} guardados`}>♡ <span className="action-label">({favorites.length})</span></button>
          <button onClick={() => setCartCount(cartCount)} aria-label={`Bolsa, ${cartCount} productos`}>Bag <span className="action-label">({cartCount})</span></button>
        </div>
      </header>

      <section className="hero" id="top">
        <Image src="/images/faithis-hero.png" alt="Mujer usando un traje chocolate de faithis en una arquitectura de piedra" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-wash" />
        <div className="hero-content"><p className="eyebrow light-text">Collection 01 / 2026</p><h1>Always<br /><em>becoming.</em></h1><p className="hero-copy">Una colección para la mujer que no se queda quieta.</p><a className="button button-light" href="#collection" onClick={() => track("cta_click", { label: "Explore the edit" })}>Explore the edit <Arrow light /></a></div>
        <div className="hero-foot"><span>Buenos Aires / Mexico City / Everywhere</span><span>Scroll to discover ↓</span></div>
      </section>

      <section className="manifesto" id="about"><div className="section-index">01 / 04</div><div className="manifesto-copy"><p className="eyebrow">The faithis point of view</p><h2>Lo esencial puede<br /><em>sentirse extraordinario.</em></h2><p>Diseñamos piezas que siguen el ritmo de tu vida: precisas, sensoriales y hechas para volver a elegirlas.</p><a className="text-link" href="#collection">Discover faithis <Arrow /></a></div><div className="manifesto-note">Designed in the South.<br />Made for everywhere.</div></section>

      <section className="collection" id="collection"><div className="collection-heading"><div><p className="eyebrow">02 / The collection</p><h2>New <em>Arrivals</em></h2></div><p className="collection-intro">Diez piezas. Una manera de vestir que se adapta a vos.</p></div><div className="filter-row" role="group" aria-label="Filtrar colección">{categories.map((category) => <button key={category} className={activeCategory === category ? "filter-active" : ""} onClick={() => { setActiveCategory(category); track("filter_used", { category }); }}>{category}</button>)}</div><div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}><div className={`product-visual visual-${product.tone}`}><span className="product-number">{product.id}</span>{product.visual === "bag" && <Image src="/images/faithis-accessories.png" alt="Accesorios de la colección faithis" fill sizes="(max-width: 700px) 50vw, 25vw" className="product-image" />}{product.visual === "dress" && <Image src="/images/faithis-edit.png" alt="Vestido ivory de la colección faithis" fill sizes="(max-width: 700px) 50vw, 25vw" className="product-image product-image-dress" />}<button className={`favorite ${favorites.includes(product.id) ? "favorite-on" : ""}`} onClick={() => toggleFavorite(product)} aria-label={`${favorites.includes(product.id) ? "Quitar de" : "Agregar a"} favoritos ${product.name}`}>{favorites.includes(product.id) ? "♥" : "♡"}</button><button className="quick-view" onClick={() => { setQuickView(product); track("view_item", { product: product.name }); }}>Quick view <Arrow /></button></div><div className="product-meta"><div><p className="product-category">{product.category} {product.badge && <span>· {product.badge}</span>}</p><h3>{product.name}</h3><p className="product-note">{product.note}</p></div><div className="product-price"><span>{product.priceLabel}</span><button onClick={() => addToCart(product)} aria-label={`Agregar ${product.name} a la bolsa`}>+</button></div></div></article>)}</div>{visibleProducts.length === 0 && <p className="empty-state">No encontramos piezas para esa búsqueda. Probá con otro término.</p>}</section>

      <section className="edit-feature" id="edit"><div className="edit-image"><Image src="/images/faithis-edit.png" alt="Look ivory de la Spring Edit de faithis" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="edit-copy"><p className="eyebrow">03 / The Spring Edit</p><h2>Una nueva<br /><em>forma de llegar.</em></h2><p>Texturas que se mueven con vos. Volúmenes que encuentran su lugar. La temporada empieza donde quieras.</p><a className="button button-dark" href="#collection" onClick={() => track("cta_click", { label: "Shop spring edit" })}>Shop the edit <Arrow light /></a><span className="edit-caption">Faithis / Spring 2026</span></div></section>

      <section className="principles"><div className="section-index">04 / 04</div><div className="principles-intro"><p className="eyebrow">The details matter</p><h2>Menos, pero<br /><em>mejor elegido.</em></h2></div><div className="principle-list"><div><span>01</span><h3>Materiales honestos</h3><p>Texturas que se sienten antes de explicarse.</p></div><div><span>02</span><h3>Forma con intención</h3><p>Diseño pensado para acompañar, no distraer.</p></div><div><span>03</span><h3>Limited, always</h3><p>Pequeñas ediciones para elegir con tiempo.</p></div></div></section>

      <section className="newsletter"><p className="eyebrow light-text">The faithis letter</p><h2>Ideas for your<br /><em>next move.</em></h2><p>Recibí novedades, early access y notas sobre la colección.</p>{newsletterSent ? <p className="success-message">Gracias. Ya estás en la lista.</p> : <form onSubmit={submitNewsletter}><input type="email" value={newsletter} onChange={(event) => setNewsletter(event.target.value)} placeholder="Tu email" aria-label="Tu email" required /><button type="submit">Join us <Arrow light /></button></form>}</section>

      <footer className="site-footer"><a className="wordmark footer-mark" href="#top">faithis<span className="wordmark-dot">.</span></a><p>Always becoming.</p><div><a href="#collection">Instagram</a><a href="#collection">Pinterest</a><a href="#collection">Contact</a></div><span>© 2026 faithis</span></footer>

      {quickView && <div className="modal-backdrop" onClick={() => setQuickView(null)}><div className="quick-modal" role="dialog" aria-modal="true" aria-labelledby="quick-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setQuickView(null)} aria-label="Cerrar vista rápida">×</button><div className={`modal-visual visual-${quickView.tone}`}><span>{quickView.id}</span></div><div className="modal-copy"><p className="eyebrow">{quickView.category} / {quickView.color}</p><h2 id="quick-title">{quickView.name}</h2><p>{quickView.note}. Una pieza pensada para entrar en tu rotación y quedarse.</p><strong>{quickView.priceLabel}</strong><button className="button button-dark" onClick={() => { addToCart(quickView); setQuickView(null); }}>Add to bag <Arrow light /></button></div></div></div>}
    </main>
  );
}
