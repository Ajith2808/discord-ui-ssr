# Quick Start Guide

## 🚀 Get Running in 2 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Visit [http://localhost:3000](http://localhost:3000)

The app automatically redirects to `/servers/discord/channels/general`

## 🎯 What to Explore

### Navigation
- **Server Rail** (left): Click server icons to switch servers
- **Channel Sidebar**: Click channels to view messages
- **Top Tabs**: Navigate between Channels, Threads, Members, Files, Insights, Settings

### Key Features to Demo

1. **Channel Navigation**
   - Click different channels in sidebar
   - Notice sidebar doesn't reload (nested layout)
   - See unread badges on some channels

2. **Threads**
   - Click "Threads" tab
   - Click a thread to see replies
   - Notice loading skeleton appears briefly

3. **Members**
   - Click "Members" tab
   - See user status indicators (online/away/offline)
   - See role badges

4. **Files**
   - Click "Files" tab
   - Browse uploaded files with metadata

5. **Insights**
   - Click "Insights" tab
   - View activity metrics and charts

6. **Settings**
   - Click "Settings" tab
   - See server configuration UI

7. **Search**
   - Use search bar in top navigation (UI only)

8. **Message Composer**
   - Type in message input at bottom
   - Click "Send" (UI only, no backend)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── servers/[serverId]/ # Server routes
│   └── dm/[userId]/        # Direct messages
├── components/             # React components
│   ├── Shell/              # Layout components
│   └── chat/               # Chat components
├── data/                   # Mock data
│   └── mock.ts             # All data here
└── lib/                    # Utilities
    └── types.ts            # TypeScript types
```

## 🔧 Available Commands

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 📝 Modifying Data

All data is in `src/data/mock.ts`. Edit this file to:
- Add new servers
- Add new channels
- Add new messages
- Add new users
- Modify activity metrics

Example:
```typescript
// src/data/mock.ts
export const servers: Server[] = [
  { id: "myserver", name: "My Server", iconText: "MS" },
  // ... existing servers
];
```

## 🎨 Customizing Styles

Using Tailwind CSS. Common customizations:

### Change Colors
```tsx
// Replace zinc with another color
className="bg-zinc-900"  →  className="bg-slate-900"
```

### Modify Layout
```tsx
// src/components/Shell/AppShell.tsx
// Adjust sidebar width, spacing, etc.
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Restart TypeScript server in VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📚 Learn More

- **README.md** - Full project documentation
- **ARCHITECTURE.md** - Deep-dive into design decisions
- **DEPLOYMENT.md** - How to deploy to production
- **PROJECT_SUMMARY.md** - Complete feature checklist

## 🎓 Key Concepts

### Server Components
- Default in App Router
- Render on server
- Zero JavaScript to client
- Can use async/await

### Client Components
- Marked with `"use client"`
- Interactive components
- Can use hooks
- Minimal bundle size

### Nested Layouts
- Layout persists across navigation
- Only content area updates
- Faster navigation
- Better UX

## 💡 Tips

1. **View Source**: Right-click → View Page Source to see SSR HTML
2. **Network Tab**: Watch how little JavaScript loads
3. **React DevTools**: See Server vs Client components
4. **Performance**: Check Lighthouse scores (should be 90+)

## 🚢 Ready to Deploy?

See **DEPLOYMENT.md** for step-by-step guides to:
- Vercel (1-click deploy)
- Docker
- AWS Amplify
- Netlify
- Self-hosted

## ✨ Next Steps

1. Explore all tabs and routes
2. Read ARCHITECTURE.md to understand design
3. Modify mock data to add your own content
4. Customize colors and styling
5. Deploy to Vercel for live demo

**Happy coding!** 🎉
