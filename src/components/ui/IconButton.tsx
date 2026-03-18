import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

export function IconButton({ label, children, className, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`size-9 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--interactive-muted)] transition-colors border-0 bg-transparent cursor-pointer ${className ?? ""}`}
      style={{ transitionDuration: "var(--duration-fast)" }}
      {...props}
    >
      {children}
    </button>
  );
}
