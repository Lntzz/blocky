import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["all", "productivity", "security", "developer", "social", "media", "utility"];

export default function SearchFilter({ search, onSearchChange, category, onCategoryChange }) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search extensions..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 bg-card border-border font-sans text-sm h-11 placeholder:text-muted-foreground/50"
        />
      </div>
      <Tabs value={category} onValueChange={onCategoryChange}>
        <TabsList className="bg-card border border-border h-auto p-1 flex-wrap">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="font-mono text-[10px] tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-1.5"
            >
              {cat.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
