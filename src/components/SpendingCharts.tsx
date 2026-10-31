import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
const monthly = [
  { month: "May", total: 510 },
  { month: "Jun", total: 620 },
  { month: "Jul", total: 480 },
  { month: "Aug", total: 690 },
  { month: "Sep", total: 575 },
  { month: "Oct", total: 362.64 },
];
const categories = [
  { name: "Food", value: 74.65, color: "#7b8fce" },
  { name: "Transport", value: 128, color: "#80b7a3" },
  { name: "Books", value: 76.5, color: "#e5b66c" },
  { name: "Entertainment", value: 32, color: "#b49ad8" },
  { name: "Shopping", value: 42.99, color: "#e58f83" },
  { name: "Other", value: 8.5, color: "#a9b1bd" },
];
export default function SpendingCharts() {
  return (
    <div className="charts-grid">
      <section className="panel chart-panel">
        <div className="panel-heading">
          <div>
            <h3>Monthly spending</h3>
            <p>Your spending over the last six months</p>
          </div>
          <span className="chart-note">CAD</span>
        </div>
        <div className="bar-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthly}
              margin={{ top: 12, right: 8, left: -18, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#edf0f4"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8992a2", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8992a2", fontSize: 11 }}
              />
              <Tooltip
                formatter={(v) => [`$${Number(v).toFixed(2)}`, "Spent"]}
              />
              <Bar
                dataKey="total"
                fill="#7b8fce"
                radius={[6, 6, 0, 0]}
                maxBarSize={38}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="panel chart-panel">
        <div className="panel-heading">
          <div>
            <h3>Spending by category</h3>
            <p>October breakdown</p>
          </div>
        </div>
        <div className="donut-wrap">
          <div className="donut">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={3}
                  stroke="none"
                >
                  {categories.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <strong>$362.64</strong>
              <small>Total spent</small>
            </div>
          </div>
          <div className="legend">
            {categories.map((c) => (
              <div key={c.name}>
                <span>
                  <i style={{ background: c.color }} />
                  {c.name}
                </span>
                <strong>${c.value.toFixed(2)}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
