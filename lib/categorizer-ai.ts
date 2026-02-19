import OpenAI from "openai";
import type { MessagePair, BlockCategory, SemanticBlock } from "@/types/chat";
import { BLOCK_CATEGORIES } from "@/types/chat";

const CATEGORIES: BlockCategory[] = [
  "pricing_strategy",
  "starting_price_points",
  "competitor_analysis",
  "sales_team",
  "free_trial",
  "general",
];

export async function categorizePairsWithAI(
  pairs: MessagePair[],
  apiKey: string
): Promise<SemanticBlock[]> {
  if (pairs.length === 0) return [];

  const openai = new OpenAI({ apiKey });

  const content = pairs
    .map(
      (p, i) =>
        `[${i}] User: ${p.user.content}\nAssistant: ${p.assistant.content}`
    )
    .join("\n\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You categorize conversation message pairs into one of these categories: pricing_strategy, starting_price_points, competitor_analysis, sales_team, free_trial, general. Respond with a JSON array of category names, one per pair, in order. Example: ["pricing_strategy","starting_price_points","competitor_analysis"]`,
      },
      {
        role: "user",
        content,
      },
    ],
    temperature: 0.2,
  });

  const text = response.choices[0]?.message?.content?.trim();
  if (!text) throw new Error("No response from AI");

  let categories: string[];
  try {
    const parsed = JSON.parse(text.replace(/```json?\s*|\s*```/g, ""));
    categories = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    throw new Error("Invalid AI response format");
  }

  const blocksByCategory = new Map<BlockCategory, MessagePair[]>();

  pairs.forEach((pair, i) => {
    const cat = (CATEGORIES.includes(categories[i] as BlockCategory)
      ? categories[i]
      : "general") as BlockCategory;
    const list = blocksByCategory.get(cat) || [];
    list.push(pair);
    blocksByCategory.set(cat, list);
  });

  const blockOrder: BlockCategory[] = [
    "pricing_strategy",
    "starting_price_points",
    "competitor_analysis",
    "free_trial",
    "sales_team",
    "general",
  ];

  const blocks: SemanticBlock[] = [];
  let blockId = 0;

  for (const cat of blockOrder) {
    const messages = blocksByCategory.get(cat);
    if (messages && messages.length > 0) {
      const meta = BLOCK_CATEGORIES[cat];
      blocks.push({
        id: `block-${blockId++}`,
        category: cat,
        title: meta.title,
        icon: meta.icon,
        color: meta.color,
        messages,
      });
      if (blocks.length >= 5) break;
    }
  }

  return blocks;
}
