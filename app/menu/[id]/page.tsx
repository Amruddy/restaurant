import Link from "next/link";
import { notFound } from "next/navigation";
import { menuCategories, menuItems } from "@/data/menu";

type DishPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const rub = new Intl.NumberFormat("ru-RU");

function formatPrice(value: number) {
  return `${rub.format(value)} ₽`;
}

export function generateStaticParams() {
  return menuItems.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }: DishPageProps) {
  const { id } = await params;
  const item = menuItems.find((menuItem) => menuItem.id === id);

  if (!item) {
    return {};
  }

  return {
    title: `${item.name} | Меню ресторана`,
    description: item.description,
  };
}

export default async function DishPage({ params }: DishPageProps) {
  const { id } = await params;
  const item = menuItems.find((menuItem) => menuItem.id === id);

  if (!item) {
    notFound();
  }

  const category = menuCategories.find((menuCategory) => menuCategory.id === item.category);

  return (
    <main className="dish-page">
      <Link className="dish-back" href="/#menu">
        Назад к меню
      </Link>
      <article className="dish-detail">
        <img alt="" src={item.image} />
        <div className="dish-content">
          <p className="eyebrow">{category?.label ?? "Меню"}</p>
          <h1>{item.name}</h1>
          <strong>{formatPrice(item.price)}</strong>
          <p>{item.description}</p>
          <Link className="button button-primary" href="/#delivery">
            Перейти к заказу
          </Link>
        </div>
      </article>
    </main>
  );
}
