import type { RiskLevel } from "../../lib/navigation";
import { riskBadgeClass } from "../../lib/navigation";

export interface DataStore {
  name: string;
  type: "S3" | "RDS" | "MongoDB" | "PostgreSQL" | "Redis" | "Elasticsearch" | "DynamoDB";
  endpoint: string;
  risk: RiskLevel;
}

interface DataStoresTableProps {
  stores: DataStore[];
}

const typeLabels: Record<DataStore["type"], string> = {
  S3: "S3 Bucket",
  RDS: "Amazon RDS",
  MongoDB: "MongoDB",
  PostgreSQL: "PostgreSQL",
  Redis: "Redis",
  Elasticsearch: "Elasticsearch",
  DynamoDB: "DynamoDB",
};

const riskDotColor: Record<RiskLevel, string> = {
  Critical: "var(--color-danger-500)",
  High: "var(--color-danger-400)",
  Medium: "var(--color-warning-400)",
  Low: "var(--color-success-400)",
};

export function DataStoresTable({ stores }: DataStoresTableProps) {
  return (
    <div className="overflow-x-auto" role="region" aria-label="Data stores list" tabIndex={0}>
      <table className="w-full text-sm text-left">
        <caption className="sr-only">
          Connected data stores with type, endpoint, and risk level
        </caption>
        <thead>
          <tr className="border-b-2 border-[var(--border-default)]">
            <th scope="col" className="pb-3 pt-0 text-xs font-bold text-[var(--text-caption)] uppercase tracking-widest">
              Database
            </th>
            <th scope="col" className="pb-3 pt-0 text-xs font-bold text-[var(--text-caption)] uppercase tracking-widest">
              Type
            </th>
            <th scope="col" className="pb-3 pt-0 text-xs font-bold text-[var(--text-caption)] uppercase tracking-widest">
              Endpoint / IP
            </th>
            <th scope="col" className="pb-3 pt-0 text-xs font-bold text-[var(--text-caption)] uppercase tracking-widest text-right">
              Risk
            </th>
          </tr>
        </thead>
        <tbody className="stagger-children" style={{ "--stagger-base": "30ms" } as React.CSSProperties}>
          {stores.map((store, i) => (
            <tr
              key={store.name}
              className={`animate-fade-in transition-colors duration-[100ms] hover:bg-[var(--interactive-muted)] ${
                i < stores.length - 1 ? "border-b border-[var(--border-subtle)]" : ""
              }`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <td className="py-3.5 pr-4 font-semibold text-[var(--text-primary)]">
                {store.name}
              </td>
              <td className="py-3.5 pr-4 text-[var(--text-secondary)]">
                {typeLabels[store.type]}
              </td>
              <td className="py-3.5 pr-4 font-mono text-[var(--text-secondary)] text-xs">
                {store.endpoint}
              </td>
              <td className="py-3.5 text-right">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${riskBadgeClass(store.risk)}`}
                >
                  <span
                    className="size-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: riskDotColor[store.risk] }}
                    aria-hidden="true"
                  />
                  {store.risk}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {stores.length === 0 && (
        <p className="py-16 text-center text-sm text-[var(--text-secondary)]">
          No data stores connected yet. Add your first store to begin monitoring.
        </p>
      )}
    </div>
  );
}
