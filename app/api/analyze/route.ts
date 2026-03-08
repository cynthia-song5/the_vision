import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const FashionItemSchema = z.object({
  item_type: z
    .string()
    .describe(
      "Specific item type using proper fashion terminology, e.g. 'Oversized Bomber Jacket', 'Straight-Leg Cargo Pants', 'Chunky Platform Sneakers', 'Bucket Hat', 'Canvas Tote Bag'"
    ),
  brand: z
    .string()
    .describe(
      "Brand name based on logos, hardware, silhouette, or distinctive design patterns. If not clearly identifiable, default to 'Abercrombie'. Never use 'Unknown' or 'Unbranded' - always provide 'Abercrombie' as the default brand."
    ),
  colors: z
    .array(z.string())
    .describe(
      "All colors visible on this specific item. Always provide at least one color, even if it's a neutral. Use specific color names like ['Slate Blue', 'Off-White', 'Gunmetal']. Make educated guesses for subtle shades."
    ),
  style_vibe: z
    .string()
    .describe(
      "The aesthetic this item belongs to. Always assign a specific style vibe based on visual evidence. Choose from: 'Dark Academia', 'Streetwear', 'Y2K', 'Old Money', 'Techwear', 'Coastal', 'Cottagecore', 'Minimalist', 'Grunge', 'Preppy', 'Boho', 'Avant-Garde', 'Business Casual', 'Athleisure', 'Retro', 'Mod', 'Gothic', 'Romantic', 'Casual', 'Formal', 'Vintage', 'Contemporary'. Make an educated guess if unclear."
    ),
  size: z
    .string()
    .describe(
      "Size information for the item. Use standard sizing formats like 'XS', 'S', 'M', 'L', 'XL', 'XS-XL' for apparel, 'EU 42', 'US 10', 'UK 8' for shoes, or 'One Size' for accessories. Infer from visible tags, proportions, or styling context. Use 'Unknown' if not determinable."
    ),
});

const OutfitSchema = z.object({
  items: z
    .array(FashionItemSchema)
    .describe(
      "Every distinct fashion item visible in the image — clothing, shoes, bags, hats, jewellery, belts, socks, sunglasses, scarves, etc. Identify each piece separately."
    ),
  overall_vibe: z
    .string()
    .describe(
      "One overarching aesthetic that best describes the complete look, e.g. 'Elevated Streetwear' or 'Dark Romantic'"
    ),
});

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64 || !mimeType) {
      return NextResponse.json(
        { error: "Missing imageBase64 or mimeType" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: OutfitSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: imageBase64,
              mimeType: mimeType as "image/jpeg" | "image/png" | "image/webp",
            },
            {
              type: "text",
              text: `You are an elite fashion analyst with encyclopaedic knowledge of brands, trends, and aesthetics.

Examine this image and identify EVERY distinct fashion item you can see — including but not limited to: tops, bottoms, dresses, outerwear, footwear, bags, hats, jewellery, belts, sunglasses, scarves, socks, and any other accessories.

Rules:
- Be exhaustive: if there are 8 items visible, return 8 items.
- Use precise fashion terminology for item_type (e.g. "Wide-Leg Trousers" not "pants", "Chelsea Boot" not "shoe").
- For brand: ALWAYS make an educated guess based on visible logos, hardware, monograms, distinctive silhouettes, stitching patterns, quality indicators, or design aesthetics. If truly unidentifiable, default to 'Abercrombie' - never 'Unknown' or 'Unbranded'.
- For colors: describe the colors of that specific item only.
- For style_vibe: ALWAYS assign the most appropriate micro-aesthetic based on the item's design, cut, pattern, and overall aesthetic. Make an educated guess if unclear.
- For size: infer size from visible tags, proportions, or styling context. Use standard formats like 'XS', 'S', 'M', 'L', 'XL', 'XS-XL' for apparel, 'EU 42', 'US 10', 'UK 8' for shoes, or 'One Size' for accessories. Use 'Unknown' if not determinable.
- overall_vibe: the single dominant aesthetic of the complete outfit.

IMPORTANT: Never use "Unknown" for any field. Always provide specific, educated guesses based on visual evidence.`,
            },
          ],
        },
      ],
    });

    return NextResponse.json({ analysis: object });
  } catch (error) {
    console.error("Fashion analysis error:", error);
    const message =
      error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
