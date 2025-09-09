// app/components/blog/StatsGrid.tsx
import React from "react";

interface StatItem {
  value: string;
  label: string;
  color?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  columns = 3,
  className = "",
}) => {
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={`grid ${gridClasses[columns]} gap-4 mb-8 p-6 bg-slate-50 rounded-xl ${className}`}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div
            className={`text-2xl font-bold mb-2 ${
              stat.color || "text-slate-900"
            }`}
          >
            {stat.value}
          </div>
          <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
