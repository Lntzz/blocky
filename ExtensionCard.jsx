import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function ExtensionCard({ extension, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`group relative border rounded-xl p-5 transition-all duration-300 ${
        extension.enabled
          ? "border-border bg-card hover:border-foreground/20 glow-border"
          : "border-border/50 bg-card/30 opacity-60 hover:opacity-80"
      }`}
    >
      {/* Status indicator line */}
      <div
        className={`absolute top-0 left-6 right-6 h-px transition-all duration-300 ${
          extension.enabled ? "bg-foreground/30" : "bg-transparent"
        }`}
      />

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div
            className={`text-2xl w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all ${
              extension.enabled ? "bg-accent" : "bg-muted/50"
            }`}
          >
            {extension.icon_emoji || "🧩"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-sans text-sm font-semibold text-foreground truncate">
                {extension.name}
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground">
                v{extension.version || "1.0.0"}
              </span>
            </div>
 
