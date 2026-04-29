"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { deliveryRules, menuCategories, menuItems, type MenuCategoryId } from "@/data/menu";

type Cart = Record<string, number>;
type PageVariant = "photo";

type RestaurantPageProps = {
  variant?: PageVariant;
};

const variantLabels: Record<PageVariant, string> = {
  photo: "Синтем · Грозный",
};

const navLinks = [
  { href: "#menu", label: "Меню" },
  { href: "#booking", label: "Бронь" },
  { href: "#delivery", label: "Заказ" },
  { href: "#contacts", label: "Контакты" },
];

const rub = new Intl.NumberFormat("ru-RU");

function formatPrice(value: number) {
  return `${rub.format(value)} ₽`;
}

export function RestaurantPage({ variant = "photo" }: RestaurantPageProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("popular");
  const [cart, setCart] = useState<Cart>({});
  const [addedItemId, setAddedItemId] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem("restaurant-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart) as Cart);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("restaurant-cart", JSON.stringify(cart));
  }, [cart]);

  const visibleItems = useMemo(() => {
    if (activeCategory === "popular") {
      return menuItems.filter((item) => item.popular);
    }

    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantity]) => {
          const item = menuItems.find((menuItem) => menuItem.id === id);
          return item ? { item, quantity } : null;
        })
        .filter(Boolean),
    [cart],
  );

  const subtotal = cartItems.reduce((sum, entry) => sum + entry!.item.price * entry!.quantity, 0);
  const deliveryFee =
    subtotal >= deliveryRules.minimumOrder && subtotal < deliveryRules.paidDeliveryLimit
      ? deliveryRules.deliveryFee
      : 0;
  const total = subtotal + deliveryFee;
  const canOrder = subtotal >= deliveryRules.minimumOrder;
  const cartCount = cartItems.reduce((sum, entry) => sum + entry!.quantity, 0);

  function addToCart(id: string) {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
    setAddedItemId(id);
  }

  useEffect(() => {
    if (!addedItemId) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setAddedItemId("");
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [addedItemId]);

  function updateQuantity(id: string, quantity: number) {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }
      return next;
    });
  }

  function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingStatus("Заявка подготовлена. После подключения Telegram администратор получит ее и свяжется для подтверждения.");
  }

  function handleDeliverySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDeliveryStatus(
      canOrder
        ? "Заказ подготовлен. После подключения Telegram ресторан получит состав корзины и контактные данные."
        : `Минимальная сумма заказа: ${formatPrice(deliveryRules.minimumOrder)}.`,
    );
  }

  return (
    <main className={`page-shell variant-${variant}`}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="На главную">
          Синтем
        </a>
        <nav className="site-nav" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="cart-link" href="#delivery" aria-label={`Корзина, позиций: ${cartCount}`}>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M6.2 7.5h12.5l-1.1 7.2a2 2 0 0 1-2 1.7H9.2a2 2 0 0 1-2-1.6L5.8 4.9H3.6" />
              <path d="M9.4 20h.1M16.1 20h.1" />
            </svg>
            <span>{cartCount}</span>
          </a>
          <button
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="Открыть меню"
            className="menu-toggle"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="mobile-menu" hidden={!isMobileMenuOpen} id="mobile-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">{variantLabels[variant]}</p>
          <h1>Современная чеченская кухня в Грозном</h1>
          <p>
            Национальные блюда в спокойной ресторанной подаче: галнаш, лепешки,
            горячее и знакомый вкус в современном городском ресторане.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#menu">
              Смотреть меню
            </a>
            <a className="button button-secondary" href="#booking">
              Оставить заявку
            </a>
          </div>
        </div>
        <div className="hero-media" aria-label="Блюда современной национальной кухни" />
      </section>

      <section className="section menu-section" id="menu">
        <div className="category-tabs" aria-label="Категории меню">
          {menuCategories.map((category) => (
            <button
              aria-pressed={activeCategory === category.id}
              className="tab-button"
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {visibleItems.map((item) => (
            <article className="menu-card" key={item.id}>
              <Link className="menu-card-link" href={`/menu/${item.id}`} aria-label={`Открыть блюдо ${item.name}`} />
              <img alt="" src={item.image} />
              <div>
                <div className="menu-card-title">
                  <h3>{item.name}</h3>
                </div>
                <div className="menu-card-footer">
                  <strong>{formatPrice(item.price)}</strong>
                  <button
                    className={`text-button ${addedItemId === item.id ? "is-added" : ""}`}
                    onClick={() => addToCart(item.id)}
                    type="button"
                  >
                    {addedItemId === item.id ? "Добавлено" : "Добавить"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="booking">
        <div className="section-heading">
          <h2>Бронь стола</h2>
        </div>
        <form className="form-panel" onSubmit={handleBookingSubmit}>
          <label>
            Имя
            <input name="name" required />
          </label>
          <label>
            Телефон
            <input name="phone" required type="tel" />
          </label>
          <div className="form-row">
            <label>
              Дата
              <input name="date" required type="date" />
            </label>
            <label>
              Время
              <input name="time" required type="time" />
            </label>
          </div>
          <label>
            Гостей
            <input max="6" min="1" name="guests" required type="number" />
          </label>
          <label>
            Комментарий
            <textarea name="comment" rows={3} />
          </label>
          <button className="button button-primary" type="submit">
            Отправить заявку
          </button>
          {bookingStatus ? <p className="form-status">{bookingStatus}</p> : null}
        </form>
      </section>

      <section className="section delivery-section" id="delivery">
        <div className="delivery-layout">
          <div className="cart-panel">
            <h3>Корзина</h3>
            {cartItems.length ? (
              <div className="cart-list">
                {cartItems.map((entry) => (
                  <div className="cart-item" key={entry!.item.id}>
                    <div>
                      <strong>{entry!.item.name}</strong>
                      <span>{formatPrice(entry!.item.price)}</span>
                    </div>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(entry!.item.id, entry!.quantity - 1)} type="button">
                        -
                      </button>
                      <span>{entry!.quantity}</span>
                      <button onClick={() => updateQuantity(entry!.item.id, entry!.quantity + 1)} type="button">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted">Корзина пуста</p>
            )}
            <div className="cart-total">
              <span>Блюда</span>
              <strong>{formatPrice(subtotal)}</strong>
              <span>Доставка</span>
              <strong>{formatPrice(deliveryFee)}</strong>
              <span>Итого</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            {!canOrder ? (
              <p className="notice">До минимальной суммы осталось {formatPrice(deliveryRules.minimumOrder - subtotal)}.</p>
            ) : null}
          </div>

          <form className="form-panel" onSubmit={handleDeliverySubmit}>
            <label>
              Имя
              <input name="delivery-name" required />
            </label>
            <label>
              Телефон
              <input name="delivery-phone" required type="tel" />
            </label>
            <label>
              Адрес
              <input name="address" required />
            </label>
            <label>
              Комментарий к заказу
              <textarea name="delivery-comment" rows={3} />
            </label>
            <button className="button button-primary" disabled={!canOrder} type="submit">
              Оформить заказ
            </button>
            {deliveryStatus ? <p className="form-status">{deliveryStatus}</p> : null}
          </form>
        </div>
      </section>

      <footer className="site-footer" id="contacts">
        <div>
          <p className="eyebrow">Контакты</p>
          <h2>Синтем · Грозный</h2>
          <p>Точный адрес, телефон, часы работы и соцсети нужно заменить на реальные данные перед публикацией.</p>
        </div>
        <a className="button button-secondary" href="#booking">
          Связаться через заявку
        </a>
      </footer>

      <a className="mobile-cart-bar" href="#delivery" aria-label={`Открыть корзину, позиций: ${cartCount}`}>
        <span className="mobile-cart-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M6.2 7.5h12.5l-1.1 7.2a2 2 0 0 1-2 1.7H9.2a2 2 0 0 1-2-1.6L5.8 4.9H3.6" />
            <path d="M9.4 20h.1M16.1 20h.1" />
          </svg>
        </span>
        <span>{cartCount ? formatPrice(total) : "Корзина"}</span>
      </a>
    </main>
  );
}
