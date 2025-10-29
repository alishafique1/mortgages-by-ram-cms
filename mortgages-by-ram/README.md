# Mortgages by Ram - Modern Website

A professional mortgage agent website built with React Router 7 and Strapi 5, inspired by Grow With Nav's bold, impactful design.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![Strapi](https://img.shields.io/badge/Strapi-5-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and Yarn
- Basic knowledge of React and Strapi

### Installation & Run

```bash
# Install dependencies (first time only)
yarn setup

# Start both frontend and backend
yarn dev
```

**Access Points:**
- Frontend: http://localhost:5173
- Strapi Admin: http://localhost:1337/admin
- API: http://localhost:1337/api

---

## 📋 Content Setup (Optional)

Use the automated script to populate your website with sample content:

```bash
# 1. Get API token from Strapi admin (Settings → API Tokens)
# 2. Update token in update-mortgage-content.js
# 3. Run:
yarn update-content
```

This creates sample pages and content blocks you can customize in Strapi admin.

---

## 📚 Documentation

- **[PLAN.md](./PLAN.md)** - Complete project status, roadmap, and customization guide

---

## 🎨 Features

### Design
- ✨ Bold hero section with dark gradients
- ✨ Modern animations and hover effects
- ✨ Fully responsive (mobile-first)
- ✨ Professional color scheme (Slate + Blue)

### Content
- 📄 Dynamic landing page with customizable blocks
- 📄 Blog/articles system
- 📄 Service pages (First-time buyers, Refinancing, etc.)
- 📄 Optional AI chatbot (OpenAI GPT-4o-mini)

### Technical
- ⚡ React 19 with React Router 7
- ⚡ Server-side rendering (SSR)
- ⚡ Strapi 5 headless CMS
- ⚡ TypeScript + Tailwind CSS 4
- ⚡ SEO optimized

---

## 📱 Available Scripts

```bash
yarn dev              # Run both frontend and backend
yarn dev:server       # Run only Strapi backend
yarn dev:client       # Run only React frontend
yarn setup            # Install all dependencies
yarn update-content   # Run content update script
yarn build            # Build for production
```

---

## 🏗️ Project Structure

```
mortgages-by-ram/
├── client/           # React Router 7 Frontend
│   └── app/
│       ├── components/
│       ├── routes/
│       └── contexts/
├── server/           # Strapi 5 Backend
│   └── src/
├── PLAN.md          # Project roadmap & status
├── README.md        # This file
└── update-mortgage-content.js
```

---

## 📊 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| React Router | 7 | Routing & SSR |
| TypeScript | 5.8 | Type safety |
| Tailwind CSS | 4 | Styling |
| Strapi | 5 | Headless CMS |
| SQLite | - | Database (dev) |

---

## 🎯 Inspired By

This project is inspired by [Grow With Nav](https://www.growwithnav.com/), featuring:
- Bold, impactful headlines
- First-time home buyer focus
- Trust-building messaging
- Professional yet approachable tone

---

## ✅ Pre-Launch Checklist

- [ ] Run content update script
- [ ] Publish all content in Strapi
- [ ] Add professional images
- [ ] Update contact information
- [ ] Test all navigation links
- [ ] Set up domain and hosting

See **[PLAN.md](./PLAN.md)** for complete customization guide.

---

## 📞 Support

**Created by:** Ali Shafique @ Social Dots  
**Project:** Mortgages by Ram  
**Date:** October 2025

---

## 📄 License

MIT License

---

**Ready to get started?**

```bash
yarn setup && yarn dev
```

## 🏗️ Project Structure

```
mortgages-by-ram/
├── client/                    # React Router 7 Frontend
│   └── app/
│       ├── components/
│       │   ├── blocks/       # Content blocks (Hero, Cards, etc.)
│       │   ├── custom/       # Navigation, Footer
│       │   └── ui/           # Shadcn UI components
│       └── routes/           # Page routes
│
├── server/                    # Strapi 5 Backend
│   └── src/
│       ├── api/              # API endpoints
│       └── components/       # Content type definitions
│
└── Documentation files
```

---

## 📱 Available Scripts

```bash
# Development
yarn dev              # Run both frontend and backend
yarn dev:server       # Run only Strapi backend
yarn dev:client       # Run only React frontend

# Setup
yarn setup            # Install all dependencies

# Content
yarn update-content   # Run content update script

# Build
yarn build            # Build for production
```

---

## 🎯 Inspired By

This project is inspired by [Grow With Nav](https://www.growwithnav.com/), featuring:

- Bold, impactful headlines
- First-time home buyer focus
- Exclusive community concept (Grow Nation)
- Trust-building messaging
- Clear value propositions
- Professional yet approachable tone

---

## 🔧 Customization

### Update Colors
Edit `client/app/app.css` to change the color scheme

### Modify Content
Use Strapi admin at http://localhost:1337/admin

### Add Components
Add new blocks in `client/app/components/blocks/`

### Configure Routes
Update `client/app/routes.ts`

---

## 📊 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| React Router | 7 | Routing & SSR |
| TypeScript | 5.8 | Type safety |
| Tailwind CSS | 4 | Styling |
| Shadcn UI | Latest | Component library |
| Strapi | 5 | Headless CMS |
| SQLite | - | Database (dev) |

---

## 🌟 Key Pages

Once set up, these pages will be available:

- **Home** (`/`) - Dynamic landing page
- **About** (`/pages/about`) - Team and mission
- **Contact** (`/pages/contact`) - Contact information
- **First-Time Buyers** (`/pages/first-time-buyers`) - Main service
- **Refinancing** (`/pages/refinancing`) - Refinancing services
- **Investment Properties** (`/pages/investment-properties`) - Investment info
- **Commercial Mortgages** (`/pages/commercial-mortgages`) - Business loans
- **Articles** (`/articles`) - Blog posts
- **Legal Pages** - Privacy, Terms, Disclaimer

---

## ✅ Pre-Launch Checklist

- [ ] Run content update script or manual setup
- [ ] Publish all content in Strapi
- [ ] Add professional images
- [ ] Update contact information
- [ ] Customize copy for Ram's brand voice
- [ ] Test all navigation links
- [ ] Test on mobile devices
- [ ] Set up Google Analytics
- [ ] Configure domain and hosting
- [ ] Add real client testimonials

---

## 🐛 Troubleshooting

### Content not showing?
- Check if content is published in Strapi
- Clear browser cache
- Restart development servers

### API errors?
- Verify Strapi is running on port 1337
- Check API token is valid
- Review Strapi logs in terminal

### Styling issues?
- Run `yarn dev` to ensure Tailwind is compiling
- Check for CSS conflicts
- Verify Tailwind config

---

## 📞 Support

**Created by:** Ali Shafique @ Social Dots  
**Project:** Mortgages by Ram  
**Date:** October 2025

For technical questions, review the documentation files or check:
- Strapi logs in terminal
- Browser console for errors
- Network tab for API issues

---

## 📄 License

MIT License - Feel free to use this project as a template for your own mortgage agent website.

---

## 🎉 What's Next?

1. **Content:** Customize all copy to match your brand
2. **Images:** Add professional photography
3. **Forms:** Implement contact and newsletter forms
4. **Tools:** Add mortgage calculator
5. **SEO:** Optimize meta tags and content
6. **Analytics:** Set up tracking
7. **Deploy:** Choose hosting and go live!

---

**Ready to build something amazing? Let's get started! 🚀**

```bash
yarn setup && yarn dev
```
