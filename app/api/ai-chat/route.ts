import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import WebSocket from "ws"; // 👈 used for MCP connection

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// Utility: Connect to MCP and fetch data dynamically
async function fetchFromMCP(tool: string, payload: Record<string, any>) {
  return new Promise((resolve, reject) => {
    const A2A_WS = process.env.MCP_A2A_WS || "ws://localhost:8765";
    const ws = new WebSocket(A2A_WS);

    const timeout = setTimeout(() => {
      try {
        ws.close();
      } catch {}
      reject(new Error("Timeout waiting for MCP response"));
    }, 15000);

    ws.on("open", () => {
      const message = JSON.stringify({ action: tool, ...payload });
      ws.send(message);
    });

    ws.on("message", (data) => {
      try {
        clearTimeout(timeout);
        const response = JSON.parse(data.toString());
        ws.close();
        resolve(response);
      } catch (err) {
        clearTimeout(timeout);
        ws.close();
        reject(err);
      }
    });

    ws.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 🧠 System prompt for FinBuddy
    const systemPrompt = `You are FinBuddy's AI Mentor - a friendly, knowledgeable financial advisor with a fun Minecraft/gaming theme.

If the user asks anything that needs real financial data (like "my budget", "returns", "portfolio", "simulate future"), 
call the correct MCP tool by returning a JSON like:
{
  "tool_call": "context_request",
  "params": { "context_type": "portfolio" }
}

Otherwise, respond normally in 2-3 lines.`;

    // 🧩 Build chat context
    const messages: any[] = [
      { role: "system", content: systemPrompt },
      ...(conversationHistory || []).map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: message },
    ];

    // 🧠 Step 1: Ask Groq to interpret intent
    const initialResponse = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 300,
    });

    let botMessage = initialResponse.choices[0]?.message?.content || "";

    // 🧠 Step 2: Check if Groq wants to call MCP
    let mcpResponse: any = null;
    try {
      const parsed = JSON.parse(botMessage);
      if (parsed?.tool_call) {
        mcpResponse = await fetchFromMCP(parsed.tool_call, parsed.params);
        console.log("📊 MCP Data:", mcpResponse);

        // Step 3: Ask Groq to summarize data in user-friendly style
        const summarized = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "Summarize this portfolio data in a fun, educational, gaming style." },
            { role: "user", content: JSON.stringify(mcpResponse) },
          ],
        });

        botMessage = summarized.choices[0]?.message?.content || "📈 Got your data, but I couldn’t summarize it!";
      }
    } catch {
      // Not JSON → regular chat
    }

    return NextResponse.json({
      response: botMessage,
      success: true,
      mcpResponse,
    });
  } catch (error: any) {
    console.error("Groq + MCP error:", error);
    return NextResponse.json(
      { error: "Failed to get response", details: error.message },
      { status: 500 }
    );
  }
}
