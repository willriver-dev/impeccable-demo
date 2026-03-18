import { useState, useEffect } from "react";
import { DashboardLayout } from "./components/layout";
import { type NavLabel, getNavDescription } from "./lib/navigation";
import { DataStoresTable, type DataStore } from "./components/data-stores";
import "./App.css";

const sampleStores: DataStore[] = [
  { name: "prod-users-db", type: "PostgreSQL", endpoint: "10.0.1.42:5432", risk: "Critical" },
  { name: "analytics-warehouse", type: "RDS", endpoint: "analytics.c9ak3f.us-east-1.rds.amazonaws.com", risk: "High" },
  { name: "session-cache", type: "Redis", endpoint: "10.0.2.18:6379", risk: "Low" },
  { name: "customer-docs", type: "S3", endpoint: "s3://customer-docs-prod", risk: "Medium" },
  { name: "search-cluster", type: "Elasticsearch", endpoint: "10.0.3.50:9200", risk: "High" },
  { name: "user-profiles", type: "MongoDB", endpoint: "mongo-rs0.internal:27017", risk: "Medium" },
  { name: "audit-logs", type: "S3", endpoint: "s3://audit-logs-2024", risk: "Low" },
  { name: "payments-db", type: "RDS", endpoint: "payments.c9ak3f.us-east-1.rds.amazonaws.com", risk: "Critical" },
  { name: "feature-flags", type: "DynamoDB", endpoint: "dynamodb.us-east-1.amazonaws.com", risk: "Low" },
  { name: "ml-training-data", type: "S3", endpoint: "s3://ml-training-prod", risk: "High" },
];

const metrics = [
  { label: "Total stores", value: "247", accent: "var(--color-primary-500)" },
  { label: "Sensitive records", value: "1.2M", accent: "var(--color-warning-500)" },
  { label: "Policy violations", value: "18", accent: "var(--color-danger-500)" },
];

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeNav, setActiveNav] = useState<NavLabel>("Data Stores");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <DashboardLayout
      activeNav={activeNav}
      onNavigate={setActiveNav}
      onThemeToggle={toggleTheme}
      theme={theme}
    >
      <div key={activeNav} className="max-w-5xl space-y-8">
        {/* Page header — bold, dramatic */}
        <div className="animate-fade-down">
          <h1 className="mb-1.5">{activeNav}</h1>
          <p className="text-lg">{getNavDescription(activeNav)}</p>
        </div>

        {/* Metrics — hero moment: big numbers, left accent bar */}
        <div className="grid grid-cols-3 gap-5 stagger-children">
          {metrics.map(({ label, value, accent }, i) => (
            <div
              key={label}
              className="relative py-5 px-6 rounded-xl bg-[var(--surface-raised)] animate-scale-in overflow-hidden transition-colors duration-300"
              style={{ "--i": i } as React.CSSProperties}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <p className="text-xs font-semibold text-[var(--text-caption)] uppercase tracking-widest mb-2">
                {label}
              </p>
              <p className="text-4xl font-bold text-[var(--text-primary)] tabular-nums tracking-tighter leading-none">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Data Stores table */}
        {activeNav === "Data Stores" && (
          <div className="animate-fade-up" style={{ animationDelay: "180ms" }}>
            <div className="flex items-center justify-between mb-4">
              <h3>Connected stores</h3>
              <span className="text-sm font-medium text-[var(--text-secondary)] tabular-nums">
                {sampleStores.length} stores
              </span>
            </div>
            <DataStoresTable stores={sampleStores} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default App;
