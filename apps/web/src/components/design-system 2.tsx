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
      bg-accent text-white font-medium text-body
      transition-colors duration-fast
      hover:bg-accent-hover active:bg-accent-active
      disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
      dark:disabled:bg-gray-700 dark:focus:ring-offset-0
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
      hover:bg-gray-100 active:bg-gray-200
      dark:hover:bg-gray-700 dark:active:bg-gray-600
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
      hover:bg-gray-100 active:bg-gray-200
      dark:hover:bg-gray-800 dark:active:bg-gray-700
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
      disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
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
      hover:shadow-md hover:bg-gray-50
      dark:hover:bg-gray-700
      ${className || ""}
    `}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="text-headline font-semibold text-text-primary mb-2">{children}</div>;

export const CardBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="text-body text-text-secondary leading-relaxed">{children}</div>;

// ============================================================================
// Badge Components
// ============================================================================

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "error";
  className?: string;
}> = ({ children, variant = "primary", className }) => {
  const variantClasses = {
    primary: "bg-accent-subtle text-accent-900",
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

export const Display1: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h1 className="text-display-1 font-semibold text-text-primary">{children}</h1>
);

export const Display2: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h2 className="text-display-2 font-semibold text-text-primary">{children}</h2>
);

export const Headline: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h3 className="text-headline font-semibold text-text-primary">{children}</h3>
);

export const Subheading: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h4 className="text-subheading font-semibold text-text-primary">{children}</h4>
);

// ============================================================================
// Text Components
// ============================================================================

export const BodyLarge: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="text-body-lg text-text-primary leading-relaxed">{children}</p>
);

export const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-body text-text-primary leading-relaxed">{children}</p>
);

export const Caption: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span className="text-caption text-text-secondary">{children}</span>
);

export const TextSecondary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span className="text-body text-text-secondary">{children}</span>
);

// ============================================================================
// Code/Mono Components
// ============================================================================

export const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="font-mono text-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
    {children}
  </code>
);

export const Value: React.FC<{
  children: React.ReactNode;
  unit?: string;
}> = ({ children, unit }) => (
  <span className="font-mono text-mono text-accent font-semibold">
    {children}
    {unit && <span className="text-text-secondary text-sm ml-1">{unit}</span>}
  </span>
);
