# Restaurant

MVP сайта современного ресторана в Грозном.

Проект строится по правилу: сначала спецификация, потом план, потом код.

## Стек

- Next.js
- React
- TypeScript
- CSS

## Команды

Установка зависимостей:

```bash
npm install
```

Запуск локально:

```bash
npm run dev
```

Сборка:

```bash
npm run build
```

На Windows, если PowerShell блокирует `npm`, используйте `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

## Структура

- `app/` - страницы и layout Next.js.
- `components/` - общие компоненты.
- `features/` - функциональные области.
- `data/` - структурированные данные, включая будущее `menu.ts`.
- `public/` - изображения и статические ассеты.
- `docs/` - спецификации.
- `SPEC.md` - общий смысл проекта.
- `TASKS.md` - рабочий план MVP.

## Документация

Ключевые документы:

- `SPEC.md`
- `docs/functional-map.md`
- `docs/feature-specs/`
- `docs/visual-rules.md`
- `docs/technical-spec.md`
- `docs/user-stories.md`
- `TASKS.md`
