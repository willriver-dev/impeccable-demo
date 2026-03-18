import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import type { NavLabel } from "../../lib/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
  activeNav?: NavLabel;
  onNavigate?: (label: NavLabel) => void;
  onThemeToggle?: () => void;
  theme?: "light" | "dark";
}

export function DashboardLayout({
  children,
  activeNav,
  onNavigate,
  onThemeToggle,
  theme,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-svh overflow-hidden bg-[var(--surface-base)] transition-colors duration-300">
      <Sidebar activeItem={activeNav} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onThemeToggle={onThemeToggle} theme={theme} />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
