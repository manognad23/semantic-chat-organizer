# Chat Organizer

A production-quality web application that organizes pasted conversations into semantic blocks and enables instant search through them. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Overview

Chat Organizer takes raw conversation text (e.g., User/Assistant format), parses it into message pairs, categorizes them by topic using keyword heuristics, and displays them in beautiful semantic blocks. Users can search across all blocks with live filtering and highlighted matches.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui-style components, Lucide icons, Framer Motion
- **Backend**: Next.js API routes (Node.js runtime)
- **State & Persistence**: LocalStorage (blocks persist after refresh)
- **Deployment**: Vercel-ready

## Features

- **Chat Input**: Large centered text area with example placeholder, "Ingest & Organize" button, error handling, loading state with animated text
- **Semantic Organization**: Parses User/Assistant format, groups into 4–5 blocks (Pricing Strategy, Competitor Analysis, Sales Team, Free Trial, General)
- **Search**: Live filtering, highlighted matches, "No results found" state
- **UI/UX**: Glassmorphism cards, gradient backgrounds, soft shadows, Framer Motion animations, responsive design

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable        | Required | Description                                      |
|----------------|----------|--------------------------------------------------|
| `USE_AI`       | No       | Set to `true` for OpenAI categorization (default: `false`) |
| `OPENAI_API_KEY` | Only if USE_AI=true | Your OpenAI API key                    |

## Project Structure

```
/app
  layout.tsx
  page.tsx
  globals.css
  /api
    /organize
      route.ts
/components
  Header.tsx
  Footer.tsx
  ChatInput.tsx
  BlockCard.tsx
  SearchBar.tsx
  LoadingState.tsx
  EmptyState.tsx
  /ui
    button.tsx
    input.tsx
    textarea.tsx
/lib
  parser.ts      # Conversation parsing
  categorizer.ts # Semantic categorization
  utils.ts
/types
  chat.ts
/hooks
  useLocalStorage.ts
```

## Approach

1. **Parsing**: Regex-based parsing handles `User:`/`Assistant:`, `Human:`/`AI:`, `Q:`/`A:` formats. Falls back to double-newline splitting for plain text.
2. **Categorization**: Keyword heuristics score each message pair against predefined categories (pricing, competitors, sales, trial). Pairs are grouped into blocks (max 5).
3. **Search**: Client-side filtering with substring match; matching text is highlighted in results.
4. **Persistence**: Blocks stored in `localStorage` and restored on page load.

## Time Spent

- Project setup & config: ~15 min
- Types, parser, categorizer: ~25 min
- API route: ~10 min
- UI components: ~35 min
- Main page & state: ~20 min
- Polish, README, testing: ~15 min  
**Total: ~2 hours**

## Future Improvements

- [ ] OpenAI-powered categorization when `USE_AI=true`
- [ ] Export blocks to JSON/Markdown
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Block reordering / merging
- [ ] Conversation history (multiple sessions)

## License

MIT
