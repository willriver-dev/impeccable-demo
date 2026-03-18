import type { ReactNode } from "react";
import { Icon } from "../components/ui";

export const NAV_ITEMS = [
  {
    label: "Data Stores",
    description: "Monitor and classify sensitive data across all connected stores.",
    icon: (
      <Icon>
        <ellipse cx="9" cy="4.5" rx="6" ry="2.5" />
        <path d="M3 4.5v9c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5v-9" />
        <path d="M3 9c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5" />
      </Icon>
    ),
  },
  {
    label: "Policies",
    description: "Define and enforce data security policies across your organization.",
    icon: (
      <Icon>
        <path d="M9 1.5L3 4.5v4.5c0 4.14 2.56 6.72 6 7.5 3.44-.78 6-3.36 6-7.5V4.5L9 1.5z" />
        <path d="M6.5 9l2 2 3.5-3.5" />
      </Icon>
    ),
  },
  {
    label: "Alerts",
    description: "Review and triage security alerts from your data infrastructure.",
    icon: (
      <Icon>
        <path d="M7.28 2.74a1.94 1.94 0 0 1 3.44 0l5.02 9.47A1.94 1.94 0 0 1 14.02 15H3.98a1.94 1.94 0 0 1-1.72-2.79l5.02-9.47z" />
        <path d="M9 6.75v3" />
        <circle cx="9" cy="12" r="0.5" fill="currentColor" />
      </Icon>
    ),
  },
  {
    label: "Reports",
    description: "Generate compliance and posture reports for stakeholders.",
    icon: (
      <Icon>
        <rect x="2.5" y="2.5" width="13" height="13" rx="2" />
        <path d="M6 11V8" />
        <path d="M9 11V6" />
        <path d="M12 11V9" />
      </Icon>
    ),
  },
] as const;

export type NavLabel = (typeof NAV_ITEMS)[number]["label"];

export function getNavDescription(label: NavLabel): string {
  return NAV_ITEMS.find((item) => item.label === label)?.description ?? "";
}

export function getNavIcon(label: NavLabel): ReactNode {
  return NAV_ITEMS.find((item) => item.label === label)?.icon;
}

/** Risk level → badge classes mapping (tinted bg + bold text, same OKLCH tone) */
export type RiskLevel = "Critical" | "High" | "Medium" | "Low";

const RISK_CLASSES: Record<RiskLevel, string> = {
  Critical: "bg-[var(--badge-danger-strong-bg)] text-[var(--badge-danger-strong-text)]",
  High: "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)]",
  Medium: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]",
  Low: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)]",
};

export function riskBadgeClass(risk: string): string {
  return RISK_CLASSES[risk] ?? RISK_CLASSES.Low;
}
