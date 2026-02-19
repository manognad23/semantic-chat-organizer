export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

export interface MessagePair {
  id: string;
  user: Message;
  assistant: Message;
}

export type BlockCategory =
  | "pricing_strategy"
  | "starting_price_points"
  | "competitor_analysis"
  | "sales_team"
  | "free_trial"
  | "general";

export interface SemanticBlock {
  id: string;
  category: BlockCategory;
  title: string;
  icon: string;
  color: string;
  messages: MessagePair[];
}

export const BLOCK_CATEGORIES: Record<
  BlockCategory,
  { title: string; icon: string; color: string }
> = {
  pricing_strategy: {
    title: "Pricing Strategy",
    icon: "DollarSign",
    color: "emerald",
  },
  starting_price_points: {
    title: "Starting Price Points",
    icon: "Tag",
    color: "indigo",
  },
  competitor_analysis: {
    title: "Competitor Analysis",
    icon: "BarChart3",
    color: "blue",
  },
  sales_team: {
    title: "Sales Team",
    icon: "Users",
    color: "violet",
  },
  free_trial: {
    title: "Free Trial",
    icon: "Gift",
    color: "amber",
  },
  general: {
    title: "General",
    icon: "MessageCircle",
    color: "slate",
  },
};
