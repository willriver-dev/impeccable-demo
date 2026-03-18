import { useState } from "react";
import { Icon } from "../ui";
import { NAV_ITEMS, type NavLabel } from "../../lib/navigation";

interface SidebarProps {
  activeItem?: NavLabel;
  onNavigate?: (label: NavLabel) => void;
}

function sidebarBtnClass(collapsed: boolean, extra?: string) {
  return [
    "w-full flex items-center gap-2.5 rounded-lg text-sm transition-colors cursor-pointer border-0",
    collapsed ? "justify-center px-0 py-2" : "px-3 py-2",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Sidebar({ activeItem = "Data Stores", onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col border-r border-[var(--border-subtle)] transition-[width] ${
        collapsed ? "w-16" : "w-56"
      }`}
      style={{ transitionDuration: "var(--duration-normal)", transitionTimingFunction: "var(--ease-out-quart)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="size-9 rounded-xl bg-[var(--interactive-primary)] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Icon size={16} className="text-[var(--text-on-primary)]">
            <path d="M8 1L14.5 5v6L8 15 1.5 11V5L8 1z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="8" cy="8" r="2.5" fill="currentColor" />
          </Icon>
        </button>
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            DSPM
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2">
        <ul className="flex flex-col gap-0.5 list-none p-0 m-0 stagger-children" style={{ "--stagger-base": "50ms" } as React.CSSProperties}>
          {NAV_ITEMS.map(({ label, icon }, idx) => {
            const isActive = activeItem === label;
            return (
              <li key={label} className="animate-slide-in-left" style={{ "--i": idx } as React.CSSProperties}>
                <button
                  onClick={() => onNavigate?.(label)}
                  className={sidebarBtnClass(
                    collapsed,
                    isActive
                      ? "bg-[var(--interactive-primary)] text-[var(--text-on-primary)] font-medium"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--interactive-muted)] font-medium"
                  )}
                  style={{ transitionDuration: "var(--duration-fast)" }}
                  title={collapsed ? label : undefined}
                >
                  <span className="shrink-0">{icon}</span>
                  {!collapsed && label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings */}
      <div className="px-2 py-3 border-t border-[var(--border-subtle)]">
        <button
          className={sidebarBtnClass(
            collapsed,
            "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] bg-transparent"
          )}
          style={{ transitionDuration: "var(--duration-fast)" }}
          title={collapsed ? "Settings" : undefined}
        >
          <Icon className="shrink-0">
            <circle cx="9" cy="9" r="2.5" />
            <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.4 3.4l1.42 1.42M13.18 13.18l1.42 1.42M3.4 14.6l1.42-1.42M13.18 4.82l1.42-1.42" />
          </Icon>
          {!collapsed && "Settings"}
        </button>
      </div>
    </aside>
  );
}
