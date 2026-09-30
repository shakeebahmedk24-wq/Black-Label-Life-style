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

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Responsive breakpoint tracking
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simple, safe body scroll lock on mobile (does NOT set position: fixed)
  useEffect(() => {
    if (isOpen && isMobile) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen, isMobile]);

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

  // Auto-scroll to bottom of messages
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

  // Auto-focus only on desktop to avoid triggering unwanted mobile keyboard jumps
  useEffect(() => {
    if (isOpen && !isMobile) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile]);

  // Handle Escape key ONLY on desktop keyboards (not mobile virtual keyboards)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isMobile) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMobile]);

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
      const payload = JSON.stringify({
        messages: newMessages.map((m) => ({
          role: m.role,
          text: m.text,
        })),
        pagePath: currentPath,
      });

      let response: Response;

      try {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
          signal: controller.signal,
        });

        // If 404 on Netlify, attempt direct Netlify function path
        if (!response.ok && response.status === 404) {
          response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: payload,
            signal: controller.signal,
          });
        }
      } catch (err: unknown) {
        // Fallback to Netlify function on direct fetch network error
        response = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
          signal: controller.signal,
        });
      }

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

  const showChips = messages.length === 1 && messages[0].id === 'welcome-1';

  return (
    <>
      {/* CHAT MODAL / PANEL */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Black Label Concierge Chat"
          aria-modal="true"
          className={`z-[100] flex flex-col bg-[#090b0e] select-text overflow-hidden ${
            isMobile
              ? 'fixed inset-0 w-full h-[100dvh]'
              : 'fixed bottom-22 right-6 w-[380px] h-[560px] max-h-[calc(100vh-6rem)] rounded-2xl border border-[#c5a059]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(197,160,89,0.15)] backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95 origin-bottom-right'
          }`}
        >
          {/* HEADER (shrink-0 prevents header from being compressed) */}
          <div
            style={{ paddingTop: isMobile ? 'max(0.75rem, env(safe-area-inset-top))' : undefined }}
            className="px-4 sm:px-5 py-3.5 bg-[#0b0d11] border-b border-[#c5a059]/20 flex items-center justify-between shrink-0 select-none"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#12151c] border border-[#c5a059]/40 shadow-[0_0_10px_rgba(197,160,89,0.15)] shrink-0">
                <span className="font-serif font-bold text-xs tracking-wider text-[#c5a059]">BL</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-[#090b0e]"></span>
              </div>
              <div>
                <h2 className="font-serif text-[15px] sm:text-base font-semibold tracking-wide text-[#faf8f5] leading-tight">
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

            <div className="flex items-center gap-1">
              {/* CLOSE BUTTON */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close concierge chat"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#dcd6ca] hover:text-[#faf8f5] active:text-[#c5a059] hover:bg-white/[0.05] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* MESSAGES LIST (min-h-0 allows flex child to shrink properly when keyboard opens) */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 overscroll-contain scroll-smooth">
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
                            <div className="mt-3 pt-2.5 border-t border-[#c5a059]/20 flex items-center justify-between gap-2">
                              <span className="text-[11px] font-mono text-[#a69f91]">Network interrupted</span>
                              <button
                                type="button"
                                onClick={() => handleSendMessage(lastFailedPrompt)}
                                className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] active:scale-95 rounded font-semibold transition-all shrink-0"
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
                    <div className="pt-1 pb-1 space-y-2 pl-0.5">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]/70">
                        Suggested Inquiries
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_REPLIES.map((chip, chipIdx) => (
                          <button
                            key={chipIdx}
                            type="button"
                            onClick={() => handleSendMessage(chip)}
                            className="text-left text-xs text-[#e6e0d4] hover:text-[#faf8f5] bg-[#121620] hover:bg-[#c5a059]/15 active:bg-[#c5a059]/25 border border-[#c5a059]/30 hover:border-[#c5a059] px-3.5 py-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
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

          {/* INPUT & SEND FORM (shrink-0 guarantees it always stays visible above keyboard) */}
          <div
            style={{ paddingBottom: isMobile ? 'max(0.75rem, env(safe-area-inset-bottom))' : undefined }}
            className="p-3 bg-[#0b0d11] border-t border-[#c5a059]/20 shrink-0"
          >
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
                  onFocus={() => {
                    // Smoothly ensure latest messages are visible when typing
                    setTimeout(() => {
                      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, 120);
                  }}
                  placeholder="Ask the concierge..."
                  rows={1}
                  aria-label="Ask Black Label Concierge"
                  disabled={isLoading}
                  /* 16px font-size on mobile completely prevents iOS Safari viewport zooming! */
                  className="w-full resize-none py-2.5 pl-3.5 pr-2 bg-[#121620] text-[#faf8f5] placeholder-[#8f887c] text-base sm:text-sm rounded-xl border border-white/10 focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059] transition-all disabled:opacity-50"
                  style={{ maxHeight: '100px' }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
                className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-[#c5a059] text-[#060709] hover:bg-[#dfc182] active:scale-95 disabled:opacity-40 disabled:hover:bg-[#c5a059] disabled:cursor-not-allowed transition-all duration-200 shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
              >
                <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#8f887c] px-1 select-none">
              <span className="hidden sm:inline">Shift+Enter for newline</span>
              <span className="sm:hidden">Send on submit</span>
              <span>Discreet & Encrypted</span>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON (When closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Black Label Concierge Chat"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0b0d11] text-[#faf8f5] border border-[#c5a059]/40 hover:border-[#c5a059] shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_4px_30px_rgba(197,160,89,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
          >
            {/* Glow halo */}
            <span className="absolute inset-0 rounded-full bg-[#c5a059]/10 group-hover:bg-[#c5a059]/20 transition-colors pointer-events-none"></span>

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

            {/* Status dot */}
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c5a059] border-2 border-[#0b0d11]"></span>
            </span>
          </button>
        </div>
      )}
    </>
  );
};
