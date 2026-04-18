# Prahlad Portfolio Website

Modern React + Vite portfolio with 3D hero, projects showcase, recommendations, and a fully working contact section.

🚀 **Production-Ready** | ✅ **ESLint Compliant** | 📦 **Optimized Bundle**

## Features

- **3D Hero Section** with interactive animations
- **Project Showcase** with live preview
- **Professional Experience** timeline with 3D models
- **Coding Profiles** integrated with LeetCode, GitHub, Codeforces, and more
- **Client Recommendations** section
- **Contact Form** with EmailJS integration and validation
- **Responsive Design** optimized for all devices
- **Performance Optimized** with code splitting and lazy loading

## Run locally

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## Contact form setup (EmailJS)

1. Copy `.env.example` to `.env.local`.
2. Sign up at [EmailJS](https://www.emailjs.com/)
3. Create an email service and template
4. Add your EmailJS values to `.env.local`:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Restart the dev server.

If EmailJS is temporarily unavailable, the contact section includes a **Send via Email App** fallback button.

## Form Validation

The contact form includes:
- ✅ Email format validation
- ✅ Minimum message length (10 characters)
- ✅ Real-time error feedback
- ✅ Graceful error handling

## Profile links

Update personal info in:

`src/constants/index.js`

This includes:
- Resume URL
- Email
- Location
- Social profile links (LinkedIn, GitHub, Instagram)

## Tech Stack

- **Frontend**: React 18.3, Vite 6
- **Styling**: Tailwind CSS, PostCSS
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: GSAP
- **Email**: EmailJS
- **Linting**: ESLint

## Performance

- Optimized bundle with code splitting
- Lazy loading for heavy components
- Responsive performance detection
- Reduced motion support
- Slow connection detection

## Recent Improvements

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for detailed changelog of:
- Form validation enhancements
- Social media links fixed
- Build configuration optimized
- Code quality improvements
- ESLint compliance

## License

MIT
