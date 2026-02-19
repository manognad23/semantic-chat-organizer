Chat Organizer

A production-quality web application that organizes pasted conversations into semantic blocks and enables instant search through them. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

Live Demo: https://semantic-chat-organizer-xp7n.vercel.app/

Overview

Chat Organizer takes raw conversation text (e.g., User/Assistant format), parses it into structured message pairs, categorizes them into meaningful semantic blocks using a deterministic scoring system, and displays them in an interactive UI.

Users can instantly search across organized blocks with live filtering and highlighted matches. The application maintains persistence using localStorage.

Tech Stack

Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS

UI Enhancements: Framer Motion, Custom UI components

Backend: Next.js API Routes

State & Persistence: React state + localStorage

Deployment: Vercel

Features

Landing Page & Theming

Background animations

Theme toggle (light/dark)

Clean responsive layout

Conversation Ingestion

Large input area

Supports formats:

User: / Assistant:

Human: / AI:

Q: / A:

Loading animation during processing

Semantic Organization

Regex-based parsing

Keyword-scored categorization

Grouping into up to 5 semantic blocks

Pipeline visualization of processing steps

Search

Live client-side filtering

Highlighted substring matches

Empty state handling

Persistence

Blocks stored in localStorage

Restored automatically on refresh

Setup
# Install dependencies
npm install

# Run development server
npm run dev

Open:

http://localhost:3000
Environment Variables

The application works without environment variables.

However, AI-based categorization support exists structurally.

To enable AI categorization (optional):

Create a file named .env.local

Add:

USE_AI=true
OPENAI_API_KEY=your_key_here

If not provided, the system defaults to deterministic keyword-based categorization.

Project Structure
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
Approach

Parsing Layer

Regex-based detection of structured conversation formats.

Each User–Assistant pair treated as one semantic unit.

Fallback to newline-based splitting when format is inconsistent.

Categorization Layer

Keyword scoring system across predefined themes:

Pricing Strategy

Competitor Analysis

Sales Team

Free Trial

General

Highest scoring category assigned to each pair.

Grouped into semantic blocks (maximum 5).

Search Layer

Client-side filtering.

Real-time matching.

Highlighting of matched text.

Persistence

Organized blocks stored in localStorage.

Automatically restored on page reload.

Time Spent

Setup & configuration – 15 min

Parser & categorization logic – 25 min

API route – 10 min

UI components & animations – 35 min

State management & persistence – 20 min

Testing & refinement – 15 min

Total: ~2 hours

Future Improvements

Embedding-based semantic clustering

Dynamic AI-generated categories

Export blocks (JSON / Markdown)

Conversation history tracking

Block reordering / merging

Improved scoring algorithm

License

MIT License

© 2026 Manogna Shree Dasari – IIIT Sri City
