"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { deliveryRules, menuCategories, menuItems, type MenuCategoryId } from "@/data/menu";

type Cart = Record<string, number>;

const navLinks = [
  { href: "#menu", label: "Меню" },
  { href: "#booking", label: "Бронь" },
  { href: "#events", label: "События" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

const rub = new Intl.NumberFormat("ru-RU");

function formatPrice(value: number) {
  return `${rub.format(value)} ₽`;
}

export function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("popular");
  const [cart, setCart] = useState<Cart>({});
  const [bookingStatus, setBookingStatus] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");

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

  function addToCart(id: string) {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

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
    setBookingStatus("Заявка подготовлена. После подключения Telegram администратор получит ее автоматически.");
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
    <main className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="На главную">
          Ресторан
        </a>
        <nav className="site-nav" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header-action" href="#booking">
          Забронировать
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">Грозный · современная национальная кухня</p>
          <h1>Теплый ресторан для ужинов, встреч и семейных событий</h1>
          <p>
            Чеченские традиции, авторская подача и понятный городской формат: можно спокойно
            посмотреть меню, оставить заявку на стол или собрать доставку.
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

      <section className="intro-strip" aria-label="Ключевая информация">
        <div>
          <span>Кухня</span>
          <strong>чеченская, европейская, азиатская</strong>
        </div>
        <div>
          <span>Форматы</span>
          <strong>ужин, семья, встреча, банкет</strong>
        </div>
        <div>
          <span>Доставка</span>
          <strong>от 500 ₽, бесплатно от 1000 ₽</strong>
        </div>
      </section>

      <section className="section menu-section" id="menu">
        <div className="section-heading">
          <p className="eyebrow">Меню</p>
          <h2>Основные блюда и категории</h2>
          <p>
            Тестовое меню взято из спецификации и должно быть заменено на утвержденное меню
            ресторана перед публикацией.
          </p>
        </div>

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
              <img alt="" src={item.image} />
              <div>
                <div className="menu-card-title">
                  <h3>{item.name}</h3>
                  <strong>{formatPrice(item.price)}</strong>
                </div>
                <p>{item.description}</p>
                <button className="text-button" onClick={() => addToCart(item.id)} type="button">
                  Добавить в доставку
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="booking">
        <div className="section-heading">
          <p className="eyebrow">Бронирование</p>
          <h2>Заявка с подтверждением администратора</h2>
          <p>
            Сайт не обещает автоматическую бронь. Гость оставляет данные, а администратор
            связывается и подтверждает возможность посадки.
          </p>
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
            <input min="1" name="guests" required type="number" />
          </label>
          <label>
            Комментарий
            <textarea name="comment" rows={4} />
          </label>
          <button className="button button-primary" type="submit">
            Отправить заявку
          </button>
          {bookingStatus ? <p className="form-status">{bookingStatus}</p> : null}
        </form>
      </section>

      <section className="section events-section" id="events">
        <div className="section-heading">
          <p className="eyebrow">События</p>
          <h2>Семейные вечера, встречи и закрытые форматы</h2>
        </div>
        <div className="event-grid">
          {["Семейный ужин", "Бизнес-встреча", "Банкет или закрытый ужин"].map((title) => (
            <article className="event-card" key={title}>
              <h3>{title}</h3>
              <p>Формат обсуждается с администратором после заявки, без обещания свободных дат.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section delivery-section" id="delivery">
        <div className="section-heading">
          <p className="eyebrow">Доставка</p>
          <h2>Корзина для заказа домой или в офис</h2>
          <p>
            Минимальная сумма заказа {formatPrice(deliveryRules.minimumOrder)}. Доставка
            {` ${formatPrice(deliveryRules.deliveryFee)} до ${formatPrice(
              deliveryRules.paidDeliveryLimit - 1,
            )}`}, бесплатно от {formatPrice(deliveryRules.paidDeliveryLimit)}.
          </p>
        </div>
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
              <p className="muted">Добавьте блюда из меню, чтобы проверить доставку.</p>
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
              Комментарий
              <textarea name="delivery-comment" rows={4} />
            </label>
            <button className="button button-primary" disabled={!canOrder} type="submit">
              Подготовить заказ
            </button>
            {deliveryStatus ? <p className="form-status">{deliveryStatus}</p> : null}
          </form>
        </div>
      </section>

      <footer className="site-footer" id="contacts">
        <div>
          <p className="eyebrow">Контакты</p>
          <h2>Грозный</h2>
          <p>Точный адрес, телефон, часы работы и соцсети нужно заменить на реальные данные перед публикацией.</p>
        </div>
        <a className="button button-secondary" href="#booking">
          Связаться через заявку
        </a>
      </footer>
    </main>
  );
}
