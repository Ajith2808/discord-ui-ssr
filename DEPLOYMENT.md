# Deployment Guide

## Quick Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**
- Visit [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Vercel auto-detects Next.js configuration
- Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

## Manual Vercel CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Docker Deployment

### Build Image
```bash
docker build -t discord-ssr .
```

### Run Container
```bash
docker run -p 3000:3000 discord-ssr
```

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

## AWS Amplify

1. Connect your GitHub repository
2. Amplify auto-detects Next.js
3. Build settings (auto-configured):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Install Next.js plugin (auto-suggested)

## Self-Hosted (PM2)

```bash
# Build
npm run build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "discord-ssr" -- start

# Save PM2 config
pm2 save

# Setup startup script
pm2 startup
```

## Environment Variables

This project requires **no environment variables** - all data is local mock files.

For production, you may want to add:
- `NEXT_PUBLIC_APP_URL` - Your app's public URL
- `NODE_ENV=production` - Automatically set by most platforms

## Performance Checklist

- ✅ Server Components used for static content
- ✅ Client Components minimized
- ✅ Images optimized (if added)
- ✅ Fonts optimized with next/font
- ✅ No external API calls (all local data)
- ✅ Streaming SSR enabled
- ✅ Loading states implemented

## Post-Deployment Verification

1. **Check SSR**: View page source - HTML should be fully rendered
2. **Test Navigation**: Sidebar should not reload between channels
3. **Verify Loading States**: Navigate quickly to see skeletons
4. **Check Console**: No hydration errors
5. **Test Mobile**: Responsive layout works

## Monitoring

### Vercel Analytics
- Automatically enabled on Vercel
- View Core Web Vitals in dashboard

### Custom Monitoring
Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`

### Hydration Errors
- Ensure Server/Client boundaries are correct
- Check for dynamic content in Server Components
- Verify no `window` or `document` access in Server Components

### Slow Performance
- Check bundle size: `npm run build` shows size report
- Verify Server Components are not marked "use client"
- Use React DevTools Profiler

## Scaling Considerations

This app is **stateless** and **scales horizontally**:
- No database connections
- No session state
- All data is static mock files
- Can run multiple instances behind load balancer

For production with real data:
- Add Redis for session management
- Use database connection pooling
- Implement CDN for static assets
- Add rate limiting
