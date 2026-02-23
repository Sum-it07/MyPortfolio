# Portfolio Website

A visually stunning, modern, high-performance personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

![Portfolio Preview](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop)

## Features

- **Cinematic Design**: Dark theme with glassmorphism effects, subtle gradients, and elegant typography
- **Smooth Animations**: Powered by Framer Motion with scroll-triggered reveals and hover interactions
- **Fully Responsive**: Optimized for all screen sizes from mobile to desktop
- **Accessible**: ARIA labels, keyboard navigation, and prefers-reduced-motion support
- **High Performance**: Optimized for Lighthouse scores of 90+
- **Clean Architecture**: Modular component structure with reusable hooks

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Skills.jsx
│   │   │   └── Contact.jsx
│   │   ├── shared/
│   │   │   ├── AnimatedBackground.jsx
│   │   │   └── Components.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── index.js
│   ├── hooks/
│   │   ├── useAnimations.js
│   │   └── index.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Sections

1. **Hero** - Fullscreen cinematic intro with animated typography
2. **About** - Clean 2-column layout with compelling narrative
3. **Projects** - Card-based layout with hover effects and modal details
4. **Skills** - Elegant grid visualization with animated progress bars
5. **Contact** - Minimal contact form with smooth transitions
6. **Footer** - Social links with hover glow effects

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  background: {
    DEFAULT: '#0a0a0f',    // Main background
    secondary: '#12121a',  // Card backgrounds
    tertiary: '#1a1a25',
  },
  accent: {
    DEFAULT: '#6366f1',    // Primary accent (Indigo)
    light: '#818cf8',
    dark: '#4f46e5',
  },
  // ...
}
```

### Fonts

The portfolio uses:
- **Space Grotesk** - Headings (display font)
- **Inter** - Body text

Update the Google Fonts link in `index.html` and `tailwind.config.js` to change fonts.

### Content

Update the content in each section component:
- Personal info in `Hero.jsx`
- Bio and highlights in `About.jsx`
- Projects data in `Projects.jsx`
- Skills data in `Skills.jsx`
- Contact info in `Contact.jsx` and `Footer.jsx`

## Performance Tips

- Images use external CDN URLs - replace with optimized local assets for production
- All animations respect `prefers-reduced-motion`
- Lazy loading is ready to be implemented for project images
- Semantic HTML ensures good SEO

## License

MIT License - feel free to use this for your own portfolio!

---

Built with love and attention to detail.
