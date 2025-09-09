// app/components/blog/InfoBox.tsx
import React from "react";
import { ReactNode } from "react";

interface InfoBoxProps {
  children: ReactNode;
  color?: "blue" | "green" | "amber" | "slate";
  className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  children,
  color = "blue",
  className = "",
}) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    amber: "bg-amber-50 border-amber-200",
    slate: "bg-slate-50 border-slate-200",
  };

  return (
    <div
      className={`${colorClasses[color]} p-6 rounded-lg border ${className}`}
    >
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default InfoBox;
