# Marrioni Design - Landing Page

Премиальный лендинг для компании Marrioni Design с админ-панелью для управления контентом.

## Технологии

- **Frontend**: Next.js 15, React, TypeScript
- **Стили**: Tailwind CSS, shadcn/ui
- **База данных**: PostgreSQL + TypeORM
- **Аутентификация**: NextAuth.js v5

## Структура проекта

```
src/
├── app/
│   ├── admin/           # Админ-панель
│   │   ├── products/    # Управление продукцией
│   │   ├── dealers/     # Управление дилерами
│   │   ├── contacts/    # Просмотр заявок
│   │   └── login/       # Страница входа
│   ├── api/             # API endpoints
│   └── page.tsx         # Главная страница
├── components/
│   ├── admin/           # Компоненты админки
│   ├── layout/          # Header, Footer
│   ├── sections/        # Секции лендинга
│   └── ui/              # shadcn/ui компоненты
└── lib/
    ├── db/              # TypeORM entities и конфигурация
    └── auth.ts          # NextAuth конфигурация
```

## Секции лендинга

1. **Hero** - Приветственный блок
2. **О компании** - Краткое описание
3. **Производство** - Фото и описание цеха
4. **Преимущества** - Основные преимущества продукции
5. **Почему выбирают** - Причины выбора Marrioni Design
6. **Каталог** - Продукция с фото и описанием
7. **Дилеры** - Партнёрская сеть
8. **Контакты** - Форма обратной связи
9. **Шапка и подвал**

## Установка и запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

Создайте файл `.env.local`:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/marrioni

# Auth
AUTH_SECRET=your-super-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Admin credentials
ADMIN_EMAIL=admin@marrioni.com
ADMIN_PASSWORD=admin123
```

### 3. Запуск PostgreSQL

```bash
# Через Docker
docker run --name marrioni-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=marrioni -p 5432:5432 -d postgres

# Или используйте локальную установку PostgreSQL
```

### 4. Запуск приложения

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### 5. Создание администратора

После первого запуска выполните POST запрос:

```bash
curl -X POST http://localhost:3000/api/auth/setup
```

Или откройте в браузере Postman/Insomnia и отправьте POST на этот URL.

## Админ-панель

Доступна по адресу: [http://localhost:3000/admin](http://localhost:3000/admin)

**Учётные данные по умолчанию:**
- Email: admin@marrioni.com
- Пароль: admin123

### Функционал админки

- **Продукция**: Добавление, редактирование, удаление товаров
- **Дилеры**: Управление партнёрской сетью
- **Заявки**: Просмотр обращений от клиентов

## Производство

```bash
npm run build
npm start
```

## Лицензия

MIT
