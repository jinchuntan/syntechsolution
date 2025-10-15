
# Syntech Site (Next.js)

## Dev
```bash
npm i
npm run dev
```

## Deploy to Vercel
- Import this folder into Vercel (Git or drag-and-drop)
- Framework: Next.js (auto-detected)
- Build command: `next build`
- Start command: `next start` (for preview deployments)

## Admin portal
- Visit `/#admin`
- Login: `admin` / `admin` (client-side demo auth)

## Contact API
- POST `/api/contact` logs payload. Integrate email later in `app/api/contact/route.ts`.
