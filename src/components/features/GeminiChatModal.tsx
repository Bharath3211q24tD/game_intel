import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface GeminiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAudit?: (ref: string) => void;
}

export const GeminiChatModal: React.FC<GeminiChatModalProps> = ({
  isOpen,
  onClose,
  onSelectAudit
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      content:
        'Greetings, Intelligence Officer. I am the GAMEINTEL Forensic Automated Assistant. I can assist you with cross-referencing Trailer 1 coordinates, auditing USPTO patents (such as US11288863B2 water physics), interrogating 2022 raw disclosures, and evaluating SEC Form 10-K fiscal projections. What evidentiary inquiry would you like to investigate today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.8-flash'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'forensic-analyst' | 'cartographer' | 'engine-specialist'>(
    'forensic-analyst'
  );
  const [modelType, setModelType] = useState<'fast' | 'general' | 'complex'>('general');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const query = customPrompt || input.trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content
          })),
          role: selectedRole,
          modelType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Chat request failed');
      }

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Error: ${err.message || 'Failed to communicate with intelligence model.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'system'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const promptSuggestions = [
    'Explain the water dynamics patent US11288863B2 and wave simulation',
    'What does Lucia’s ankle monitor imply about open-world progression?',
    'Triangulate the Port Gellhorn location relative to Vice City Keys',
    'Compare GTA VI Leonida density with the Los Santos benchmark'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <div
        className="w-full max-w-4xl bg-[#181d27] border border-[#584238]/60 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#11141b] border-b border-[#584238]/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb694] text-[20px]">voice_chat</span>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#e0e2ec] uppercase tracking-wider">
              GAMEINTEL GEMINI INTELLIGENCE ASSISTANT
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Role Selector */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="bg-[#10131a] border border-[#584238]/40 text-[#dfc0b3] text-xs px-2.5 py-1 rounded font-['JetBrains_Mono',monospace]"
            >
              <option value="forensic-analyst">Role: Senior Forensic Analyst</option>
              <option value="cartographer">Role: Spatial Cartographer</option>
              <option value="engine-specialist">Role: RAGE 9 Engine Specialist</option>
            </select>

            {/* Model Speed/Depth Selector */}
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value as any)}
              className="bg-[#10131a] border border-[#584238]/40 text-[#ffb694] text-xs px-2.5 py-1 rounded font-['JetBrains_Mono',monospace] font-bold"
            >
              <option value="fast">Fast (gemini-3.1-flash-lite)</option>
              <option value="general">General (gemini-3.8-flash)</option>
              <option value="complex">Deep Reasoning (gemini-3.8-flash / argon)</option>
            </select>

            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-[#272a31] text-[#dfc0b3] transition-colors ml-2"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#0b0e15]/50">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1 font-['JetBrains_Mono',monospace] text-[10px] text-[#a68b7f]">
                  <span>{isUser ? 'INVESTIGATOR' : 'INTELLIGENCE DESK'}</span>
                  {m.modelUsed && <span className="text-[#ffb694] font-semibold">• {m.modelUsed}</span>}
                  <span>• {m.timestamp}</span>
                </div>

                <div
                  className={`max-w-[85%] rounded-lg p-3.5 text-xs sm:text-sm font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-[#e86c28] text-white rounded-tr-xs'
                      : 'bg-[#1f2633] text-[#e0e2ec] border border-[#584238]/30 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>

                  {/* Inline audit citation shortcut if detected */}
                  {!isUser && m.content.includes('EVD-') && onSelectAudit && (
                    <div className="mt-2 pt-2 border-t border-[#584238]/20 flex items-center gap-2 font-mono text-[11px] text-[#ffb694]">
                      <span className="material-symbols-outlined text-[13px]">verified</span>
                      <span>Verified Citation Detected in Analysis</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[#ffb694] bg-[#1f2633] border border-[#584238]/30 p-3 rounded max-w-sm">
              <div className="w-2 h-2 rounded-full bg-[#ffb694] animate-ping" />
              <span>Analyzing cross-referenced evidence databases...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions Bar */}
        <div className="p-2.5 bg-[#11141b] border-t border-[#584238]/30 overflow-x-auto flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans',sans-serif]">
          <span className="text-[10px] font-['JetBrains_Mono',monospace] text-[#a68b7f] shrink-0 uppercase">
            Quick Queries:
          </span>
          {promptSuggestions.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(undefined, promptText)}
              className="px-2.5 py-1 bg-[#1f2633] hover:bg-[#272a31] text-[#dfc0b3] hover:text-[#ffb694] rounded text-xs whitespace-nowrap border border-[#584238]/30 transition-colors"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3.5 bg-[#11141b] border-t border-[#584238]/40 flex items-center gap-3 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about GTA VI claims, RAGE 9 mechanics, Trailer 1 cues, or patents..."
            disabled={isLoading}
            className="flex-1 bg-[#10131a] border border-[#584238]/50 focus:border-[#e86c28] focus:outline-none rounded px-3.5 py-2 text-xs sm:text-sm text-[#e0e2ec] placeholder:text-[#a68b7f]/60 font-['Plus_Jakarta_Sans',sans-serif]"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-[#e86c28] hover:bg-[#f97316] disabled:opacity-50 text-white font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold uppercase rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-[15px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
