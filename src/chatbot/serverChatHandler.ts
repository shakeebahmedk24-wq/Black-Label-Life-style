import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from './systemPrompt.ts';
import type { IncomingMessage, ServerResponse } from 'http';

interface ChatRequestBody {
  messages?: Array<{
    role: 'user' | 'model';
    text: string;
  }>;
  pagePath?: string;
}

/**
 * Shared HTTP request handler for streaming chat with Gemini 2.5 Flash
 */
export async function handleChatApi(
  req: IncomingMessage & { body?: any },
  res: ServerResponse
): Promise<void> {
  // Only accept POST
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  // Parse body if not pre-parsed by Express
  let body: ChatRequestBody;
  try {
    if (req.body && typeof req.body === 'object') {
      body = req.body;
    } else {
      const buffers: Buffer[] = [];
      for await (const chunk of req) {
        buffers.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      const raw = Buffer.concat(buffers).toString('utf-8');
      body = raw ? JSON.parse(raw) : {};
    }
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid JSON request body' }));
    return;
  }

  const { messages, pagePath } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Missing or invalid messages array' }));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY environment variable');
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the server' }));
    return;
  }

  try {
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

    // Format previous conversation history for @google/genai
    const formattedHistory = previousMessages.map((msg) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    }));

    // Append current page path context to the message turn (do not display in user UI)
    const activePage = pagePath ? pagePath.trim() : '/';
    const messageWithContext = `[Visitor is currently on page: ${activePage}]\n\n${latestMessage.text}`;

    // Candidate models starting with gemini-2.5-flash as requested
    const candidateModels = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let streamResponse: any = null;
    let lastError: any = null;

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
        lastError = err;
        console.warn(`Model ${model} unavailable, trying fallback:`, err?.message?.slice(0, 100));
      }
    }

    if (!streamResponse) {
      throw lastError || new Error('No available Gemini model responded');
    }

    // Set Server-Sent Events headers
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    for await (const chunk of streamResponse) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Error during Gemini chat streaming:', error);

    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: error?.message || 'Chat generation failed' }));
    } else {
      res.write(`data: ${JSON.stringify({ error: error?.message || 'Stream generation failed' })}\n\n`);
      res.end();
    }
  }
}
