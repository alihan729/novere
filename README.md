# NOVERE

Бутик-агентство премиальной недвижимости. React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui + Supabase.

## Стек

- React 18, Vite, TypeScript
- Tailwind CSS 3 + shadcn/ui (New York), кастомные токены (gold #C9A961, ink, bone)
- React Router v6, Zustand, TanStack Query
- Supabase: Postgres, Auth, RLS
- lucide-react · Inter + Playfair Display
- Хостинг: Vercel

## Локальный запуск

```bash
npm install
cp .env.example .env       # подставить реальные ключи (см. ниже)
npm run dev
```

Откроется на http://localhost:5173.

## Переменные окружения

`.env` в корне (не коммитится):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxxx
# опционально, нужны только для миграций/админ-скриптов локально
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxxxxxxxxxxxxxxxxx
SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_PROJECT_REF=xxxxxxxxxxxxxxxxxx
```

На Vercel задаются в **Project Settings → Environment Variables** (только две с префиксом `VITE_`, остальные не нужны в проде).

## Скрипты

- `npm run dev` — dev-сервер с HMR
- `npm run build` — production-сборка (`tsc -b && vite build`)
- `npm run lint` — ESLint
- `npm run preview` — локальный preview прод-сборки
- `npm run db:migrate` — прогнать `supabase/migrations/0001_init.sql` через Management API
- `npm run db:seed` — залить `supabase/seed.sql` (12 тестовых объектов)
- `npm run db:reset` — оба подряд (truncate + reseed)

Скриптам нужны `SUPABASE_ACCESS_TOKEN` + `SUPABASE_PROJECT_REF` в env. Альтернативно — `SUPABASE_DB_URL` (direct postgres).

## Что уже сделано

- [x] Vite + Tailwind + shadcn, alias `@/*`, premium-токены
- [x] Supabase: схема + RLS, триггер автосоздания profile, 12 seed-объектов, отключено email confirmation
- [x] Admin-аккаунт `a8485830@gmail.com` создан и промоутнут до `admin`
- [x] Live Auth-формы /login и /register с обработкой ошибок и редиректом
- [x] Header (бургер на мобайле), Footer, защищённые маршруты
- [x] Landing с hero, преимуществами, секцией featured (из БД), CTA
- [x] /catalog с фильтрами (search, type, deal, location, bedrooms, price min/max), URL-состояние
- [x] /property/:id — галерея с миниатюрами, характеристики, кнопка Save (избранное), форма заявки на просмотр
- [x] /account — табы Profile / Favorites / Requests, редактирование профиля, отмена заявок
- [x] /admin — CRUD объектов (только для роли admin)
- [x] Адаптив 375px+, тач-зоны 44px+, mobile-меню
- [x] vercel.json (SPA-rewrite на index.html)

## Структура

```
src/
  components/
    ui/         shadcn-компоненты (Button, Input, Card, Label, Textarea)
    layout/     Header, Footer, Container, AppLayout, ProtectedRoute
    property/   PropertyCard, Filters, Gallery, FavoriteButton, ViewingRequestForm
    account/    ProfileForm, FavoritesList, RequestsList
  pages/        Landing, Catalog, PropertyDetails, Login, Register, Account, Admin, NotFound
  lib/          supabase.ts, utils.ts
  hooks/        useAuth.ts, useProperties.ts, useFavorites.ts, useViewingRequests.ts, useAdminProperties.ts
  store/        authStore.ts
  types/        database.ts
  App.tsx, main.tsx, index.css

supabase/
  migrations/0001_init.sql   # схема + RLS + триггеры
  seed.sql                   # 12 объектов
  promote_admin.sql          # выдать admin по email
  README.md                  # инструкция запуска SQL

scripts/
  run-sql.ts                 # запуск SQL через Management API или прямой Postgres
```

## Премиум-палитра

- Фон светлый: `#FAFAF7` (bone), тёмный: `#0A0A0A` (ink)
- Текст: `#1A1A1A` / `#E5E5E5`
- Акцент: `#C9A961` (gold)
- Шрифты: Playfair Display (display) · Inter (sans), оба грузятся из Google Fonts с дисплеем `swap`

## Тестовый админ-вход

- email: `a8485830@gmail.com`
- password: `NovereDev2026!`

⚠️ Смени пароль в /account → Profile или через Supabase Dashboard после первого входа.

## Деплой на Vercel

1. Запушить репозиторий в GitHub (приватный или публичный):
   ```bash
   git init && git add . && git commit -m "init"
   gh repo create novere --private --source=. --push
   ```
2. https://vercel.com/new → Import GitHub repo → выбрать `novere`.
3. Framework Preset определится как **Vite** автоматически.
4. **Environment Variables** → добавить:
   - `VITE_SUPABASE_URL` = `https://tpjfttmcsewbzrsgarsa.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = твой publishable key
5. **Deploy**.
6. После деплоя — скопировать прод-URL и:
   - в Supabase Dashboard → Authentication → URL Configuration: вписать в **Site URL** прод-URL Vercel
   - в **Redirect URLs** добавить тот же прод-URL и `https://your-deploy-*.vercel.app/**`

`vercel.json` уже настроен с SPA-rewrite — все маршруты отдадут `index.html`.

## Безопасность

- `.env` в `.gitignore`
- `service_role` и `personal access token` Supabase **никогда** не должны попадать на фронт или в публичный репозиторий. На Vercel задаются только `VITE_*` ключи.
- После окончания разработки **обязательно** ротировать секретный ключ Supabase (Project Settings → API → Secret keys → Rotate).
- RLS-политики настроены так, что:
  - profiles: юзер видит/правит только свой; admin видит все
  - properties: публичное чтение; пишет только admin
  - favorites/viewing_requests: юзер видит/правит только свои; admin видит viewing_requests всех

## Что НЕ доделано (вне рамок ТЗ)

- Загрузка картинок через Supabase Storage (сейчас админ вставляет URL вручную)
- Подписки для девелоперов (Basic/Pro/Enterprise) и платное приоритетное размещение
- Real-time уведомления о смене статуса заявки
- Поиск по геокарте
