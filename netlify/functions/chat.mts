import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../../src/chatbot/systemPrompt.ts';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages, pagePath } = body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'Missing messages array' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on Netlify environment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const latestMessage = messages[messages.length - 1];
  const previousMessages = messages.slice(0, -1);
  const formattedHistory = previousMessages.map((msg: any) => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.text }],
  }));

  const activePage = pagePath ? pagePath.trim() : '/';
  const messageWithContext = `[Visitor is currently on page: ${activePage}]\n\n${latestMessage.text}`;

  const candidateModels = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let streamResponse: any = null;

  for (const model of candidateModels) {
    try {
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.6,
          maxOutputTokens: 350,
        },
        history: formattedHistory,
      });

      streamResponse = await chat.sendMessageStream({
        message: messageWithContext,
      });
      break;
    } catch (err: any) {
      console.warn(`Model ${model} unavailable on Netlify:`, err?.message);
    }
  }

  if (!streamResponse) {
    return new Response(JSON.stringify({ error: 'No available Gemini model responded' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of streamResponse) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (streamErr: any) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: streamErr?.message || 'Streaming failed' })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
};
