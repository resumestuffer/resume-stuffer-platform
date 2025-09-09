// app/components/blog/CTASection.tsx
import React from "react";
import Link from "next/link";
import { ReactNode } from "react";

interface CTAButton {
  text: string;
  href: string;
  primary?: boolean;
}

interface CTASectionProps {
  title: string;
  description?: string;
  buttons: CTAButton[];
  background?: "gradient" | "dark" | "light";
  children?: ReactNode;
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  buttons,
  background = "gradient",
  children,
  className = "",
}) => {
  const backgroundClasses = {
    gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
    dark: "bg-slate-900 text-white",
    light: "bg-slate-50 text-slate-900",
  };

  const buttonBaseClasses =
    "px-6 py-3 rounded-lg font-semibold transition-colors";

  const getButtonClasses = (primary: boolean) => {
    if (background === "light") {
      return primary
        ? `${buttonBaseClasses} bg-blue-600 text-white hover:bg-blue-700`
        : `${buttonBaseClasses} bg-white text-slate-900 border border-slate-300 hover:bg-slate-100`;
    }
    return primary
      ? `${buttonBaseClasses} bg-white text-slate-900 hover:bg-slate-100`
      : `${buttonBaseClasses} bg-transparent border border-white/30 text-white hover:bg-white/10`;
  };

  return (
    <section
      className={`${backgroundClasses[background]} p-8 rounded-xl ${className}`}
    >
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        {description && (
          <p
            className={`text-lg mb-6 ${
              background === "light" ? "text-slate-600" : "text-white/90"
            }`}
          >
            {description}
          </p>
        )}
        {children && <div className="mb-6">{children}</div>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className={getButtonClasses(button.primary || false)}
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
