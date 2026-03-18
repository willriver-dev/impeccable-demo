import type { ReactNode } from "react";

interface IconProps {
  children: ReactNode;
  size?: 16 | 18;
  className?: string;
}

export function Icon({ children, size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}
