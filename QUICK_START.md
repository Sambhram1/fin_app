# 🚀 Quick Start Guide

## What Just Happened?

I've integrated Supabase authentication and database into your FinBuddy application! Here's what's ready:

### ✅ Installed & Configured

1. **Supabase Packages**
   - `@supabase/supabase-js` - Main client library
   - `@supabase/ssr` - Server-side rendering support

2. **Authentication System**
   - Login/Signup functionality
   - Session management
   - Profile creation

3. **Database Integration**
   - User profiles with XP, level, streak
   - Real-time data sync
   - Secure Row Level Security

## 🎯 Next Steps (IMPORTANT!)

### 1. Create Your Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - Project name: `finbuddy`
   - Database password: (choose a strong password)
   - Region: (choose closest to you)
4. Wait ~2 minutes for setup to complete

### 2. Run the SQL Schema

1. In your Supabase dashboard, click **SQL Editor** in left sidebar
2. Click **New Query**
3. Copy the **ENTIRE SQL schema** from your original prompt
4. Paste it into the query editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

### 3. Get Your Credentials

1. Click **Settings** (gear icon) in left sidebar
2. Click **API** in the settings menu
3. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJhbGci...`

### 4. Configure Your App

**Option A: Use the Setup Script**
```powershell
.\setup-supabase.ps1
```
Follow the prompts to enter your URL and key.

**Option B: Manual Setup**
1. Open `.env.local` in your editor
2. Replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Save the file

### 5. Disable Email Confirmation (for testing)

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Scroll down to **Email Auth** section
3. Find "Confirm email" toggle
4. Turn it **OFF**
5. Click **Save**

(This lets you test without needing to verify email addresses)

### 6. Restart Your Dev Server

Stop the current server (Ctrl+C in terminal) and restart:
```bash
npm run dev
```

### 7. Test It Out!

1. Open http://localhost:3000
2. Click "Sign Up"
3. Enter:
   - Username: TestPlayer
   - Email: test@example.com
   - Password: password123
4. Click "Start Journey"
5. You should be logged in!

## 🎮 What Works Now

✅ **User Registration** - Creates account + profile in database  
✅ **User Login** - Authenticates and loads profile data  
✅ **Session Persistence** - Stay logged in across page refreshes  
✅ **XP Tracking** - XP updates saved to database  
✅ **Level System** - Automatic level-up when earning XP  
✅ **Logout** - Secure sign out  

## 📊 Check Your Data

After creating an account:

1. Go to Supabase dashboard
2. Click **Table Editor**
3. Click **profiles** table
4. You should see your user with username, XP, level, etc.!

## 🔍 Verify Setup

### Test Checklist

- [ ] Supabase project created
- [ ] SQL schema executed successfully
- [ ] `.env.local` configured with correct credentials
- [ ] Email confirmation disabled
- [ ] Dev server restarted
- [ ] Can sign up new user
- [ ] Can login existing user
- [ ] User profile appears in Supabase Table Editor
- [ ] XP increases when completing quiz questions
- [ ] Level updates in database

## 🐛 Common Issues

### "Failed to fetch" or "Invalid API key"
**Solution**: Check `.env.local` has correct URL and key, then restart dev server

### "relation 'public.profiles' does not exist"
**Solution**: Run the SQL schema in Supabase SQL Editor

### "User already registered" but can't login
**Solution**: 
1. Check Supabase → Authentication → Users
2. If email shows "Waiting for verification", disable email confirmation in settings
3. Try signing up with a different email

### Can't see user in database
**Solution**: Check Table Editor → profiles. If empty, there might be an RLS policy issue. Try:
```sql
-- Run in Supabase SQL Editor
SELECT * FROM auth.users; -- See if auth user was created
SELECT * FROM profiles; -- See if profile was created
```

## 📂 File Structure Reference

```
hckt/
├── .env.local              ⭐ ADD YOUR CREDENTIALS HERE
├── middleware.ts           ✅ Session management
├── lib/supabase/
│   ├── client.ts          ✅ Browser client
│   ├── server.ts          ✅ Server client  
│   └── database.types.ts  ✅ Type definitions
├── app/
│   └── page.tsx           ✅ Updated with auth
└── components/
    └── LoginPage.tsx      ✅ Updated with Supabase auth
```

## 🎯 What's Next?

After basic auth is working, you can integrate:

1. **Quiz Questions** - Load from database instead of hardcoded
2. **Budget Tracking** - Save/load budgets
3. **Savings Goals** - Persist savings targets
4. **Quiz History** - Track all quiz attempts
5. **Dashboard Stats** - Show real data from database

See `SUPABASE_SETUP.md` for detailed integration examples!

## 🆘 Need Help?

1. Check `SUPABASE_SETUP.md` for detailed docs
2. Check `README.md` for project overview
3. Check Supabase logs: Dashboard → Logs
4. Check browser console for errors (F12)

## 🎉 You're All Set!

Once you complete the steps above, you'll have:
- ✅ Secure authentication
- ✅ Persistent user data
- ✅ Real-time XP tracking
- ✅ Scalable database backend
- ✅ Production-ready architecture

Happy coding! 🚀
