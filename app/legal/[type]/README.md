flowchart TD

subgraph Build["next build"]
  A1[Start build] --> A2[Импорт app/legal/[type]/page.tsx]
  A2 --> A3[dynamic = 'force-static']
  A3 --> A4[Вызов generateStaticParams()]
  A4 -->|возвращает terms, privacy| A5{Для каждого type}
  A5 --> A6[Page({params})]
  A6 --> A7[readHtml(type) читает файл из content/legal]
  A7 -->|файл есть| A8[Генерация HTML]
  A7 -->|файла нет| A9[notFound() → 404]
  A8 --> A10[.next/legal/terms/index.html]
  A8 --> A11[.next/legal/privacy/index.html]
end

subgraph Runtime["Запрос в браузере"]
  R1[GET /legal/terms] --> R2{Статическая страница есть?}
  R2 -->|Да| R3[Отдаём готовый HTML из .next/]
  R2 -->|Нет| R4[404]
end

subgraph Errors["Ошибочные кейсы"]
  E1[/legal/unknown/] --> E2[Нет в generateStaticParams → 404]
  E3[Файл terms.html удалён] --> E4[readHtml → null → 404 при билде]
  E5[SVG не найден] --> E6[Module not found → ошибка сборки]
end
