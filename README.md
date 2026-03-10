# Prahlad Portfolio Website

Modern React + Vite portfolio with 3D hero, projects showcase, recommendations, and a fully working contact section.

## Run locally

```bash
npm install
npm run dev
```

## Contact form setup (EmailJS)

1. Copy `.env.example` to `.env.local`.
2. Add your EmailJS values:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. Restart the dev server.

If EmailJS is temporarily unavailable, the contact section also includes a **Send via Email App** fallback button.

## Profile links

Update personal info in:

`src/constants/index.js`

This includes:
- Resume URL
- Email
- Location
- Social profile links
