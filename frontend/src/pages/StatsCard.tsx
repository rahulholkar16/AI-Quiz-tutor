import React from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color?: string;
}

const StatsCard: React.FC<Props> = ({ title, value, change, icon: Icon, color = ["#2b2bee"] }) => {
  return (
    <div className="relative flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 transition-all hover:bg-white/10 overflow-hidden">
      <div className={`absolute top-0 right-0 h-20 w-20 bg-${color}/20 blur-2xl`} />
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${color}/10 text-${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-white/80 text-base font-medium">{title}</p>
      </div>
      <p className="text-white text-4xl font-bold">{value}</p>
      <p className="text-[#0bda68] text-sm font-medium">{change}</p>
    </div>
  );
};

export default StatsCard;