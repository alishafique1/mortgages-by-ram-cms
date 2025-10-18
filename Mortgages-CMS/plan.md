 

# Mortgages by Ram - Modern Blog Website with React 19 & Strapi 5
**Project Brief: Mortgage Agent Website**  
**Date: Oct 1, 2025**  
**Timeline: 4-8 Weeks**

## Project Overview

Building a modern, full-stack website for a Mortgage Agent in Toronto, Canada, using the latest technologies: **React 19 with React Router 7** and **Strapi 5 headless CMS**. This project will create a professional, conversion-focused online presence with a powerful content management system that allows non-technical users to manage content independently.

### Key Features
- **Dynamic Landing Page** - Content managers can rearrange sections without touching code
- **Articles/Blog Page** - Clean grid layout displaying all blog posts with future pagination
- **Article Detail Pages** - Individual pages with author info, content, and SEO optimization
- **Server-side Rendering** - Better SEO and performance
- **Type-safe API Integration** - Using Strapi SDK for clean, typed API calls

## Technology Stack & Architecture

### Frontend Technologies
- **React 19** - Latest performance improvements and modern features
- **React Router 7 Framework Mode** - Server-side rendering, file-based routing, excellent DX
- **Shadcn/ui & Tailwind CSS** - Accessible, customizable components with utility-first styling
- **TypeScript** - Full type safety across the stack

### Backend Technologies
- **Strapi 5** - Powerful headless CMS with flexible admin panel and TypeScript support
- **SQLite Database** - For development and small-scale production
- **Strapi SDK** - Clean, type-safe API integration

### Project Architecture
```
Mortgages-CMS/
├── client/          # React Router 7 frontend application
│   ├── app/
│   │   ├── components/
│   │   │   ├── blocks/     # Dynamic content blocks
│   │   │   ├── custom/     # Custom components
│   │   │   └── ui/         # Base UI components
│   │   ├── lib/            # API client and utilities
│   │   ├── routes/         # File-based routing
│   │   └── types/          # TypeScript definitions
└── server/          # Strapi 5 backend CMS
```

## Key Features & Benefits

### Dynamic Content Blocks
- Non-technical users can rearrange page sections through Strapi admin
- Changes reflect immediately on frontend
- Flexible block renderer system matching Strapi components to React components

### Strapi SDK API Integration
```javascript
// Clean, typed API calls
const landingPageData = await sdk.find('landing-page');
const articles = await sdk.find('articles');
```

### SEO Optimized
- React Router 7's meta function for dynamic SEO tags
- Server-side rendering for better search engine optimization
- Content-driven meta tags from Strapi

### Error Handling
- Custom error boundaries with graceful fallbacks
- Clean 404 page experience when content isn't found

## Project Setup Instructions

### Quick Start (TL;DR)
```bash
# Navigate to your project
cd mortgages-by-ram
yarn setup
yarn seed
yarn dev
```

**Access Points:**
- Frontend: `http://localhost:5173`
- Strapi Admin: `http://localhost:1337/admin`

### Detailed Setup Process

1. **Navigate to the Project**
   ```bash
   cd mortgages-by-ram
   ```

2. **Install Dependencies**
   ```bash
   yarn setup
   ```

3. **Seed the Database**
   ```bash
   yarn seed
   ```

4. **Start Development Servers**
   ```bash
   yarn dev
   ```

## Objectives
- Create a professional, trustworthy, and conversion-focused online presence
- Provide clear information on mortgage services, tools, and resources
- Ensure mobile-first, responsive design with fast performance
- Include a secure CMS for self-service content updates
- Build an SEO-friendly structure to improve search visibility

## Scope of Work

### Front End (Website)
- Modern responsive design optimized for mobile and desktop
- **Single comprehensive landing page** with all content sections: Hero, About, Services (Mortgage Options), Tools (Calculators), Resources (Articles, Guides), Testimonials, Contact
- **Articles section** for blog posts and mortgage insights
- Lead capture forms (contact, pre-approval inquiry, newsletter sign-up)
- Integration with mortgage calculators and rate tables
- **Dynamic content management** - Content blocks can be reordered through CMS

