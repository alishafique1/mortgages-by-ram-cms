# Mortgages by Ram

A modern mortgage services website built with Strapi CMS and React Router 7, featuring an AI-powered chatbot for customer assistance.

## Project Structure

This repository contains:

- **`mortgages-by-ram/`** - Main application directory
  - **`server/`** - Strapi CMS backend
  - **`client/`** - React Router 7 frontend application
- **`Mortgages-CMS/`** - Documentation and content migration guides

## Features

- 🏠 Dynamic content management with Strapi
- 💬 AI-powered chatbot for mortgage inquiries
- 📱 Responsive, modern UI
- 🔒 Secure authentication and contact forms
- 📝 Blog and articles system
- 🎨 Custom block-based page builder

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager
- PostgreSQL or SQLite (for Strapi)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MortgagesbyRam
```

2. Install server dependencies:
```bash
cd mortgages-by-ram/server
yarn install
```

3. Install client dependencies:
```bash
cd ../client
yarn install
```

4. Set up environment variables (see documentation in each directory)

5. Start the development servers:

**Server:**
```bash
cd mortgages-by-ram/server
yarn develop
```

**Client:**
```bash
cd mortgages-by-ram/client
yarn dev
```

## Documentation

Comprehensive guides are available in the `mortgages-by-ram/` directory:

- [Setup Complete Guide](mortgages-by-ram/SETUP-COMPLETE.md)
- [Chatbot Setup](mortgages-by-ram/QUICK-START-CHATBOT.md)
- [Content Update Guide](mortgages-by-ram/CONTENT-UPDATE-GUIDE.md)
- [Contact Form Guide](mortgages-by-ram/CONTACT-FORM-GUIDE.md)
- [Image Upload Guide](mortgages-by-ram/IMAGE-UPLOAD-GUIDE.md)

## Technology Stack

### Frontend
- React Router 7
- TypeScript
- Vite
- TailwindCSS
- Shadcn UI Components

### Backend
- Strapi CMS v4
- Node.js
- TypeScript

### AI Integration
- OpenAI API for chatbot functionality

## Contributing

This project is maintained by Social Dots - A Digital Media Agency based in Toronto.

## License

Private - All rights reserved

---

Built with ❤️ by [Social Dots](https://socialdots.com)

