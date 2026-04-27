export type MenuCategoryId =
  | "popular"
  | "national"
  | "salads"
  | "soups"
  | "hot"
  | "european"
  | "asian"
  | "desserts"
  | "drinks";

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategoryId;
  description: string;
  price: number;
  image: string;
  deliveryAvailable: boolean;
  popular?: boolean;
};

export const menuCategories: MenuCategory[] = [
  { id: "popular", label: "Популярное" },
  { id: "national", label: "Национальная кухня" },
  { id: "salads", label: "Салаты" },
  { id: "soups", label: "Супы" },
  { id: "hot", label: "Горячее" },
  { id: "european", label: "Европейская кухня" },
  { id: "asian", label: "Азиатская кухня" },
  { id: "desserts", label: "Десерты" },
  { id: "drinks", label: "Напитки" },
];

export const menuItems: MenuItem[] = [
  {
    id: "zhizhig-galnash",
    name: "Жижиг-галнаш",
    category: "national",
    description: "Галушки с отварной говядиной и чесночным соусом.",
    price: 690,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
    popular: true,
  },
  {
    id: "chepalgash-curd",
    name: "Чепалгаш с творогом",
    category: "national",
    description: "Тонкая горячая лепешка с творогом и зеленью.",
    price: 290,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
    popular: true,
  },
  {
    id: "national-set",
    name: "Национальный сет для двоих",
    category: "national",
    description: "Подборка чеченских блюд для первого знакомства.",
    price: 1490,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
    popular: true,
  },
  {
    id: "caesar-chicken",
    name: "Цезарь с курицей",
    category: "salads",
    description: "Курица, романо, сухари и мягкий сливочный соус.",
    price: 490,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
  },
  {
    id: "mushroom-soup",
    name: "Крем-суп из грибов",
    category: "soups",
    description: "Нежный грибной суп со сливками и зеленью.",
    price: 390,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
  },
  {
    id: "caucasian-beef",
    name: "Говядина по-кавказски",
    category: "hot",
    description: "Томленая говядина со специями и свежей зеленью.",
    price: 720,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
    popular: true,
  },
  {
    id: "alfredo-chicken",
    name: "Паста Альфредо с курицей",
    category: "european",
    description: "Паста со сливочным соусом, курицей и сыром.",
    price: 560,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
  },
  {
    id: "asian-noodles",
    name: "Лапша с говядиной",
    category: "asian",
    description: "Пшеничная лапша, овощи, говядина и пряный соус.",
    price: 540,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
  },
  {
    id: "cheesecake",
    name: "Чизкейк",
    category: "desserts",
    description: "Сливочный десерт с ягодным соусом.",
    price: 370,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
  },
  {
    id: "homemade-lemonade",
    name: "Домашний лимонад",
    category: "drinks",
    description: "Освежающий лимонад собственного приготовления.",
    price: 250,
    image: "/restaurant-hero.png",
    deliveryAvailable: true,
  },
];

export const deliveryRules = {
  minimumOrder: 500,
  paidDeliveryLimit: 1000,
  deliveryFee: 200,
};
