# Discord-Style SSR Web Application

A professional Discord-inspired web application built with Next.js 15 App Router, demonstrating enterprise-grade architecture patterns for senior frontend roles in insurance technology.

## Architecture Overview

### Core Design Decisions

**Server-Side Rendering (SSR)**
- All shell components (sidebar, navigation, tabs) render on the server for instant First Contentful Paint
- Channel/thread content is server-rendered for SEO and performance
- Only interactive components (message composer, search) are client-side

**Component Boundaries**
- Clear separation between Server and Client Components
- Server Components handle data fetching and layout
- Client Components marked with "use client" for interactivity
- No prop drilling - each component fetches its own data

**Nested Layouts**
- App shell (ServerRail + ChannelSidebar + TopTabs) defined in `/servers/[serverId]/layout.tsx`
- Layout persists across navigation - sidebar never reloads
- Only content area re-renders on route changes
- Parallel routes enable independent loading states

**Performance Optimizations**
- Streaming SSR with React Suspense boundaries
- Loading skeletons prevent layout shift
- Static generation where possible (server list, channel list)
- Minimal client-side JavaScript - most UI is static HTML

## Project Structure

```
src/
├── app/
│   ├── servers/[serverId]/
│   │   ├── layout.tsx              # Persistent shell (SSR)
│   │   ├── channels/[channelId]/
│   │   │   ├── page.tsx            # Channel view (SSR)
│   │   │   └── loading.tsx         # Skeleton UI
│   │   ├── threads/
│   │   │   ├── page.tsx            # Thread list (SSR)
│   │   │   └── [threadId]/page.tsx # Thread detail (SSR)
│   │   ├── members/page.tsx        # Members list (SSR)
│   │   ├── files/page.tsx          # File browser (SSR)
│   │   ├── insights/page.tsx       # Activity metrics (SSR)
│   │   └── settings/page.tsx       # Server settings (SSR)
│   ├── dm/[userId]/page.tsx        # Direct messages (SSR)
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Landing page
├── components/
│   ├── Shell/
│   │   ├── AppShell.tsx            # Layout container (Server)
│   │   ├── ServerRail.tsx          # Server list (Server)
│   │   ├── ChannelSidebar.tsx      # Channel list (Server)
│   │   └── TopTabs.tsx             # Tab navigation (Client)
│   └── chat/
│       ├── MessageList.tsx         # Message display (Server)
│       └── MessageComposer.tsx     # Input form (Client)
├── data/
│   └── mock.ts                     # Structured mock data
└── lib/
    └── types.ts                    # TypeScript definitions
```

## Features Implemented

### Routing
- ✅ `/servers/[serverId]/channels/[channelId]` - Channel view
- ✅ `/servers/[serverId]/threads` - Thread list
- ✅ `/servers/[serverId]/threads/[threadId]` - Thread detail
- ✅ `/servers/[serverId]/members` - Member directory
- ✅ `/servers/[serverId]/files` - File browser
- ✅ `/servers/[serverId]/insights` - Activity dashboard
- ✅ `/servers/[serverId]/settings` - Server settings
- ✅ `/dm/[userId]` - Direct messages

### UI Components
- ✅ Server rail with server icons
- ✅ Channel sidebar with unread indicators
- ✅ Top tab navigation (Channels, Threads, Members, Files, Insights, Settings)
- ✅ Message list with avatars and timestamps
- ✅ Message composer (client-only, optimistic UI ready)
- ✅ Thread view with replies
- ✅ Member list with status indicators and role badges
- ✅ File browser with metadata
- ✅ Activity metrics dashboard
- ✅ Loading skeletons
- ✅ Hover and active states
- ✅ Responsive layout

### Data Model
- ✅ Servers with metadata
- ✅ Channels with unread counts
- ✅ Messages with reactions
- ✅ Threads with reply counts
- ✅ Users with roles and status
- ✅ Attachments with file metadata
- ✅ Activity metrics (daily messages, active users)

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Rendering**: Server-Side Rendering (SSR)
- **Data**: Local mock files (no database)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Default Route
The app redirects to `/servers/discord/channels/general` by default.

## SSR Architecture Explained

### Why Server Components?

**Performance**
- Zero JavaScript for static content (sidebar, message list)
- Faster Time to Interactive (TTI)
- Reduced bundle size - only interactive components ship JS

**SEO & Accessibility**
- Fully rendered HTML on first load
- Screen readers work immediately
- Search engines can index content

**Data Fetching**
- Direct access to data layer (no API roundtrip)
- Parallel data fetching with React Suspense
- Automatic request deduplication

### Client Components Strategy

Only these components are client-side:
- `MessageComposer` - Form input and submission
- `TopTabs` - Active tab highlighting with usePathname
- Future: Search bar, modals, dropdowns

### Layout Persistence

The nested layout pattern ensures:
1. Server shell renders once on initial page load
2. Navigation between channels only updates content area
3. Sidebar and tabs remain mounted (no flicker)
4. URL updates without full page refresh

### Loading States

Each route can define a `loading.tsx` file:
- Renders immediately while page data loads
- Prevents layout shift with skeleton UI
- Improves perceived performance

## Design System

### Color Palette
- Background: `zinc-950` (neutral dark)
- Surface: `zinc-900` (cards, inputs)
- Border: `zinc-800` (subtle dividers)
- Text: `zinc-100` (primary), `zinc-400` (secondary)
- Accent: `blue-600` (links, active states)
- Status: `green-500` (online), `yellow-500` (away), `zinc-600` (offline)

### Typography
- Headings: `font-bold`, `text-2xl` / `text-lg`
- Body: `text-sm` / `text-base`
- Metadata: `text-xs`, `text-zinc-500`

### Spacing
- Container: `max-w-3xl` / `max-w-4xl`
- Padding: `p-4` / `p-6`
- Gaps: `gap-3` / `gap-4`

## Code Quality Patterns

### Type Safety
- All data structures typed in `lib/types.ts`
- No `any` types
- Strict TypeScript configuration

### Component Design
- Single Responsibility Principle
- Props interfaces defined inline
- Server/Client boundary clearly marked
- Reusable layout components

### Performance Comments
```tsx
// Server Component - renders once, ships no JS
export default async function ChannelPage() { ... }

// Client Component - interactive, ships minimal JS
"use client";
export function MessageComposer() { ... }
```

### Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<time>`)
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Environment Variables
None required - all data is local mock files.

## Future Enhancements

### Optimistic UI
- Instant message sending (update UI before server confirms)
- Optimistic reactions
- Undo/retry on failure

### Real-time Updates
- WebSocket integration for live messages
- Presence indicators
- Typing indicators

### Search
- Full-text search across messages
- Filter by user, date, channel
- Keyboard shortcuts (Cmd+K)

### Accessibility
- Screen reader announcements for new messages
- High contrast mode
- Reduced motion support

## License

MIT

## Author

Built as a portfolio project demonstrating senior-level frontend architecture for insurance technology companies.
