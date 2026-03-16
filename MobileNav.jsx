import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Bot, Power } from "lucide-react";

const navItems = [
  { icon: LayoutGrid, label: "Extensions", path: "/Dashboard" },
  { icon: Bot, label: "AI", path: "/AIAssistant" },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/90 backdrop-blur-md">
      <nav className="flex items-center justify-around py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-mono text-[9px] tracking-wider">
                {item.label.toUpperCase()}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
