import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Bot, Power, Settings } from "lucide-react";

const navItems = [
  { icon: LayoutGrid, label: "Extensions", path: "/Dashboard" },
  { icon: Bot, label: "AI Assistant", path: "/AIAssistant" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50 backdrop-blur-sm">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Power className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-mono text-sm font-bold tracking-wider text-foreground">
              EXT<span className="text-muted-foreground">.CTRL</span>
            </h1>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">
              EXTENSION MANAGER
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs tracking-wide transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label.toUpperCase()}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
          <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </aside>
  );
}
