'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "👋 Greetings, adventurer! I'm your Financial NPC Guide powered by AI. Ask me anything about budgeting, saving, or investing to level up your money skills!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How to budget?",
    "Saving tips",
    "Investing basics",
    "Emergency fund"
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-6), // Send last 6 messages for context
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      return data.response;
    } catch (error: any) {
      console.error('AI chat error:', error);
      return "⚠️ Oops! My wisdom scroll got damaged. Please try again, brave adventurer! (Error: " + error.message + ")";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(input);
      
      const botResponse: Message = {
        sender: 'bot',
        text: aiResponse
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        sender: 'bot',
        text: "⚠️ I encountered an error, adventurer. Please try again!"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="pixel-border border-orange-500 rounded-2xl bg-gray-800/50 glow-orange overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 200px)', maxHeight: '700px' }}>
        {/* Header */}
        <div className="pixel-border-b border-orange-500 p-4 md:p-6 bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="pixel-border border-orange-400 rounded-xl p-3 bg-orange-500/10">
              <Bot className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-sm md:text-base text-white" style={{ fontFamily: 'var(--font-pixel)' }}>
                🤖 AI Financial Mentor
              </h2>
              <p className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
                Your NPC Guide to Financial Wisdom
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] pixel-border rounded-xl p-3 md:p-4 ${
                  message.sender === 'user'
                    ? 'border-emerald-500 bg-emerald-500/20 glow-emerald'
                    : 'border-blue-500 bg-blue-500/20 glow-blue'
                }`}
              >
                <p className="text-xs md:text-sm text-white leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'var(--font-pixel)' }}>
                  {message.text}
                </p>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] md:max-w-[75%] pixel-border rounded-xl p-3 md:p-4 border-blue-500 bg-blue-500/20 glow-blue">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                  <p className="text-xs md:text-sm text-blue-400" style={{ fontFamily: 'var(--font-pixel)' }}>
                    Consulting wisdom scrolls...
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="px-4 pb-2">
          <p className="text-[10px] text-gray-400 mb-2" style={{ fontFamily: 'var(--font-pixel)' }}>
            Quick Questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="pixel-border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 hover:bg-gray-600 transition-all text-[10px] text-gray-300"
                style={{ fontFamily: 'var(--font-pixel)' }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 bg-gray-900 pixel-border-t border-orange-500">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your question..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gray-700 pixel-border border-gray-600 rounded-xl text-white text-sm focus:border-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-pixel)' }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="pixel-border border-emerald-500 rounded-xl px-4 md:px-6 py-3 bg-emerald-500 hover:bg-emerald-600 transition-all glow-emerald flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
