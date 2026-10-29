/**
 * Design System Component Examples
 * Apple HIG protocol + Metranik technical platform
 *
 * Usage: Import and compose these elements.
 * All components follow accessibility standards (WCAG AAA).
 */

import React from "react";

// ============================================================================
// Button Components
// ============================================================================

export const ButtonPrimary = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`
      inline-flex items-center justify-center
      px-4 py-2.5 rounded-md
      bg-accent text-accent-fg font-semibold text-body
      transition-colors duration-fast
      hover:bg-accent-hover active:bg-accent-active
      disabled:bg-surface-tertiary disabled:text-text-tertiary disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
      ${className || ""}
    `}
    {...props}
  >
    {children}
  </button>
));
ButtonPrimary.displayName = "ButtonPrimary";

export const ButtonSecondary = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`
      inline-flex items-center justify-center
      px-4 py-2.5 rounded-md
      bg-surface border border-border text-text-primary font-medium text-body
      transition-colors duration-fast
      hover:bg-surface-secondary active:bg-surface-tertiary
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
      dark:focus:ring-offset-0
      ${className || ""}
    `}
    {...props}
  >
    {children}
  </button>
));
ButtonSecondary.displayName = "ButtonSecondary";

export const ButtonGhost = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`
      inline-flex items-center justify-center
      px-4 py-2.5 rounded-md
      bg-transparent text-text-primary font-medium text-body
      transition-colors duration-fast
      hover:bg-surface-secondary active:bg-surface-tertiary
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
      dark:focus:ring-offset-0
      ${className || ""}
    `}
    {...props}
  >
    {children}
  </button>
));
ButtonGhost.displayName = "ButtonGhost";

// ============================================================================
// Input Components
// ============================================================================

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`
      w-full px-4 py-3 rounded-md
      bg-surface border border-border text-text-primary
      placeholder:text-text-tertiary
      transition-all duration-fast
      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
      disabled:bg-surface-secondary disabled:text-text-tertiary disabled:cursor-not-allowed
      dark:focus:ring-offset-0
      ${className || ""}
    `}
    {...props}
  />
));
Input.displayName = "Input";

export const InputLabel: React.FC<{
  htmlFor?: string;
  children: React.ReactNode;
}> = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="block text-caption font-medium text-text-secondary mb-1.5"
  >
    {children}
  </label>
);

// ============================================================================
// Card Components
// ============================================================================

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={`
      bg-surface border border-border rounded-lg p-5 shadow-sm
      transition-all duration-fast
      hover:shadow-md hover:bg-surface-secondary
      ${className || ""}
    `}
  >
    {children}
  </div>
);

type TextProps = { children: React.ReactNode; className?: string };

export const CardHeader: React.FC<TextProps> = ({ children, className }) => (
  <div className={`text-headline font-semibold text-text-primary mb-2 ${className || ""}`}>
    {children}
  </div>
);

export const CardBody: React.FC<TextProps> = ({ children, className }) => (
  <div className={`text-body text-text-secondary leading-relaxed ${className || ""}`}>
    {children}
  </div>
);

// ============================================================================
// Badge Components
// ============================================================================

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "error";
  className?: string;
}> = ({ children, variant = "primary", className }) => {
  const variantClasses = {
    primary: "bg-accent-subtle text-accent-text",
    success: "bg-success-light text-success-dark",
    warning: "bg-warning-light text-warning-dark",
    error: "bg-error-light text-error-dark",
  };

  return (
    <span
      className={`
        inline-flex items-center px-2 py-1 rounded-sm
        text-caption font-semibold
        ${variantClasses[variant]}
        ${className || ""}
      `}
    >
      {children}
    </span>
  );
};

// ============================================================================
// Heading Components (Typography)
// ============================================================================

export const Display1: React.FC<TextProps> = ({ children, className }) => (
  <h1 className={`text-display-1 font-semibold text-text-primary ${className || ""}`}>
    {children}
  </h1>
);

export const Display2: React.FC<TextProps> = ({ children, className }) => (
  <h2 className={`text-display-2 font-semibold text-text-primary ${className || ""}`}>
    {children}
  </h2>
);

export const Headline: React.FC<TextProps> = ({ children, className }) => (
  <h3 className={`text-headline font-semibold text-text-primary ${className || ""}`}>
    {children}
  </h3>
);

export const Subheading: React.FC<TextProps> = ({ children, className }) => (
  <h4 className={`text-subheading font-semibold text-text-primary ${className || ""}`}>
    {children}
  </h4>
);

// ============================================================================
// Text Components
// ============================================================================

export const BodyLarge: React.FC<TextProps> = ({ children, className }) => (
  <p className={`text-body-lg text-text-primary leading-relaxed ${className || ""}`}>
    {children}
  </p>
);

export const Body: React.FC<TextProps> = ({ children, className }) => (
  <p className={`text-body text-text-primary leading-relaxed ${className || ""}`}>{children}</p>
);

export const Caption: React.FC<TextProps> = ({ children, className }) => (
  <span className={`text-caption text-text-secondary ${className || ""}`}>{children}</span>
);

export const TextSecondary: React.FC<TextProps> = ({ children, className }) => (
  <span className={`text-body text-text-secondary ${className || ""}`}>{children}</span>
);

// ============================================================================
// Code/Mono Components
// ============================================================================

export const Code: React.FC<TextProps> = ({ children, className }) => (
  <code
    className={`font-mono text-mono bg-surface-secondary px-2 py-1 rounded ${className || ""}`}
  >
    {children}
  </code>
);

export const Value: React.FC<TextProps & { unit?: string }> = ({ children, unit, className }) => (
  <span className={`font-mono text-mono text-accent-text font-semibold ${className || ""}`}>
    {children}
    {unit && <span className="text-text-secondary text-sm ml-1">{unit}</span>}
  </span>
);
