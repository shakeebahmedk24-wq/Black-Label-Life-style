import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MarkdownMessage } from './MarkdownMessage.tsx';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  role: 'model',
  text: 'Welcome to Black Label. How may I assist you today?',
};

const QUICK_REPLIES = [
  'Explore the 8 divisions',
  'Book an in-residence dinner',
  'Luxury car & jewelry rentals',
  'Start a concierge request',
];

const STORAGE_KEY_MESSAGES = 'blacklabel_chat_messages_v1';
const STORAGE_KEY_OPEN = 'blacklabel_chat_open_v1';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_OPEN) === 'true';
    } catch {
      return false;
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY_MESSAGES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read chat history from sessionStorage', e);
    }
    return [INITIAL_MESSAGE];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not save chat history to sessionStorage', e);
    }
  }, [messages]);

  // Sync open state to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_OPEN, isOpen ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end',
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, streamingText, isLoading, scrollToBottom]);

  // Focus input when opened on non-mobile
  useEffect(() => {
    if (isOpen && window.innerWidth >= 640) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Reset chat
  const handleResetChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setStreamingText('');
    setLastFailedPrompt(null);
    const freshMessages = [INITIAL_MESSAGE];
    setMessages(freshMessages);
    try {
      sessionStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(freshMessages));
    } catch {
      // ignore
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : inputValue;
    const trimmed = rawText.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      text: trimmed,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setStreamingText('');
    setLastFailedPrompt(null);

    // Current page path context
    const currentPath = window.location.pathname || '/';

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          pagePath: currentPath,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body returned');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let accumulatedReply = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        // Keep the last partial line in buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine.startsWith(':')) continue;

          if (trimmedLine.startsWith('data: ')) {
            const dataStr = trimmedLine.slice(6).trim();
            if (dataStr === '[DONE]') {
              break;
            }

            try {
              const data = JSON.parse(dataStr);
              if (data.error) {
                throw new Error(data.error);
              }
              if (data.text) {
                accumulatedReply += data.text;
                setStreamingText(accumulatedReply);
              }
            } catch (err: unknown) {
              if (err instanceof Error && err.message !== 'Unexpected end of JSON input') {
                console.error('Error parsing SSE chunk', err);
              }
            }
          }
        }
      }

      // Finish streaming and add bot message
      if (accumulatedReply.trim()) {
        const botMessage: ChatMessage = {
          id: 'bot-' + Date.now(),
          role: 'model',
          text: accumulatedReply.trim(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error('Empty response received');
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        // User aborted, do nothing
        return;
      }
      console.error('Concierge chat error:', err);
      setLastFailedPrompt(trimmed);
      const errorMessage: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'model',
        text: "I'm having trouble connecting. Please email concierge@blacklabel.life and our team will respond within two hours.",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setStreamingText('');
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Only show quick-reply chips under the very first message if there are no subsequent messages
  const showChips = messages.length === 1 && messages[0].id === 'welcome-1';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* CHAT PANEL */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Black Label Concierge Chat"
          aria-modal="true"
          className="pointer-events-auto w-full max-sm:fixed max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:rounded-none sm:w-[380px] sm:h-[560px] mb-4 sm:mb-4 bg-[#090b0e]/98 backdrop-blur-2xl border border-[#c5a059]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(197,160,89,0.15)] flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 origin-bottom-right"
        >
          {/* HEADER */}
          <div className="px-5 py-4 bg-[#0b0d11]/90 border-b border-[#c5a059]/20 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#12151c] border border-[#c5a059]/40 shadow-[0_0_10px_rgba(197,160,89,0.15)]">
                <span className="font-serif font-bold text-xs tracking-wider text-[#c5a059]">BL</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-[#090b0e]"></span>
              </div>
              <div>
                <h2 className="font-serif text-[15px] font-semibold tracking-wide text-[#faf8f5] leading-tight">
                  Black Label Concierge
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse"></span>
                  <span className="text-[11px] font-mono text-[#c5a059]/90 tracking-wider">
                    Virtual Concierge · Online
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* CLOSE BUTTON */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close concierge chat"
                className="p-1.5 text-[#dcd6ca] hover:text-[#faf8f5] hover:bg-white/[0.05] rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* MESSAGES LIST */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              const isFirstBotMessage = !isUser && index === 0;

              return (
                <div key={msg.id} className="space-y-3">
                  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] text-xs sm:text-sm ${
                        isUser
                          ? 'bg-[#c5a059] text-[#060709] font-medium rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-sm'
                          : 'bg-[#121620] border border-[#c5a059]/20 text-[#e6e0d4] rounded-2xl rounded-tl-xs px-4 py-3 shadow-md'
                      }`}
                    >
                      {isUser ? (
                        <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                      ) : (
                        <div>
                          <MarkdownMessage content={msg.text} />
                          {msg.isError && lastFailedPrompt && (
                            <div className="mt-3 pt-2.5 border-t border-[#c5a059]/20 flex items-center justify-between">
                              <span className="text-[11px] font-mono text-[#a69f91]">Network interrupted</span>
                              <button
                                type="button"
                                onClick={() => handleSendMessage(lastFailedPrompt)}
                                className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] rounded font-semibold transition-colors"
                              >
                                Retry
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* QUICK-REPLY CHIPS UNDER FIRST MESSAGE */}
                  {isFirstBotMessage && showChips && (
                    <div className="pt-1 pb-1 space-y-1.5 pl-1">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]/70">
                        Suggested Inquiries
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_REPLIES.map((chip, chipIdx) => (
                          <button
                            key={chipIdx}
                            type="button"
                            onClick={() => handleSendMessage(chip)}
                            className="text-left text-[11px] sm:text-xs text-[#e6e0d4] hover:text-[#faf8f5] bg-[#121620]/90 hover:bg-[#c5a059]/15 border border-[#c5a059]/30 hover:border-[#c5a059] px-3 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* LIVE STREAMING RESPONSE */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-[#121620] border border-[#c5a059]/20 text-[#e6e0d4] rounded-2xl rounded-tl-xs px-4 py-3 shadow-md text-xs sm:text-sm">
                  {streamingText ? (
                    <MarkdownMessage content={streamingText} />
                  ) : (
                    <div className="flex items-center gap-1.5 py-1 px-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-bounce"></span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT & SEND FORM */}
          <div className="p-3 bg-[#0b0d11]/95 border-t border-[#c5a059]/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask the concierge..."
                  rows={1}
                  aria-label="Ask Black Label Concierge"
                  disabled={isLoading}
                  className="w-full resize-none py-2.5 pl-3.5 pr-2 bg-[#121620] text-[#faf8f5] placeholder-[#8f887c] text-xs sm:text-sm rounded-xl border border-white/10 focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059] transition-all disabled:opacity-50"
                  style={{ maxHeight: '100px' }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#c5a059] text-[#060709] hover:bg-[#dfc182] disabled:opacity-40 disabled:hover:bg-[#c5a059] disabled:cursor-not-allowed transition-all duration-200 shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
              >
                <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#8f887c] px-1">
              <span>Shift+Enter for newline</span>
              <span>Discreet & Encrypted</span>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON (Site-Wide) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close Black Label Concierge Chat' : 'Open Black Label Concierge Chat'}
        aria-expanded={isOpen}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0b0d11] text-[#faf8f5] border border-[#c5a059]/40 hover:border-[#c5a059] shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_4px_30px_rgba(197,160,89,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
      >
        {/* Glow halo */}
        <span className="absolute inset-0 rounded-full bg-[#c5a059]/10 group-hover:bg-[#c5a059]/20 transition-colors pointer-events-none"></span>

        {isOpen ? (
          <svg className="w-6 h-6 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-6 h-6 text-[#c5a059] transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        )}

        {/* Status dot */}
        <span className="absolute top-1 right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c5a059] border-2 border-[#0b0d11]"></span>
        </span>
      </button>
    </div>
  );
};
