// app/components/blog/PathSteps.tsx
import React from "react";

interface PathStep {
  number: string;
  title: string;
  description: string;
  highlight?: boolean;
}

interface PathStepsProps {
  steps: PathStep[];
  className?: string;
}

const PathSteps: React.FC<PathStepsProps> = ({ steps, className = "" }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step.highlight
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {step.number}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 mb-1">{step.title}</h4>
            <p className="text-slate-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PathSteps;
