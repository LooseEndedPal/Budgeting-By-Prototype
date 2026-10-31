import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
} from "lucide-react";
import type { Transaction } from "../types/Transaction";
export default function Transactions({
  items,
  onSelect,
  onAdd,
}: {
  items: Transaction[];
  onSelect: (t: Transaction) => void;
  onAdd: () => void;
}) {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("October 2026");
  const [category, setCategory] = useState("All categories");
  const filtered = useMemo(
    () =>
      items
        .filter((t) => {
          const d = new Date(t.date + "T12:00:00");
          const matchesPeriod =
            period === "All time" ||
            (period === "2026" && d.getFullYear() === 2026) ||
            (period === "October 2026" && t.date.startsWith("2026-10")) ||
            (period === "September 2026" && t.date.startsWith("2026-09")) ||
            (period === "August 2026" && t.date.startsWith("2026-08"));
          return (
            matchesPeriod &&
            (category === "All categories" || t.category === category) &&
            (t.name.toLowerCase().includes(search.toLowerCase()) ||
              t.details.toLowerCase().includes(search.toLowerCase()))
          );
        })
        .sort((a, b) => b.date.localeCompare(a.date)),
    [items, period, category, search],
  );
  const total = filtered.reduce((s, t) => s + t.amount, 0);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR MONEY, IN ONE PLACE</span>
          <h1>Transactions</h1>
          <p>Keep an eye on your spending, one transaction at a time.</p>
        </div>
        <button className="primary-button" onClick={onAdd}>
          <Plus size={17} /> Add transaction
        </button>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">
            {period === "All time"
              ? "All-time transactions"
              : "Transactions shown"}
          </span>
          <strong>{filtered.length}</strong>
          <small>Recorded purchases</small>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total spending</span>
          <strong>${total.toFixed(2)}</strong>
          <small>For selected period</small>
        </div>
        <div className="stat-card">
          <span className="stat-label">Average purchase</span>
          <strong>
            ${(filtered.length ? total / filtered.length : 0).toFixed(2)}
          </strong>
          <small>Per transaction</small>
        </div>
      </div>
      <section className="panel transactions-panel">
        <div className="panel-heading">
          <div>
            <h3>Transaction history</h3>
            <p>Click any transaction to see more details.</p>
          </div>
          <span className="count-pill">{filtered.length} records</span>
        </div>
        <div className="filters">
          <div className="search-box">
            <Search size={17} />
            <input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-select">
            <SlidersHorizontal size={15} />
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option>October 2026</option>
              <option>September 2026</option>
              <option>August 2026</option>
              <option>2026</option>
              <option>All time</option>
            </select>
          </div>
          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All categories</option>
            {[
              "Food",
              "Transport",
              "Books",
              "Entertainment",
              "Shopping",
              "Other",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>TRANSACTION</th>
                <th>DATE</th>
                <th>CATEGORY</th>
                <th className="align-right">AMOUNT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => onSelect(t)}
                  className="transaction-row"
                >
                  <td>
                    <div className="transaction-name">
                      <span
                        className={`category-icon ${t.category.toLowerCase()}`}
                      >
                        {t.category === "Food"
                          ? "☕"
                          : t.category === "Transport"
                            ? "↗"
                            : t.category === "Books"
                              ? "▤"
                              : t.category === "Entertainment"
                                ? "♫"
                                : t.category === "Shopping"
                                  ? "◇"
                                  : "＋"}
                      </span>
                      <span>
                        <strong>{t.name}</strong>
                        <small>{t.details}</small>
                      </span>
                    </div>
                  </td>
                  <td>
                    {new Date(t.date + "T12:00:00").toLocaleDateString(
                      "en-CA",
                      { month: "short", day: "numeric", year: "numeric" },
                    )}
                  </td>
                  <td>
                    <span className="category-pill">{t.category}</span>
                  </td>
                  <td className="align-right amount">
                    -${t.amount.toFixed(2)}
                  </td>
                  <td>
                    <ArrowUpRight size={16} className="row-arrow" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && (
            <div className="empty-state">
              <Search size={24} />
              <strong>No transactions found</strong>
              <span>Try changing your search or filters.</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