### Back End (CMS)
- Easy-to-use Strapi 5 content management system
- Ability to update text, images, forms, and blog posts
- Role-based access (admin vs content editor)
- SEO tools (meta tags, slugs, alt text, sitemaps)
- Option to integrate with CRM (Salesforce, HubSpot, or others)
- **Dynamic block system** for flexible page layouts

## Timeline (estimate, subject to confirmation)
- **Discovery & Content Gathering:** 1–2 weeks
- **Design & Feedback:** 1–2 weeks  
- **Development & CMS Integration:** 3–4 weeks
- **Testing & Revisions:** 1 week
- **Launch:** Target 6–8 weeks total

## Information Required from Client
- **Branding:** Logo, color palette, fonts, style guide
- **Content:** About section, services descriptions, resources, blog content (if available)
- **Legal/Compliance:** Disclaimers, licensing numbers, privacy policies, terms of service
- **Functional Needs:** Mortgage calculator preference, CRM integration requirements, lead form details
- **Competitors:** Example sites you like/dislike
  - Growwithnav.com 
  - https://www.pine.ca/
- **Domain & Hosting:** 
  - Domain: Hosted on Namecheap 
  - Hosting Provider: TBD
- **SEO:** Target keywords, locations, and any marketing integrations (Google Analytics, Ads, Facebook Pixel)
- **Team Access:** Who will manage CMS after handover?

## Content Strategy & Inspiration

### Pine.ca Design Inspiration
Based on analysis of pine.ca, we'll implement:

**Key Design Elements:**
- **Clean, Professional Layout** - Minimalist design with clear navigation
- **Trust-Building Elements** - Professional imagery, testimonials, certifications
- **Service-Focused Content** - Clear mortgage product descriptions and benefits
- **Local Market Focus** - Toronto-specific content and market insights
- **Educational Resources** - Comprehensive guides and calculators

**Content Structure:**
- **Hero Section** - Compelling value proposition with clear CTA
- **Services Grid** - Mortgage products with detailed descriptions
- **About Section** - Personal story and expertise
- **Resources** - Blog posts, guides, and calculators
- **Testimonials** - Client success stories
- **Contact Forms** - Lead capture and consultation booking

## Content Migration Strategy

### Phase 1: Core Content Setup
1. **Landing Page Content**
   - Hero section with mortgage value proposition
   - Services overview with mortgage products
   - About section with personal story
   - Trust indicators and certifications

2. **Global Settings**
   - Site title and description
   - Header navigation with mortgage services
   - Footer with contact information and legal links

3. **Article Categories**
   - First-time homebuyer guides
   - Mortgage rate insights
   - Market updates for Toronto
   - Refinancing strategies

### Phase 2: Content Blocks Customization
- **Hero Block** - Mortgage-focused headlines and CTAs
- **Card Grid** - Service offerings and mortgage products
- **Content with Image** - Educational content and process explanations
- **Person Card** - Team member profiles and expertise
- **FAQ Block** - Common mortgage questions

### Phase 3: Advanced Features
- **Mortgage Calculator Integration**
- **Rate Comparison Tools**
- **Document Checklist Downloads**
- **Appointment Booking System**

## Development Rules & Guidelines

### Strapi Documentation Reference
**CRITICAL RULE:** Always refer to the official Strapi documentation (https://docs.strapi.io/) when implementing features, fixing issues, or making changes to the CMS. The Strapi documentation is the authoritative source for:
- Content type configurations
- API endpoints and parameters
- Plugin configurations
- Custom field types
- Authentication and permissions
- Deployment and hosting
- Migration strategies

### Codebase Structure
- **Single Landing Page Approach:** All main content (Hero, About, Services, Tools, Resources, Testimonials, Contact) will be consolidated into one comprehensive landing page
- **Articles Section:** Maintained as a separate section for blog posts and mortgage insights
- **Simplified Navigation:** Focus on essential sections only
- **Mobile-First Design:** Ensure all content works seamlessly on mobile devices

## Next Steps
1. **✅ Clone and setup the starter project** - COMPLETED
2. **🔄 Update Strapi content** with mortgage-specific information
3. **🔄 Customize content blocks** for mortgage services
4. **🔄 Create mortgage-specific articles** and resources
5. **🔄 Design and implement** mortgage-specific components
6. **Deploy and launch** the complete solution
