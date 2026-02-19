import type { MessagePair } from "@/types/chat";

const MAX_INPUT_LENGTH = 100_000;

const USER_PREFIXES = /^(?:User|Human|Q|Question)\s*[:：]\s*/i;
const ASSISTANT_PREFIXES = /^(?:Assistant|AI|Bot|A)\s*[:：]\s*/i;

/**
 * Parses raw conversation text into message pairs (User / Assistant).
 */
export function parseConversation(text: string): MessagePair[] {
  if (!text || typeof text !== "string") return [];
  const trimmed = text.trim();
  if (trimmed.length === 0) return [];
  if (trimmed.length > MAX_INPUT_LENGTH) {
    throw new Error(
      "Input text exceeds maximum allowed length (100,000 characters)"
    );
  }

  const normalized = trimmed.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const pairs: MessagePair[] = [];
  let pairId = 0;

  // Split by lines that start with User: or Assistant:
  const lines = normalized.split(/\n(?=(?:User|Human|Q|Question|Assistant|AI|Bot|A)\s*[:：])/i);

  let currentUser = "";
  let currentAssistant = "";

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (USER_PREFIXES.test(trimmedLine)) {
      if (currentUser) {
        pairs.push(createPair(pairId++, currentUser, currentAssistant));
        currentAssistant = "";
      }
      currentUser = trimmedLine.replace(USER_PREFIXES, "").trim();
    } else if (ASSISTANT_PREFIXES.test(trimmedLine)) {
      currentAssistant = trimmedLine.replace(ASSISTANT_PREFIXES, "").trim();
      if (currentUser) {
        pairs.push(createPair(pairId++, currentUser, currentAssistant));
        currentUser = "";
        currentAssistant = "";
      }
    } else {
      if (currentUser && !currentAssistant) {
        currentAssistant = trimmedLine;
      } else if (currentUser && currentAssistant) {
        currentAssistant += "\n" + trimmedLine;
      } else if (!currentUser) {
        currentUser = trimmedLine;
      }
    }
  }

  if (currentUser) {
    pairs.push(createPair(pairId++, currentUser, currentAssistant));
  }

  if (pairs.length === 0) {
    const segments = normalized.split(/\n\n+/).filter((s) => s.trim());
    for (let i = 0; i < segments.length - 1; i += 2) {
      const userContent = segments[i].trim();
      const assistantContent = segments[i + 1]?.trim() || "";
      if (userContent) {
        pairs.push(createPair(pairId++, userContent, assistantContent));
      }
    }
  }

  return pairs;
}

function createPair(
  id: number,
  userContent: string,
  assistantContent: string
): MessagePair {
  return {
    id: `pair-${id}`,
    user: {
      id: `user-${id}`,
      role: "user",
      content: userContent,
    },
    assistant: {
      id: `assistant-${id}`,
      role: "assistant",
      content: assistantContent,
    },
  };
}
