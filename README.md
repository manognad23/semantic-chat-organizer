# Chat Organizer

A production-quality web application that organizes pasted conversations into semantic blocks and enables instant search through them. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.
https://semantic-chat-organizer-xp7n.vercel.app/

## Overview

Chat Organizer takes raw conversation text (e.g., User/Assistant format), parses it into message pairs, categorizes them by topic using keyword heuristics, and displays them in structured semantic blocks. Users can search across all blocks with live filtering and highlighted matches. Blocks persist using localStorage.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, custom UI components, Framer Motion
- **Backend**: Next.js API routes (Node.js runtime)
- **State & Persistence**: LocalStorage (blocks persist after refresh)
- **Deployment**: Vercel

## Features

- **Chat Input**: Large centered text area with example placeholder, "Ingest & Organize" button, error handling, loading state with animated text
- **Semantic Organization**: Parses User/Assistant format, groups into 4–5 blocks (Pricing Strategy, Competitor Analysis, Sales Team, Free Trial, General)
- **Search**: Live filtering, highlighted matches, "No results found" state
- **UI/UX**: Background animations, theme toggle (light/dark), Framer Motion transitions, responsive design
- **Persistence**: Blocks stored in `localStorage` and restored on page load

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000

## Environment Variables

The application works without environment variables by default.

Optional AI-based categorization support:

| Variable | Required | Description |
|----------|----------|------------|
| `USE_AI` | No | Set to `true` to enable AI-based categorization |
| `OPENAI_API_KEY` | Only if USE_AI=true | Your OpenAI API key |

If not configured, the app defaults to deterministic keyword-based categorization.

## Project Structure

```
Tector_Manu/
│
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── organize/
│           └── route.ts
│
├── components/
│   ├── BackgroundAnimation.tsx
│   ├── BlockCard.tsx
│   ├── ChatInput.tsx
│   ├── EmptyState.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LandingPage.tsx
│   ├── LoadingState.tsx
│   ├── Pipeline.tsx
│   ├── PipelineStep.tsx
│   ├── SearchBar.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       └── textarea.tsx
│
├── hooks/
│   └── useLocalStorage.ts
│
├── lib/
│   ├── parser.ts
│   ├── categorizer.ts
│   ├── categorizer-ai.ts
│   └── utils.ts
│
├── types/
│
├── .env.local.example
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

## Approach

1. **Parsing**: Regex-based parsing handles `User:`/`Assistant:`, `Human:`/`AI:`, `Q:`/`A:` formats. Falls back to double-newline splitting for plain text.

2. **Categorization**: Keyword heuristics score each message pair against predefined categories (pricing, competitors, sales, trial). Pairs are grouped into blocks (max 5). AI-based categorization is supported via a separate module.

3. **Search**: Client-side filtering with substring match; matching text is highlighted in results.

4. **Persistence**: Blocks stored in `localStorage` and restored on page load.

## Time Spent

- Project setup & config: ~15 min  
- Types, parser, categorizer: ~25 min  
- API route: ~10 min  
- UI components & animations: ~35 min  
- Main page & state: ~20 min  
- Polish, testing: ~15 min  

**Total: ~2 hours**

## Future Improvements

- [ ] Smarter semantic clustering (embedding-based grouping)  
- [ ] Dynamic AI-generated categories  
- [ ] Export blocks to JSON/Markdown  
- [ ] Block reordering / merging  
- [ ] Conversation history (multiple sessions)

## License
 
© 2026 Manogna Shree Dasari – IIIT Sri City
