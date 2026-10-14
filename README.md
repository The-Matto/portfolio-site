# Portfolio

My personal portfolio site, styled after Tokyo train station signage. Single page, with a station nameboard and LED departure board up top, projects laid out as stations on a Web line and a Game Dev line, a carousel that handles screenshots and YouTube clips the same way, and a modal for anything with more to say than fits in the summary panel.

Projects live in `src/react-app/data/projects-data.tsx`. Each one is put on a line and given a station code (W01, G02...) automatically from its tags, in `src/react-app/data/transit-lines.ts`.

## Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Vite
- Hono, for a small API worker
- Headless UI + Heroicons
- Deployed on Cloudflare Workers

## Running it locally

```bash
npm install
npm run dev
```

Runs at [http://localhost:5173](http://localhost:5173).

## Build and deploy

```bash
npm run build
npm run deploy
```
