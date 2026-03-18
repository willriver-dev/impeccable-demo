import { useMemo } from "react";
import { Icon } from "../ui";
import { IconButton } from "../ui";

interface HeaderProps {
  onThemeToggle?: () => void;
  theme?: "light" | "dark";
}

export function Header({ onThemeToggle, theme = "light" }: HeaderProps) {
  const shortcutKey = useMemo(
    () => (navigator.platform.toUpperCase().includes("MAC") ? "⌘K" : "Ctrl+K"),
    []
  );

  return (
    <header className="flex items-center gap-4 px-6 h-16 border-b border-[var(--border-default)]">
      {/* Search — prominent, takes most space */}
      <div className="flex-1 max-w-2xl relative animate-fade-in" style={{ animationDuration: "600ms" }}>
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none">
          <circle cx="8" cy="8" r="5.5" />
          <path d="M12.5 12.5L16 16" />
        </Icon>
        <input
          type="search"
          placeholder="Search data stores, policies, alerts..."
          className="
            w-full pl-10 pr-4 py-2.5 rounded-xl
            bg-[var(--surface-sunken)] border border-[var(--border-subtle)]
            text-sm text-[var(--text-primary)]
            placeholder:text-[var(--text-tertiary)]
            focus:outline-none focus:border-[var(--interactive-primary)]
            focus:ring-2 focus:ring-[var(--interactive-primary)]
            transition-all
          "
          style={{ transitionDuration: "var(--duration-fast)" }}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-[var(--text-tertiary)] border border-[var(--border-default)] bg-[var(--surface-raised)]">
          {shortcutKey}
        </kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <IconButton label="Notifications" className="relative">
          <Icon>
            <path d="M4.5 7a4.5 4.5 0 0 1 9 0c0 4.5 2 5.5 2 5.5H2.5S4.5 11.5 4.5 7z" />
            <path d="M7.5 14.5a1.5 1.5 0 0 0 3 0" />
          </Icon>
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[var(--color-danger-500)]" />
        </IconButton>

        <IconButton
          label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onClick={onThemeToggle}
        >
          {theme === "light" ? (
            <Icon>
              <path d="M15.5 9.87A7 7 0 0 1 8.13 2.5 7 7 0 1 0 15.5 9.87z" />
            </Icon>
          ) : (
            <Icon>
              <circle cx="9" cy="9" r="3.5" />
              <path d="M9 1.5v1.5M9 15v1.5M1.5 9H3M15 9h1.5M3.7 3.7l1.06 1.06M13.24 13.24l1.06 1.06M3.7 14.3l1.06-1.06M13.24 4.76l1.06-1.06" />
            </Icon>
          )}
        </IconButton>

        {/* Avatar */}
        <div className="size-8 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] flex items-center justify-center text-xs font-semibold ml-1 select-none">
          AD
        </div>
      </div>
    </header>
  );
}
