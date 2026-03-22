# The Vision

Fashion discovery app: **upload & analyze outfits** with AI, **find similar looks**, browse an **inspiration feed** built from local images, and explore **communities** (demo data).

---

## Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS |
| Typography | **DM Sans** (Google Fonts, `app/layout.tsx`) |
| AI | OpenAI **GPT-4o** via `@ai-sdk/openai` + Vercel AI SDK `generateObject` + Zod |
| Upload | `react-dropzone` |
| Icons | `lucide-react` |
| Landing | Three.js (CDN on `/`) |
| Data | Feed: images under `public/database/feed/`. Communities / outfit JSON: `app/database/`. |

---

## Getting started

### 1. Install

```bash
npm install
```

### 2. Environment

Create **`.env.local`** in the project root (same folder as `package.json`). You can start from the template:

```bash
cp .env.example .env.local
```

Then set:

```bash
OPENAI_API_KEY=sk-...
```

Required for **`/api/analyze`** and **`/api/find-vision`**. Never commit `.env.local`.

### 3. Dev server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** (or the port Next prints if 3000 is in use).

```bash
npm run build   # production build
npm start       # production server
```

---

## Features & routes

| Route | What it does |
|--------|----------------|
| **`/`** | Starfield (Three.js) → navigate to feed, share, find, communities. |
| **`/share`** | Upload a photo → **`POST /api/analyze`** → structured items (type, brand, colors, vibe, size) + overall vibe. |
| **`/find-vision`** | Upload → vision analysis, then **curated match cards** (fixed set of looks + scores in the API response). |
| **`/feed`** | **`GET /api/database/feed`** builds posts from image files in `public/database/feed/`. |
| **`/communities`** | Lists communities; detail at **`/communities/[id]`** (demo content + JSON under `app/database/communities/`). |

---

## Data layout

- **`public/database/feed/`** — Drop JPG/PNG/WebP (etc.) here; the feed API turns each file into a post.
- **`public/database/outfits/`** — Images referenced by find-vision cards (e.g. `outfit-005.jpg`).
- **`public/database/communities/`** — Images for community posts.
- **`app/database/outfits/`** — Outfit JSON used as reference / future catalog wiring.
- **`app/database/communities/`** — One JSON file per community for local/demo data.

---

## API reference

### `POST /api/analyze`

Body: `{ "imageBase64": "<base64>", "mimeType": "image/jpeg" | "image/png" | "image/webp" }`  
Response: `{ "analysis": { "items": [...], "overall_vibe": "..." } }`

### `POST /api/find-vision`

Body: same shape as analyze.  
Response: `{ "uploadedAnalysis": { "items", "overall_vibe" }, "matches": [ { "id", "image", "items", "overall_vibe", "matchScore" }, ... ] }`

### `GET /api/database/feed`

Response: `{ "posts": [ { "id", "image", "username", "caption", "tags", "likeCount", "timestamp", "userAvatar" } ] }`  
(`timestamp` is ISO strings in JSON.)

---

## Project structure (high level)

```
app/
  api/analyze/          POST — OpenAI vision → structured outfit
  api/find-vision/      POST — analyze + return curated matches
  api/database/feed/    GET — posts from public/database/feed/
  components/           Navigation, PostCard, AnalysisCard, DropZone, …
  database/             outfits + communities JSON (reference / demos)
  feed/  share/  find-vision/  communities/
  lib/                  types, community-types, route-push helper
public/database/        feed images, outfit images, community images
```

---

## Design notes

- Lowercase UI copy in many places; shared button patterns via **`app/globals.css`** (e.g. `.btn-primary`, `.btn-outline`).
- **Do not commit** `node_modules`, **`.env.local`**, or **`.next`** — keep build output local.

---

## Deployment (e.g. Vercel)

Add **`OPENAI_API_KEY`** in the host’s environment variables. Ensure **`public/database/feed/`** (and other assets you need) are in the repo or provided another way, or the feed will be empty.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## Repo

**[github.com/cynthia-song5/the_vision](https://github.com/cynthia-song5/the_vision)**
