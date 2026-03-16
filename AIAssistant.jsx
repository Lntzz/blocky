import React, { useState, useRef, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, Loader2, Sparkles } from "lucide-react";
import ChatMessage from "../components/ai/ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";

const SUGGESTIONS = [
  "Which extensions should I disable for better performance?",
  "Summarize my current extensions",
  "What security extensions do you recommend?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const { data: extensions = [] } = useQuery({
    queryKey: ["extensions"],
    queryFn: () => base44.entities.Extension.list(),
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const extSummary = extensions
      .map(
        (e) =>
          `- ${e.name} (${e.category || "unknown"}, ${e.enabled ? "enabled" : "disabled"}, v${e.version || "1.0"}, ${e.size_kb || 0}KB)`
      )
      .join("\n");

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an AI assistant for a browser extension manager called EXT.CTRL. 
You help users manage their extensions, recommend which to enable/disable, and provide insights.
Be concise, technical but friendly, and use a slightly futuristic tone.

Current extensions:
${extSummary}

User message: ${text}`,
    });

    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 md:p-10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center">
            <Bot className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h1 className="font-mono text-lg font-bold tracking-tight text-foreground">
              AI ASSISTANT
            </h1>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">
              POWERED BY NEURAL ENGINE
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-10 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-8 py-16">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl border border-border bg-card flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-foreground animate-pulse-glow" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-mono text-sm text-foreground">
                HOW CAN I HELP?
              </p>
              <p className="font-sans text-xs text-muted-foreground max-w-sm">
                Ask me about your extensions — I can recommend what to enable,
                disable, or optimize.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="font-sans text-xs border border-border rounded-full px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} index={i} />
          ))
        )}

        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center">
              <Loader2 className="w-3.5 h-3.5 text-foreground animate-spin" />
            </div>
            <div className="bg-card border border-border rounded-xl px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 md:px-10">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your extensions..."
            className="flex-1 bg-card border-border font-sans text-sm h-11 placeholder:text-muted-foreground/50"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-11 w-11 p-0 bg-primary text-primary-foreground hover:bg-primary/80"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
