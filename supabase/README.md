# Supabase setup

Этап 2 ТЗ. Три SQL-файла прогоняются в **Supabase → SQL Editor → New query → Run** в указанном порядке.

## 1. Создать проект

1. https://supabase.com/dashboard → **New project**
2. Имя `novere`, регион поближе (например, Frankfurt), пароль БД — любой надёжный.
3. Дождаться, когда проект развернётся (1–2 мин).

## 2. Запустить миграцию схемы

Открой `migrations/0001_init.sql`, скопируй всё содержимое в SQL Editor → **Run**.

Создаёт:
- 4 таблицы: `profiles`, `properties`, `favorites`, `viewing_requests`
- Индексы по часто запрашиваемым столбцам
- Хелпер `public.is_admin()` (security definer, чтобы политики не зацикливались на profiles)
- Триггер `on_auth_user_created` — на каждого нового пользователя в `auth.users` автосоздаётся запись в `public.profiles` с `role = 'client'`
- RLS-политики:
  - `profiles`: юзер видит/правит только свой; админ видит все
  - `properties`: публично читаются; пишет только admin
  - `favorites`: только свои (select/insert/delete)
  - `viewing_requests`: юзер видит/создаёт/удаляет свои; админ видит всё и меняет статус

Файл идемпотентный — можно перезапустить, политики дропаются и пересоздаются.

## 3. Загрузить тестовые объекты

Открой `seed.sql`, скопируй в SQL Editor → **Run**.

Вставляет 12 объектов: 4 виллы, 4 пентхауса, 4 апартамента; локации Geneva / Monaco / Dubai / Saint-Tropez / Lake Como; 3 помечены `featured = true`; фото с Unsplash CDN.

⚠️ Файл делает `truncate table public.properties restart identity cascade` перед вставкой — на проде не запускать.

## 4. Получить ключи API

В проекте → **Settings → API**:
- `Project URL` (вид `https://xxxxx.supabase.co`)
- `anon` / `public` ключ (длинный JWT)

Прописать в корневой `.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

## 5. Создать админ-аккаунт

1. `npm run dev` → открой `/register` и зарегистрируй пользователя с email `a8485830@gmail.com` (или другим — но тогда поправь email в `promote_admin.sql`).
2. В Supabase отключи email-confirmation (на дев-стенде): **Authentication → Providers → Email** → сними галку «Confirm email».
3. Открой `promote_admin.sql`, при необходимости поменяй email, → **Run**.
4. Перезайди в приложении — в шапке появится ссылка «Admin».

## Структура

```
supabase/
  migrations/
    0001_init.sql       # схема + RLS + триггеры
  seed.sql              # тестовые объекты
  promote_admin.sql     # выдать роль admin по email
  README.md             # эта инструкция
```
