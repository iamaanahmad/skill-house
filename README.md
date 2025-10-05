# SkillHouse: Verifiable Digital Credentials

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Powered by Appwrite](https://img.shields.io/badge/Powered%20by-Appwrite-f02e65?logo=appwrite)](https://appwrite.io)
[![Built for Appwrite Hackathon 2025](https://img.shields.io/badge/Hackathon-Appwrite%202025-brightgreen)](https://appwrite.io/hackathons)

**SkillHouse** is a modern, full-stack proof-of-skill microcredentials platform that revolutionizes how skills are verified, shared, and valued. Built for the **Appwrite Hackathon 2025**, it demonstrates maximum integration with Appwrite services including Auth, Database, Storage, and Realtime.

## 🎯 Hackathon Submission Highlights

### Maximum Appwrite Integration ✅

This project showcases comprehensive use of **all major Appwrite services**:

- 🔐 **Authentication**: Email/password + OAuth2 with GitHub
- 🗄️ **Database**: 4 collections, 34 attributes, 12 optimized indexes
- 📦 **Storage**: 2 buckets with encryption & antivirus
- ⚡ **Realtime**: WebSocket subscriptions for live updates
- 🔒 **Security**: Document-level permissions, encrypted files
- 🚀 **Performance**: Optimized queries, CDN delivery

### Automated Setup with MCP

Includes automated setup script using Appwrite MCP that creates:
- ✅ Complete database schema
- ✅ All collections with attributes
- ✅ Optimized indexes
- ✅ Storage buckets
- ✅ Security permissions

**One command**: `npm run setup:appwrite` - Everything is ready!

## Core Features

- **AI-Powered Badge Descriptions**: Google Gemini generates professional skill descriptions
- **Digital Credential Issuance**: Create verifiable skill badges with evidence
- **Public & Shareable Profiles**: Each user gets a public profile at `/profile/[username]`
- **Peer Endorsements**: Social proof through user endorsements (one per credential)
- **Real-time Updates**: Live endorsement counts and credential updates
- **Discover & Search**: Browse all public verified credentials
- **QR Code Sharing**: Share credentials via QR codes for verification
- **Admin Dashboard**: Review flagged credentials and moderate content
- **Leaderboard**: Rankings based on credentials + endorsements

## How It Works

1. **Sign Up**: Create account with email/password or GitHub OAuth
2. **Create Credential**: Submit skill with evidence (images, PDFs, videos)
3. **AI Generation**: Optional AI-powered description using Google Gemini
4. **Verification**: Credentials get verified status
5. **Endorsements**: Peers can endorse your skills
6. **Share**: Public profile + QR code for verification
7. **Discover**: Browse all verified skills on the platform

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router) + [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Appwrite Cloud](https://appwrite.io/) (Auth, Database, Storage, Realtime)
- **AI**: [Google Gemini](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **State Management**: React Context API + Custom Hooks
- **Type Safety**: TypeScript throughout
- **Forms**: React Hook Form + Zod validation

## Appwrite Architecture

### Database Structure (4 Collections)

1. **Profiles** - User information and statistics
2. **Credentials** - Skill badges with verification status
3. **Endorsements** - Social proof system
4. **Flagged Credentials** - Content moderation

### Storage Buckets (2)

1. **user-avatars** - Profile pictures (5MB, encrypted)
2. **evidence-files** - Credential evidence (25MB, encrypted, antivirus)

### Security Features

- ✅ Document-level permissions
- ✅ Encrypted file storage
- ✅ Antivirus scanning on uploads
- ✅ Unique constraints (username, email)
- ✅ Role-based access control

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) Google Gemini API key

### Quick Setup (2 Minutes)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/skillhouse.git
   cd skillhouse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment is already configured!**
   
   The project comes with `.env.local` pre-configured for Appwrite Cloud.
   
   *Optional*: Add your Gemini API key for AI features:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Appwrite setup is automated!**
   
   All resources have been created automatically:
   ```bash
   npm run setup:appwrite
   ```
   
   This creates:
   - ✅ Database with 4 collections
   - ✅ 34 attributes across all collections
   - ✅ 12 optimized indexes
   - ✅ 2 storage buckets
   - ✅ All security permissions

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   Visit **http://localhost:9002** 🚀

6. **Create your first account:**
   - Go to http://localhost:9002/auth
   - Sign up and start creating credentials!

### Detailed Setup Guide

For comprehensive setup instructions, see **[SETUP.md](./SETUP.md)**

For Appwrite integration details, see **[APPWRITE_INTEGRATION.md](./APPWRITE_INTEGRATION.md)**

## Project Structure

```
skill-house/
├── src/
│   ├── app/                    # Next.js pages (App Router)
│   │   ├── auth/              # Authentication
│   │   ├── dashboard/         # User dashboard
│   │   ├── discover/          # Browse credentials
│   │   ├── profile/           # User profiles
│   │   ├── verify/            # Credential verification
│   │   ├── leaderboard/       # User rankings
│   │   └── admin/             # Admin panel
│   ├── components/            # React components
│   │   ├── dashboard/         # Dashboard components
│   │   └── ui/                # Reusable UI (shadcn)
│   ├── lib/
│   │   └── appwrite/          # Appwrite services
│   │       ├── auth.service.ts
│   │       ├── database.service.ts
│   │       ├── storage.service.ts
│   │       └── realtime.service.ts
│   ├── contexts/              # React contexts
│   │   └── auth-context.tsx   # Auth state
│   ├── hooks/                 # Custom hooks
│   │   └── use-appwrite.ts    # Appwrite hooks
│   └── ai/                    # AI features (Genkit)
├── scripts/
│   └── setup-appwrite.mjs     # Automated setup
└── .env.local                 # Environment config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript checks
- `npm run setup:appwrite` - Create Appwrite resources

## Features Walkthrough

### 1. Authentication
- Sign up with email/password
- Login with existing account
- OAuth2 (Google, GitHub) when configured
- Protected routes with automatic redirects

### 2. Create Credentials
- Navigate to Dashboard → Add Skill
- Fill in skill details
- Use AI to generate descriptions (with Gemini key)
- Upload evidence files
- Submit for verification

### 3. Manage Skills
- View all your credentials in "My Skills"
- See endorsement counts update in real-time
- Share via QR code or public link
- Toggle public/private visibility

### 4. Social Features
- Endorse other users' credentials
- View public profiles
- Check leaderboard rankings
- Discover new skills

### 5. Verification
- Each credential gets unique verification page
- Public `/verify/[skillId]` URL
- QR code for easy sharing
- View issuer profile and evidence

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables from `.env.local`
4. Deploy!

See **[SETUP.md](./SETUP.md#production-deployment)** for detailed instructions.

## Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup guide
- **[APPWRITE_INTEGRATION.md](./APPWRITE_INTEGRATION.md)** - Appwrite integration details
- **[APPWRITE_MCP_SUMMARY.md](./APPWRITE_MCP_SUMMARY.md)** - MCP automation summary
- **[docs/blueprint.md](./docs/blueprint.md)** - Project architecture

## Why SkillHouse?

### The Problem
- Traditional credentials are hard to verify
- No standardized way to prove skills
- Employers struggle to validate claimed abilities
- Skills learned outside formal education often go unrecognized

### Our Solution
- **Verifiable Credentials**: Each skill badge is backed by evidence
- **Social Proof**: Peer endorsements add credibility
- **Public Profiles**: Showcase all your skills in one place
- **AI-Powered**: Objective descriptions and validation
- **Real-time Updates**: See endorsements live
- **Secure**: Appwrite's document-level security

## Appwrite Hackathon 2025

This project was built to demonstrate the power and versatility of Appwrite:

### Services Used
✅ **Authentication** - Email/password + OAuth2  
✅ **Database** - 4 collections with complex relationships  
✅ **Storage** - Encrypted file storage with antivirus  
✅ **Realtime** - Live updates via WebSocket  

### Technical Highlights
✅ Document-level permissions for security  
✅ Automated setup with Appwrite MCP  
✅ Type-safe TypeScript throughout  
✅ Production-ready architecture  
✅ Comprehensive documentation  

### Innovation
✅ Proof-of-skill platform with social validation  
✅ Real-time endorsement system  
✅ AI-powered badge descriptions  
✅ Public verification pages with QR codes  
✅ Leaderboard with live rankings  

## Contributing

Contributions are welcome! This is an open-source project.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- [Appwrite](https://appwrite.io) - Amazing backend platform
- [Next.js](https://nextjs.org) - React framework
- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI capabilities

---

**Built with ❤️ for Appwrite Hackathon 2025**

🚀 **[Try the Demo](#)** | 📖 **[Read the Docs](./SETUP.md)** | 🐛 **[Report Bug](issues)**
