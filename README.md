# Лендинг услуг — Next.js + shadcn/ui + Tailwind

Стартер продающего лендинга для сферы услуг с гео-SEO под Узбекистан.
Весь контент, контакты и семантика живут в одном файле — `src/lib/site.config.ts`.

## Запуск

```bash
npm install
cp .env.example .env.local   # задайте NEXT_PUBLIC_SITE_URL
npm run dev
```

Сборка: `npm run build`, проверка кода: `npm run lint`.

## Что настроить перед запуском

1. **`src/lib/site.config.ts`** — название, оффер, телефоны, адрес с координатами, услуги и цены,
   тарифы, кейсы, отзывы, FAQ и список городов. Это единственное место, которое нужно менять
   для смены ниши: страницы, микроразметка, sitemap и мета-теги перестроятся сами.
2. **`.env.local`**
   - `NEXT_PUBLIC_SITE_URL` — боевой домен. Попадает в canonical, sitemap и schema.org.
   - `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` — заявки приходят в Telegram.
     Без них заявка пишется в лог сервера.
   - `NEXT_PUBLIC_YANDEX_VERIFICATION`, `NEXT_PUBLIC_GOOGLE_VERIFICATION` — коды из вебмастеров.
   - `NEXT_PUBLIC_YM_ID` — счётчик Яндекс Метрики, подключается только если задан.
3. **Цвета и шрифты** — `src/app/globals.css`, блок `:root`.
   Палитра построена на синей майолике и бирюзе; поменяйте пять значений — сменится весь сайт.

## Структура

```
src/
  app/
    layout.tsx              мета-теги, шрифты, Organization + WebSite в JSON-LD
    page.tsx                главная: услуги, кейсы, тарифы, FAQ, формы
    uslugi/[city]/page.tsx  гео-страницы, по одной на город из конфига
    actions/lead.ts         приём заявки (Telegram или лог)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx
  components/
    sections/               блоки лендинга
    ui/                     shadcn/ui
    lead-form.tsx           форма заявки с валидацией и защитой от ботов
  lib/
    site.config.ts          весь контент и SEO
    seo.ts                  сборка мета-тегов и canonical
    schema.ts               микроразметка schema.org
```

## Что сделано для поиска

- **Мета-теги**: уникальные title и description на каждой странице, canonical, hreflang,
  Open Graph и Twitter-карточки, генерируемая картинка `/opengraph-image`.
- **Микроразметка** одним `@graph`: `Organization` + `ProfessionalService` с адресом, координатами,
  часами работы и рейтингом; `Service` на каждую услугу с ценой; `FAQPage`; `Review`;
  `BreadcrumbList`; на гео-страницах — `ProfessionalService` с координатами города.
  Это то, что даёт расширенный сниппет и карточку организации в выдаче.
- **Гео-страницы** `/uslugi/[city]` на каждый город из конфига: свой H1, title, description,
  уникальный текст, районы и координаты. Генерируются статически при сборке.
- **Техническое**: `sitemap.xml` с приоритетами, `robots.txt` с секцией для Яндекса и `Host`,
  гео-мета-теги (`geo.region`, `geo.position`, `ICBM`), корректный `lang`, манифест.
- **Скорость**: статическая генерация всех страниц, серверные компоненты, шрифты через
  `next/font` без внешних запросов, ноль сторонних JS-библиотек на странице.

## Добавить город

Допишите объект в `site.cities` — появится страница `/uslugi/<slug>`, ссылка в блоке «Города»,
запись в sitemap и микроразметка с координатами. `inCity` и `ofCity` нужны для падежей в текстах.

## Подключить CRM вместо Telegram

Добавьте свой запрос в `src/app/actions/lead.ts` рядом с отправкой в Telegram — форма уже
валидирует данные, отсекает ботов скрытым полем и показывает состояния загрузки и ошибки.
