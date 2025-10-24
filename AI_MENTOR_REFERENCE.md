# 🎮 AI Mentor - Quick Reference

## ✅ Integration Complete!

Your AI Mentor now uses **Groq AI** with **Llama 3.3 70B** model for intelligent financial advice!

---

## 🚀 Quick Setup (3 Steps)

### 1. Get Groq API Key
→ https://console.groq.com/keys  
→ Click "Create API Key"  
→ Copy the key (starts with `gsk_...`)

### 2. Add to `.env.local`
```env
GROQ_API_KEY="gsk_your_key_here"
```

### 3. Restart Server
```bash
npm run dev
```

---

## 🤖 System Prompt Summary

The AI is configured as a **Financial NPC Guide** with:

### Personality
- Gaming/Minecraft themed language
- Uses metaphors: diamonds = savings, XP = growth
- Encouraging and supportive
- Concise responses (2-3 sentences)

### Expertise
- 50-30-20 budgeting
- Saving strategies
- Investing basics
- Debt management
- Credit scores
- Retirement planning

### Safety
- No specific stock picks
- Educational advice only
- Recommends professional advisors for major decisions

---

## 💬 Example Conversations

**Budget Question:**
> User: "How do I create a budget?"  
> AI: "⚔️ Use the 50-30-20 rule as your sword! 50% for NEEDS (rent, food), 30% for WANTS (fun stuff), 20% for SAVINGS (your diamond vault). Track your loot for a month to see where coins go, then adjust. Start simple - perfection comes later!"

**Investing Question:**
> User: "Should I invest in stocks?"  
> AI: "📈 Stocks are powerful but risky solo - think boss fight! Start with index funds instead (like having a party of heroes). They're diversified, lower risk, and historically grow ~10% yearly. Before investing: 1) Have emergency fund, 2) Clear high-interest debt. Then invest what you won't need for 5+ years!"

**Debt Question:**
> User: "How to pay off credit card debt?"  
> AI: "⚡ Credit card debt is like poison damage - stop it ASAP! Method 1: Avalanche (highest interest first = save most money). Method 2: Snowball (smallest balance first = quick wins). Pay MORE than minimums, avoid new charges, and consider balance transfer to 0% APR card. You got this, warrior!"

---

## 🔧 Technical Details

### API Route
- **Endpoint**: `POST /api/ai-chat`
- **Location**: `app/api/ai-chat/route.ts`
- **Security**: API key server-side only

### Request Format
```typescript
{
  message: string,
  conversationHistory: Message[] // Last 6 messages
}
```

### Response Format
```typescript
{
  response: string,
  success: boolean
}
```

### Model Settings
- **Model**: `llama-3.3-70b-versatile`
- **Temperature**: 0.7
- **Max Tokens**: 300
- **Speed**: ~300 tokens/second ⚡

---

## 🎨 UI Features

✅ Real-time AI responses  
✅ Loading animation ("Consulting wisdom scrolls...")  
✅ Auto-scroll to newest messages  
✅ Conversation context (remembers last 6 messages)  
✅ Quick question buttons  
✅ Enter key to send  
✅ Disabled input while loading  
✅ Error handling with friendly messages  

---

## 📊 Rate Limits (Free Tier)

- **30** requests/minute
- **14,400** tokens/minute  
- **1,000** requests/day

**Plenty for development!**

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid API key" | Add `gsk_...` key to `.env.local` and restart |
| "Rate limit exceeded" | Wait 1 minute (free tier limit) |
| No response | Check browser console (F12) for errors |
| Generic answers | Ask specific financial questions |
| Won't redirect | System prompt prevents off-topic discussion |

---

## 🎯 Test Questions to Try

### Beginner
- "How do I start saving money?"
- "What is compound interest?"
- "Why do I need an emergency fund?"

### Intermediate
- "What's the difference between Roth and Traditional IRA?"
- "How much should I save for retirement?"
- "Should I pay off debt or invest first?"

### Advanced
- "Explain dollar-cost averaging"
- "What's a good asset allocation for my age?"
- "How do I rebalance my portfolio?"

### Gaming Theme Test
- "How is saving like Minecraft?"
- "What's my financial XP strategy?"
- "How do I level up my money skills?"

---

## 📂 Files Modified

```
✅ app/api/ai-chat/route.ts      (NEW - API endpoint)
✅ components/AIMentor.tsx        (UPDATED - AI integration)
✅ .env.local                     (UPDATED - API key)
```

---

## 🌟 What Makes This Special

### Groq Advantages
1. **⚡ Speed** - 10x faster than GPT-4
2. **💰 Cost** - Free tier + cheap paid
3. **🧠 Quality** - Llama 3.3 70B is powerful
4. **🔓 Open** - Open-source models

### Custom System Prompt
- **850+ words** of detailed instructions
- Financial education expert
- Gaming personality
- Safety guardrails
- Actionable advice focus

### Smart Context
- Sends last 6 messages
- Maintains conversation flow
- Understands follow-up questions

---

## 🚀 Next Steps

1. **Add API Key** to `.env.local`
2. **Restart Server** (`npm run dev`)
3. **Test Chat** in AI Guide tab
4. **Try Examples** from above
5. **Customize Prompt** if needed (edit `route.ts`)

---

## 📚 Documentation

- **Setup Guide**: `GROQ_SETUP.md`
- **Groq Console**: https://console.groq.com
- **Groq Docs**: https://console.groq.com/docs

---

**Ready to go! Just add your API key and you'll have an AI-powered financial mentor! 🎉**
