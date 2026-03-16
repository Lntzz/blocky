import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StatsBar from "../components/extensions/StatsBar";
import SearchFilter from "../components/extensions/SearchFilter";
import ExtensionCard from "../components/extensions/ExtensionCard";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const queryClient = useQueryClient();

  const { data: extensions = [], isLoading } = useQuery({
    queryKey: ["extensions"],
    queryFn: () => base44.entities.Extension.list(),
  });

  const toggleMutation = useMutation({
    mutationFn: (ext) =>
      base44.entities.Extension.update(ext.id, { enabled: !ext.enabled }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["extensions"] }),
  });

  const filtered = extensions.filter((ext) => {
    const matchSearch =
      ext.name?.toLowerCase().includes(search.toLowerCase()) ||
      ext.description?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || ext.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-foreground glow-text">
          EXTENSIONS
        </h1>
        <p className="font-mono text-xs text-muted-foreground tracking-wider mt-1">
          MANAGE AND CONTROL YOUR BROWSER EXTENSIONS
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
        </div>
      ) : (
        <>
          <StatsBar extensions={extensions} />
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
          />

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-border rounded-xl">
                <p className="font-mono text-sm text-muted-foreground">
                  NO EXTENSIONS FOUND
                </p>
              </div>
            ) : (
              filtered.map((ext, i) => (
                <ExtensionCard
                  key={ext.id}
                  extension={ext}
                  onToggle={(e) => toggleMutation.mutate(e)}
                  index={i}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
