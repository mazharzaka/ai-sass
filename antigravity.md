# Project Instructions for Google Antigravity

## Core Tech Stack
- Framework: Next.js (App Router)
- Database: MongoDB Atlas via Mongoose (Strictly MERN Stack approach)
- Canvas / Flow Editor: React Flow (@xyflow/react)
- Automation Engine: Stagehand & Browserbase
- Background Processing: Trigger.dev / Node.js
- Styling: Tailwind CSS & Shadcn UI

## General Rules & Guidelines
1. DO NOT rely solely on your pre-trained knowledge for Next.js, React Flow, or Stagehand APIs. Always inspect updated types and docs in `node_modules`.
2. Keep data dynamic: Store workflow graph states as flexible JSON schema within Mongoose models.
3. Ensure strict TypeScript type-checking across all action nodes, execution contexts, and API routes.
4. Follow standard Next.js App Router conventions (Server Components where appropriate, Client Components for interactive React Flow nodes).