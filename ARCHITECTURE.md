# Architecture Documentation

## System Overview

This application demonstrates enterprise-grade frontend architecture patterns suitable for insurance technology companies, focusing on performance, maintainability, and scalability.

## Core Architectural Decisions

### 1. Server-Side Rendering (SSR)

**Why SSR?**
- **Performance**: First Contentful Paint (FCP) < 1s
- **SEO**: Fully rendered HTML for search engines
- **Accessibility**: Content available before JavaScript loads
- **Reliability**: Works even if JavaScript fails to load

**Implementation**
```tsx
// Server Component (default in App Router)
export default async function ChannelPage({ params }) {
  const data = await fetchData(); // Runs on server
  return <div>{data}</div>; // Rendered to HTML
}
```

**Benefits**
- Zero JavaScript for static content
- Reduced Time to Interactive (TTI)
- Better Core Web Vitals scores

### 2. Component Architecture

#### Server Components
**Purpose**: Render static content, fetch data, handle layout

**Examples**:
- `AppShell` - Layout container
- `ServerRail` - Server list
- `ChannelSidebar` - Channel navigation
- `MessageList` - Message display

**Characteristics**:
- No `"use client"` directive
- Can use async/await
- Direct data access
- Zero client-side JavaScript

#### Client Components
**Purpose**: Handle interactivity, manage state

**Examples**:
- `MessageComposer` - Form input
- `TopTabs` - Active tab highlighting
- `SearchBar` - Search input

**Characteristics**:
- Marked with `"use client"`
- Can use hooks (useState, useEffect)
- Event handlers
- Minimal bundle size

#### Boundary Strategy
```
Server Component (Shell)
├── Server Component (Sidebar)
├── Client Component (Tabs) ← Boundary
└── Server Component (Content)
    ├── Server Component (MessageList)
    └── Client Component (Composer) ← Boundary
```

### 3. Nested Layouts

**Problem**: Traditional SPAs reload entire UI on navigation

**Solution**: Nested layouts with persistent shell

```
app/
├── layout.tsx                    # Root (always mounted)
└── servers/[serverId]/
    ├── layout.tsx                # Server shell (persists)
    └── channels/[channelId]/
        └── page.tsx              # Only this changes
```

**Benefits**:
- Sidebar never reloads
- Instant navigation feel
- Reduced bandwidth
- Better UX

**Implementation**:
```tsx
// servers/[serverId]/layout.tsx
export default async function ServerLayout({ children, params }) {
  const server = await getServer(params.serverId);
  
  return (
    <AppShell
      sidebar={<ChannelSidebar server={server} />}
      content={children} // Only this updates
    />
  );
}
```

### 4. Data Fetching Strategy

#### Colocation Pattern
Each component fetches its own data:

```tsx
// ❌ Bad: Prop drilling
<Parent data={data}>
  <Child data={data.child} />
</Parent>

// ✅ Good: Colocation
<Parent>
  <Child /> // Fetches own data
</Parent>
```

#### Request Deduplication
Next.js automatically deduplicates identical requests:

```tsx
// Both components call getServer("discord")
// Only 1 actual fetch happens
<ServerLayout params={{ serverId: "discord" }} />
<ChannelSidebar serverId="discord" />
```

#### Parallel Fetching
```tsx
// These fetch in parallel, not sequential
const [server, channels, users] = await Promise.all([
  getServer(id),
  getChannels(id),
  getUsers(id),
]);
```

### 5. Loading States

#### Streaming SSR
```tsx
// app/servers/[serverId]/channels/[channelId]/loading.tsx
export default function Loading() {
  return <Skeleton />; // Shows immediately
}

// page.tsx
export default async function Page() {
  const data = await fetchData(); // Streams when ready
  return <Content data={data} />;
}
```

**Flow**:
1. User navigates to channel
2. Shell remains visible (already loaded)
3. Loading skeleton appears instantly
4. Content streams in when ready
5. Skeleton replaced with real content

#### Suspense Boundaries
```tsx
<Suspense fallback={<Skeleton />}>
  <AsyncComponent />
</Suspense>
```

### 6. Routing Strategy

#### File-Based Routing
```
app/
├── servers/[serverId]/
│   ├── channels/[channelId]/page.tsx  → /servers/x/channels/y
│   ├── threads/[threadId]/page.tsx    → /servers/x/threads/y
│   ├── members/page.tsx               → /servers/x/members
│   └── settings/page.tsx              → /servers/x/settings
└── dm/[userId]/page.tsx               → /dm/x
```

#### Dynamic Segments
```tsx
// Params are now Promises in Next.js 15
export default async function Page({ params }) {
  const { serverId, channelId } = await params;
  // Use params...
}
```

#### Navigation
```tsx
// Client-side navigation (no full reload)
<Link href="/servers/discord/channels/general">
  General
</Link>
```

