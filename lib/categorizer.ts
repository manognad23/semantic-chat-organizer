import type { MessagePair, BlockCategory, SemanticBlock } from "@/types/chat";
import { BLOCK_CATEGORIES } from "@/types/chat";

const KEYWORD_MAP: Record<BlockCategory, string[]> = {
  pricing_strategy: [
    "pricing strategy",
    "value-based pricing",
    "pricing model",
    "pricing models",
    "tiers",
    "tiered pricing",
    "plans",
    "plan structure",
    "pricing tiers",
    "monetization",
  ],
  starting_price_points: [
    "starting price",
    "starting prices",
    "price point",
    "price points",
    "$",
    "/month",
    "per month",
    "range from",
    "range between",
    "29/month",
    "99/month",
    "ltv:cac",
    "ltv:cac ratio",
  ],
  competitor_analysis: [
    "competitor",
    "competition",
    "market",
    "similar",
    "analysis",
    "compare",
    "vs",
    "alternative",
    "benchmark",
  ],
  sales_team: [
    "sales",
    "hire",
    "team",
    "account executive",
    "sdr",
    "bdr",
    "rep",
    "quota",
    "commission",
  ],
  free_trial: [
    "trial",
    "freemium",
    "free",
    "demo",
    "onboarding",
    "signup",
  ],
  general: [],
};

const MAX_BLOCKS = 5;

function scorePairForCategory(pair: MessagePair, category: BlockCategory): number {
  if (category === "general") return 0;

  const keywords = KEYWORD_MAP[category];
  const combinedText = `${pair.user.content} ${pair.assistant.content}`.toLowerCase();
  let score = 0;

  for (const keyword of keywords) {
    if (combinedText.includes(keyword)) {
      score += 1;
      if (combinedText.includes(` ${keyword} `) || combinedText.startsWith(`${keyword} `)) {
        score += 0.5;
      }
    }
  }

  return score;
}

function assignCategory(pair: MessagePair): BlockCategory {
  let bestCategory: BlockCategory = "general";
  let bestScore = 0;

  const categories: BlockCategory[] = [
    // More specific pricing category first so it can “steal”
    // pure number / range questions from broad pricing strategy
    "starting_price_points",
    "pricing_strategy",
    "competitor_analysis",
    "sales_team",
    "free_trial",
  ];

  for (const cat of categories) {
    const score = scorePairForCategory(pair, cat);
    if (score > bestScore) {
      bestScore = score;
      bestCategory = cat;
    }
  }

  return bestCategory;
}

/**
 * Groups message pairs into semantic blocks (max 4-5 blocks).
 */
export function categorizePairs(pairs: MessagePair[]): SemanticBlock[] {
  if (pairs.length === 0) return [];

  const assigned = pairs.map((pair) => ({
    pair,
    category: assignCategory(pair),
  }));

  const blocksByCategory = new Map<BlockCategory, MessagePair[]>();

  for (const { pair, category } of assigned) {
    const list = blocksByCategory.get(category) || [];
    list.push(pair);
    blocksByCategory.set(category, list);
  }

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

      if (blocks.length >= MAX_BLOCKS) break;
    }
  }

  return blocks;
}
