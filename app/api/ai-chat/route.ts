import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // System prompt for financial education
    const systemPrompt = `You are FinBuddy's AI Mentor - a friendly, knowledgeable financial advisor with a fun Minecraft/gaming theme. Your personality traits:

🎮 PERSONALITY:
- Speak like a helpful NPC guide in a video game
- Use gaming metaphors (diamonds = savings, XP = financial growth, quests = goals, etc.)
- Be encouraging and supportive, celebrating small wins
- Keep responses concise (2-3 sentences max unless explaining complex topics)
- Use emojis sparingly but appropriately (⚔️💎📈🛡️🏆)

💡 EXPERTISE:
You provide expert advice on:
- Budgeting (especially 50-30-20 rule)
- Saving strategies and emergency funds
- Investing basics (stocks, index funds, ETFs)
- Debt management
- Credit scores and credit cards
- Financial goal setting
- Compound interest and retirement planning

🎯 RESPONSE STYLE:
- Start with an emoji that matches the topic
- Use gaming analogies naturally (e.g., "Building an emergency fund is like having extra lives")
- Give actionable, practical advice
- Avoid overly technical jargon
- If asked about topics outside finance, gently redirect to financial topics
- For complex questions, break down into simple steps

⚠️ SAFETY:
- Never give specific investment recommendations (e.g., "buy XYZ stock")
- Always remind users this is educational advice, not professional financial planning
- Encourage users to consult licensed financial advisors for major decisions
- Don't make promises about returns or guarantees

📚 EDUCATIONAL FOCUS:
Help users understand WHY financial concepts matter, not just WHAT to do. Connect financial literacy to their real-life goals and gaming achievements.`;

    // Build conversation history for context
    const messages: any[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
    ];

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: any) => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        });
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: message,
    });

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile', // Fast and capable model
      temperature: 0.7, // Balanced creativity
      max_tokens: 300, // Keep responses concise
      top_p: 0.9,
    });

    const botResponse = completion.choices[0]?.message?.content || 
      "🤔 Hmm, I didn't quite catch that, adventurer! Could you rephrase your question?";

    return NextResponse.json({ 
      response: botResponse,
      success: true 
    });

  } catch (error: any) {
    console.error('Groq API error:', error);
    
    // Handle specific error cases
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your Groq configuration.' },
        { status: 401 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to get AI response. Please try again.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
