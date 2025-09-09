// app/components/blog/CalloutBox.tsx
import React from "react";
import { ReactNode } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface CalloutBoxProps {
  children: ReactNode;
  title?: string;
  type?: "info" | "warning" | "success" | "tip";
  className?: string;
}

const CalloutBox: React.FC<CalloutBoxProps> = ({
  children,
  title,
  type = "info",
  className = "",
}) => {
  const typeConfig = {
    info: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-900",
      iconColor: "text-blue-600",
      icon: Info,
    },
    warning: {
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-900",
      iconColor: "text-amber-600",
      icon: AlertTriangle,
    },
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-900",
      iconColor: "text-green-600",
      icon: CheckCircle,
    },
    tip: {
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-900",
      iconColor: "text-purple-600",
      icon: AlertCircle,
    },
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border-l-4 p-6 rounded-r-lg ${className}`}
    >
      <div className="flex items-start space-x-3">
        <IconComponent
          className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`}
        />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold ${config.textColor} mb-2`}>
              {title}
            </h4>
          )}
          <div className={`${config.textColor} space-y-2`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CalloutBox;
