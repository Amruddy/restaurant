import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>Страница не найдена</h1>
      <p>Вернитесь на главную страницу ресторана.</p>
      <Link className="button button-primary" href="/">
        На главную
      </Link>
    </main>
  );
}
