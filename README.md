# The Vision — AI Fashion Discovery Platform

A comprehensive fashion discovery platform powered by Next.js 15 and OpenAI GPT-4o, featuring AI-powered analysis, visual search, community features, and an inspiration feed.

Upload fashion photos to receive structured AI-generated tags, discover matching outfits, explore community styles, and get inspired by curated fashion content.

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
| 3D Animation | Three.js (landing page) |
| Database | JSON-based outfit and community data |

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

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) to visit the application.

---

## Pages & Features

### 3D Landing Page (/)
Interactive 3D star animation with navigation to main features.

### Share Your Vision (/share)
Upload fashion photos and get AI-powered analysis with detailed item identification:
- Item type, brand, colors, style vibe, and size for each piece
- Comprehensive outfit analysis with confidence scores
- Structured data output for fashion items

### Find Your Vision (/find-vision)
Upload a fashion item to discover matching outfits from our curated database:
- Visual similarity matching based on style, colors, and aesthetic
- Dynamic database of curated outfits
- Match scoring and recommendation system

### Inspiration Feed (/feed)
Browse and save fashion inspiration from the community:
- Community-generated fashion posts
- Save functionality for bookmarking favorite looks
- Clean, minimalist feed design

### Communities (/communities)
Explore fashion communities organized by:
- Location-based communities (NYC, LA, London, Paris)
- Event-based groups (Weddings, Galas, Festivals)
- Aesthetic communities (Minimalist, Streetwear, Vintage)

---

## Project Structure

```
the-vision/
├── app/
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts              # POST /api/analyze — OpenAI fashion analysis
│   │   ├── find-vision/
│   │   │   └── route.ts              # POST /api/find-vision — Visual search matching
│   │   └── database/
│   │       └── feed/
│   │           └── route.ts          # GET /api/database/feed — Community posts
│   ├── components/
│   │   ├── AnalysisCard.tsx          # AI analysis results display
│   │   ├── DropZone.tsx              # Drag-and-drop upload zone
│   │   ├── Navigation.tsx            # Site navigation component
│   │   ├── PostCard.tsx              # Feed post cards
│   │   ├── PostDetail.tsx            # Individual post view
│   │   └── ScanningOverlay.tsx       # Loading animation overlay
│   ├── database/
│   │   └── outfits/                  # Curated outfit database (JSON)
│   ├── feed/
│   │   └── page.tsx                  # Inspiration feed page
│   ├── share/
│   │   └── page.tsx                  # Share Your Vision page
│   ├── find-vision/
│   │   └── page.tsx                  # Find Your Vision page
│   ├── communities/
│   │   ├── page.tsx                  # Communities listing page
│   │   └── [id]/
│   │       └── page.tsx              # Individual community page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                      # 3D landing page
├── public/
│   └── database/
│       ├── outfits/                  # Outfit images
│       └── communities/              # Community post images
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
    "items": [
      {
        "item_type": "Midi Skirt",
        "brand": "Unknown",
        "colors": ["Ivory", "Cream"],
        "style_vibe": "Old Money",
        "size": "M"
      }
    ],
    "overall_vibe": "Elegant Business Casual"
  }
}
```

### POST `/api/find-vision`

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
  "uploadedAnalysis": {
    "items": [...],
    "overall_vibe": "Casual Chic"
  },
  "matches": [
    {
      "id": "outfit-005",
      "image": "/database/outfits/outfit-005.JPG",
      "items": [...],
      "overall_vibe": "Minimalist Professional",
      "matchScore": 0.85
    }
  ]
}
```

### GET `/api/database/feed`

**Response:**
```json
{
  "posts": [
    {
      "id": "post-001",
      "username": "fashionista",
      "userAvatar": "/avatars/user1.jpg",
      "image": "/database/outfits/outfit-001.jpg",
      "caption": "Minimalist monday vibes",
      "likes": 42,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Design System

- **Typography:** Consistent lowercase text across all pages
  - Headings: `text-4xl font-bold` (main), `text-lg font-bold` (subheadings)
  - Body: `text-lg font-medium` (primary), `text-base font-normal` (secondary)
  - Labels/Buttons: `text-sm font-medium`
- **Fonts:** Playfair Display (display/headings) + DM Sans (body)
- **Palette:** Monochromatic black and white theme
- **Aesthetic:** Clean, minimalist fashion platform with consistent typography

---

## Key Features

- **AI-Powered Analysis**: Detailed fashion item identification using GPT-4o
- **Visual Search**: Find similar outfits based on uploaded images
- **Community Features**: Browse and engage with fashion communities
- **Inspiration Feed**: Save and discover fashion inspiration
- **3D Landing Experience**: Interactive Three.js animation
- **Responsive Design**: Optimized for all device sizes
- **Consistent Typography**: Unified lowercase styling throughout

---

## Deployment

Deploy to Vercel in one click. Add `OPENAI_API_KEY` to your Vercel environment variables.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