## Performance Optimizations

### 1. Minimal JavaScript
- Server Components ship **zero JavaScript**
- Only interactive components are client-side
- Total bundle size: ~50KB (vs 200KB+ for typical SPA)

### 2. Code Splitting
- Each route is automatically code-split
- Components lazy-loaded on demand
- Shared chunks extracted automatically

### 3. Streaming
- HTML streams to browser as it's generated
- User sees content progressively
- No waiting for entire page to render

### 4. Caching
```tsx
// Static data (cached indefinitely)
export const revalidate = false;

// Revalidate every hour
export const revalidate = 3600;

// Always fresh
export const revalidate = 0;
```

## Data Model

### Type System
```typescript
// lib/types.ts
export type Server = {
  id: string;
  name: string;
  iconText: string;
};

export type Channel = {
  id: string;
  serverId: string;
  name: string;
  kind: "text" | "voice";
  unread?: number;
};

export type Message = {
  id: string;
  serverId: string;
  channelId: string;
  author: User;
  content: string;
  createdAt: string;
  reactions?: { emoji: string; count: number }[];
};
```

### Mock Data Layer
```typescript
// data/mock.ts
export function getServer(id: string): Server | undefined {
  return servers.find(s => s.id === id);
}

export function getChannels(serverId: string): Channel[] {
  return channels.filter(c => c.serverId === serverId);
}
```

**Benefits**:
- Type-safe data access
- Easy to swap with real API
- Consistent interface
- Testable

## Security Considerations

### 1. Server-Side Validation
```tsx
export default async function Page({ params }) {
  const { serverId } = await params;
  
  // Validate on server
  const server = getServer(serverId);
  if (!server) return notFound();
  
  return <Content server={server} />;
}
```

### 2. No Sensitive Data in Client
- API keys never sent to client
- Database queries run on server
- User permissions checked server-side

### 3. XSS Protection
- React escapes content by default
- No `dangerouslySetInnerHTML`
- User input sanitized

## Scalability Patterns

### 1. Stateless Architecture
- No server-side sessions
- No in-memory state
- Horizontally scalable

### 2. CDN-Friendly
- Static assets cached at edge
- HTML can be cached with revalidation
- API routes can use edge runtime

### 3. Database Strategy (Future)
```tsx
// Current: Local mock
export function getMessages(channelId: string) {
  return messages.filter(m => m.channelId === channelId);
}

// Future: Database
export async function getMessages(channelId: string) {
  return await db.messages.findMany({
    where: { channelId },
    orderBy: { createdAt: 'asc' },
  });
}
```

## Testing Strategy

### Unit Tests
```tsx
// components/MessageList.test.tsx
import { render } from '@testing-library/react';
import { MessageList } from './MessageList';

test('renders messages', () => {
  const messages = [{ id: '1', content: 'Hello' }];
  const { getByText } = render(<MessageList messages={messages} />);
  expect(getByText('Hello')).toBeInTheDocument();
});
```

### Integration Tests
```tsx
// app/servers/[serverId]/channels/[channelId]/page.test.tsx
test('channel page renders correctly', async () => {
  const page = await ChannelPage({ 
    params: Promise.resolve({ serverId: 'discord', channelId: 'general' })
  });
  // Assert page structure
});
```

### E2E Tests (Playwright)
```typescript
test('navigate between channels', async ({ page }) => {
  await page.goto('/servers/discord/channels/general');
  await page.click('text=product');
  await expect(page).toHaveURL('/servers/discord/channels/product');
  // Sidebar should not reload
});
```

## Monitoring & Observability

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Custom Metrics
```tsx
// Track navigation timing
export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics
}
```

### Error Boundaries
```tsx
// app/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Future Enhancements

### 1. Real-Time Updates
```tsx
// Use WebSockets or Server-Sent Events
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    // Update UI optimistically
  };
}, []);
```

### 2. Optimistic UI
```tsx
async function sendMessage(content: string) {
  // 1. Update UI immediately
  setMessages(prev => [...prev, { id: 'temp', content }]);
  
  // 2. Send to server
  const result = await api.sendMessage(content);
  
  // 3. Replace temp with real
  setMessages(prev => prev.map(m => 
    m.id === 'temp' ? result : m
  ));
}
```

### 3. Offline Support
```tsx
// service-worker.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## Conclusion

This architecture prioritizes:
1. **Performance**: SSR, minimal JS, streaming
2. **Maintainability**: Clear boundaries, type safety
3. **Scalability**: Stateless, cacheable, horizontal scaling
4. **User Experience**: Instant navigation, loading states
5. **Developer Experience**: Colocation, type safety, clear patterns

Perfect for insurance technology companies requiring enterprise-grade reliability and performance.
