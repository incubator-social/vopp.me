[Start build]
   │
   │ 1) Импорт модуля app/legal/[type]/page.tsx
   │
   ├─▶ 2) Читает экспорт:
   │      export const dynamic = 'force-static'
   │      → страница должна быть сгенерирована статически
   │
   ├─▶ 3) Вызывает generateStaticParams()
   │      → возвращает [{ type: 'terms' }, { type: 'privacy' }]
   │
   ├─▶ 4) Для каждого type:
   │      ┌───────────────────────────────────────────────┐
   │      │ a) Рендерит Page({ params: { type } })        │
   │      │    • внутри Page() вызывается readHtml(type)  │
   │      │    • читает файл: src/shared/content/legal/   │
   │      │      └── terms.html / privacy.html            │
   │      │    • если файла нет → notFound() → 404 HTML   │
   │      └───────────────────────────────────────────────┘
   │
   ├─▶ 5) Складывает результат в .next/ (статические артефакты):
   │      • /legal/terms/index.html
   │      • /legal/privacy/index.html
   │      • бандл JS/CSS, спрайт иконок/инлайн SVG
   │
[Build done]
Рантайм (production / dev)
[Запрос: GET /legal/terms]
   │
   ├─▶ 1) Next проверяет: страница статическая? Да.
   │
   ├─▶ 2) Отдаёт готовый HTML (+ нужные ассеты)
   │
   └─▶ 3) Гидратация на клиенте (если есть интерактив)
