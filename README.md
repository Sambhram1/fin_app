# FinBuddy - Minecraft-Themed Financial Education Platform

A gamified financial literacy platform built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## 🎮 Features

- **Authentication System** - Secure login/signup with Supabase
- **Dashboard** - Track XP, levels, streak, and badges
- **Quiz Battle** - Earn XP by answering financial trivia
- **Budget Crafter** - 50-30-20 budget calculator
- **Future Simulator** - Compound interest projections
- **AI Mentor** - Financial advice chatbot

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Press Start 2P (Pixelated gaming aesthetic)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

```
hckt/
├── app/
│   ├── layout.tsx          # Root layout with font integration
│   ├── page.tsx             # Main app with routing & state
│   └── globals.css          # Global styles & utilities
├── components/
│   ├── LoginPage.tsx        # Authentication UI
│   ├── Header.tsx           # Navigation & user stats
│   ├── Dashboard.tsx        # Main hub with charts
│   ├── QuizBattle.tsx       # Financial trivia game
│   ├── BudgetCrafter.tsx    # Budget calculator
│   ├── FutureSimulator.tsx  # Investment projections
│   └── AIMentor.tsx         # AI chatbot
├── lib/
│   └── supabase/
│       ├── client.ts        # Browser client
│       ├── server.ts        # Server client
│       ├── middleware.ts    # Session handler
│       └── database.types.ts # TypeScript types
├── middleware.ts            # Next.js middleware
├── .env.local              # Environment variables
├── SUPABASE_SETUP.md       # Setup guide
└── setup-supabase.ps1      # Setup script
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new project at https://supabase.com
   - Run the SQL schema (provided in your prompt) in Supabase SQL Editor
   - Get your Project URL and anon key from Settings → API

3. **Configure environment variables**
   
   Run the setup script:
   ```powershell
   .\setup-supabase.ps1
   ```
   
   Or manually edit `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Disable email confirmation (for testing)**
   - In Supabase Dashboard: Authentication → Settings
   - Under "Email Auth", disable "Confirm email"
   - Click Save

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   - Navigate to http://localhost:3000
   - Create an account and start playing!

## 📊 Database Schema

See the SQL schema you provided. It includes:

- **profiles** - User game data (XP, level, streak)
- **quiz_questions** & **quiz_options** - Quiz content
- **quiz_attempts** & **quiz_attempt_answers** - Quiz history
- **budgets** & **budget_entries** - Budget tracking
- **savings_goals** - Savings targets
- **future_simulations** - Saved projections
- **user_dashboard_summary** - Aggregated stats view

All tables have Row Level Security (RLS) enabled for data privacy.

## 🎨 Design System

### Colors
- **Emerald** (#10B981) - Savings, primary actions
- **Blue** (#3B82F6) - Quiz, knowledge
- **Purple** (#8B5CF6) - Predictions, future
- **Orange** (#F59E0B) - AI assistance
- **Red** - Warnings, logout

### Custom Utilities
- `.pixel-border` - 4px solid borders
- `.glow-emerald/blue/purple/orange` - Glowing box shadows
- Custom scrollbar styling
- Press Start 2P font via `var(--font-pixel)`

## 🔐 Security

- Row Level Security (RLS) on all tables
- JWT-based authentication
- Secure password hashing
- Automatic session management
- HTTPS in production

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Current Integration Status

✅ **Completed**
- User authentication (signup/login)
- Profile management
- XP & level tracking
- Session persistence
- UI components for all features

⏳ **In Progress**
- Quiz database integration
- Budget data persistence
- Savings goals tracking
- Simulation history

## 📖 Documentation

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Detailed Supabase setup guide
- **[copilot-instructions.md](./.github/copilot-instructions.md)** - Project context

## 🐛 Troubleshooting

### "Failed to fetch" error
- Check `.env.local` has correct credentials
- Restart dev server after editing `.env.local`

### "relation does not exist"
- Run the SQL schema in Supabase SQL Editor
- Verify all tables were created

### Can't login after signup
- Disable email confirmation in Supabase Auth settings
- Check Supabase logs for errors

## 🤝 Contributing

This is a personal project, but feel free to fork and customize!

## 📄 License

MIT License - feel free to use for learning purposes

## 🎮 Game Mechanics

- **XP System**: Earn 100 XP per correct quiz answer
- **Leveling**: Level up every 500 XP
- **Badges**: Unlock achievements based on progress
  - First Save (100 XP)
  - Quiz Master (Level 3)
  - Budget Pro (Level 5)
- **Streak**: Track consecutive days of activity

## 🌟 Future Enhancements

- [ ] Social features (leaderboards)
- [ ] More quiz categories
- [ ] Real investment API integration
- [ ] Mobile app (React Native)
- [ ] Multiplayer quiz battles
- [ ] Achievement system expansion
- [ ] Data export (PDF reports)

---

Built with ⚡ by [Your Name]
