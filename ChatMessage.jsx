import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatMessage({ message, index }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5 text-foreground" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border"
        }`}
      >
        {isUser ? (
          <p className="text-sm font-sans leading-relaxed">{message.content}</p>
        ) : (
          <ReactMarkdown className="text-sm font-sans prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {message.content}
          </ReactMarkdown>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5 text-foreground" />
        </div>
      )}
    </motion.div>
  );
}
