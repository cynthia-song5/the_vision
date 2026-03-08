# The Vision — AI Fashion Analysis

A polished MVP fashion tagging app powered by Next.js 15 and OpenAI GPT-4o.

Drop a photo of any fashion item and instantly receive structured AI-generated tags: item type, brand, color palette, style vibe, occasion, season, size, and confidence score.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + Google Fonts (Playfair Display + DM Sans) |
| AI | OpenAI GPT-4o via `@ai-sdk/openai` |
| Structured Output | Vercel AI SDK `generateObject` + Zod schema |
| Upload | `react-dropzone` |
| Icons | `lucide-react` |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API key:

```
OPENAI_API_KEY=your_key_here
```

Get a key at [OpenAI Platform](https://platform.openai.com/api-keys).

## Pages

### Share Your Vision (/)
Upload fashion photos and get AI-powered analysis with item type, brand, colors, style vibe, and size for each piece.

### Find Your Vision (/find-vision)
Upload a fashion item to discover matching outfits from our curated database based on shared attributes like style, colors, and aesthetic.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to visit **Share Your Vision** or [http://localhost:3000/find-vision](http://localhost:3000/find-vision) for **Find Your Vision**.

---

## Project Structure

```
the-vision/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # POST /api/analyze — OpenAI integration
│   ├── components/
│   │   ├── AnalysisCard.tsx      # Results display with color swatches
│   │   ├── ConfidenceMeter.tsx   # Animated confidence bar
│   │   ├── DropZone.tsx          # Drag-and-drop upload zone
│   │   └── ScanningOverlay.tsx   # Loading animation overlay
│   ├── lib/
│   │   └── types.ts              # TypeScript interfaces
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                  # Share Your Vision page
│   └── find-vision/
│       └── page.tsx              # Find Your Vision page
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## API Reference

### POST `/api/analyze`

**Request body:**
```json
{
  "imageBase64": "<base64 string>",
  "mimeType": "image/jpeg"
}
```

**Response:**
```json
{
  "analysis": {
    "item_type": "Midi Skirt",
    "brand": "Unknown",
    "colors": ["Ivory", "Cream"],
    "style_vibe": "Old Money",
    "confidence": 0.91,
    "occasion": "Business Casual",
    "season": "Spring/Summer",
    "tags": ["minimalist", "tailored", "elevated-basics"]
  }
}
```

---

## Design System

- **Fonts:** Playfair Display (headings) + DM Sans (body) + DM Mono (data)
- **Palette:** Ink scale (`#0D0D0D` → `#FAF8F5`) + Gold accent (`#C9A84C`)
- **Aesthetic:** Editorial fashion — refined whitespace, serif display type, subtle borders

---

## Deployment

Deploy to Vercel in one click. Add `GOOGLE_GENERATIVE_AI_API_KEY` to your Vercel environment variables.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
