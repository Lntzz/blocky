import { Power, PowerOff, Boxes, HardDrive } from "lucide-react";

export default function StatsBar({ extensions }) {
  const total = extensions.length;
  const enabled = extensions.filter((e) => e.enabled).length;
  const disabled = total - enabled;
  const totalSize = extensions.reduce((sum, e) => sum + (e.size_kb || 0), 0);

  const stats = [
    { icon: Boxes, label: "TOTAL", value: total },
    { icon: Power, label: "ACTIVE", value: enabled },
    { icon: PowerOff, label: "DISABLED", value: disabled },
    { icon: HardDrive, label: "SIZE", value: `${(totalSize / 1024).toFixed(1)}MB` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border border-border rounded-xl p-4 bg-card/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              {stat.label}
            </span>
          </div>
          <p className="font-mono text-xl font-bold text-foreground">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
