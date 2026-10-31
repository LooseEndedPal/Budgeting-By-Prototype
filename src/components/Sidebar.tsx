import {
  LayoutDashboard,
  ReceiptText,
  ChartNoAxesCombined,
  GraduationCap,
} from "lucide-react";
export type Page = "transactions" | "add" | "reports" | "edit";
export default function Sidebar({
  page,
  onNavigate,
}: {
  page: Page;
  onNavigate: (p: Page) => void;
}) {
  const items = [
    { id: "transactions" as Page, label: "Transactions", icon: ReceiptText },
    { id: "add" as Page, label: "Add transaction", icon: LayoutDashboard },
    {
      id: "reports" as Page,
      label: "Spending report",
      icon: ChartNoAxesCombined,
    },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <GraduationCap size={21} />
        </div>
        <span>
          Budgeting<span className="brand-accent">By</span>
        </span>
      </div>
      <div className="nav-label">WORKSPACE</div>
      <nav>
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${page === id ? "active" : ""}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="avatar">JS</div>
        <div>
          <strong>Jamie Smith</strong>
          <small>Student account</small>
        </div>
        <span className="dots">···</span>
      </div>
    </aside>
  );
}
