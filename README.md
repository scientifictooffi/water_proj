# Капля — SDG 6: чистая вода и санитария

Интерактивная новелла «Один день с лимитом 10 литров» + evidence-based справочник по Цели устойчивого развития 6.

## Запуск

```bash
npm install
npm run dev
```

## Структура

- `src/data/scenario.ts` — граф сценария: сцены, выборы, стоимость в литрах, концовки.
- `src/data/facts.ts` — факты с источниками, водный след, задачи SDG 6.
- `src/data/media.ts` — видеоматериалы.
- `src/data/actions.ts` — привычки, организации, челлендж.
- `src/store/game.ts` — состояние игры (Zustand).
- `src/pages/*` — страницы: Home, Play, Problem, Media, Act, About.

Чтобы изменить сюжет, редактируйте только `scenario.ts`.
