# Maia Technologies Corporate Website

This is the marketing website for Maia Technologies, a small team building practical AI software.

## About Maia Technologies

Maia Technologies is a small team building AI software, picking problems where good tools don't exist yet or where existing ones could be cheaper or better. Our current products:

- **Maia**: An AI that handles phone calls for you, navigating phone trees and bot gatekeepers to get you to a live person (iOS, coming soon).
- **BuildMyApp**: A demand-first software marketplace where buyers commission custom software and license completed products.
- **Vilora**: An AI-powered platform for mediation, collaboration, brainstorming, and decision-making.
- **AlphaAI**: An intelligent investment research platform combining AI agents with automated discovery (private access).
- **AlphaPoker**: A web-based GTO poker training application with AI opponents and a real-time coach (private access).

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: CSS3 with responsive design
- **Build Tool**: Create React App
- **Deployment**: Ready for Vercel, Netlify, or similar platforms

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maia-ai-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The site will be available at `http://localhost:3000`.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.tsx   # Main navigation component
│   └── Footer.tsx       # Footer component
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── About.tsx       # About Us page
│   ├── Products.tsx    # Products overview
│   ├── Team.tsx        # Team page
│   └── Contact.tsx     # Contact page
├── styles/             # CSS files
│   ├── Home.css
│   ├── About.css
│   ├── Products.css
│   ├── Team.css
│   ├── Contact.css
│   ├── Navigation.css
│   └── Footer.css
├── App.tsx             # Main app component
├── App.css             # Global styles
└── index.tsx           # Entry point
```

## Key Features

- **Responsive Design** - Mobile-first approach, works on all devices
- **Modern React** - Uses hooks, TypeScript, and latest React features
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Performance** - Optimized images and efficient code splitting
- **Accessibility** - WCAG compliant design

## Deployment

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify's deploy interface

## Contact

For questions about this website or Maia Technologies:

- Website: [maiatech.ai](https://maiatech.ai)
- Email: support@maiatech.ai
- Partnerships: partnerships@maiatech.ai

## License

© 2025 Maia Technologies. All rights reserved.