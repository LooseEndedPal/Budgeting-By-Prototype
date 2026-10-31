import SpendingCharts from "../components/SpendingCharts";
export default function Reports() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">UNDERSTAND YOUR HABITS</span>
          <h1>Spending report</h1>
          <p>A clearer picture of where your student budget goes.</p>
        </div>
        <select className="report-period">
          <option>October 2026</option>
          <option>September 2026</option>
          <option>August 2026</option>
        </select>
      </div>
      <div className="report-summary">
        <div>
          <span>OCTOBER SPENDING</span>
          <strong>$362.64</strong>
          <small>
            <b>↓ 18.4%</b> compared with September
          </small>
        </div>
        <div className="summary-divider" />
        <div>
          <span>LARGEST CATEGORY</span>
          <strong>Transport</strong>
          <small>$128.00 this month</small>
        </div>
        <div className="summary-divider" />
        <div>
          <span>AVERAGE DAILY SPEND</span>
          <strong>$12.95</strong>
          <small>Based on 28 days</small>
        </div>
      </div>
      <SpendingCharts />
      <div className="insight-card">
        <span className="insight-icon">✦</span>
        <div>
          <strong>Your spending insight</strong>
          <p>
            Food and transport make up the largest share of your October
            spending. Keeping an eye on smaller daily purchases can help you
            spot opportunities to save.
          </p>
        </div>
      </div>
      <p className="prototype-note">
        Charts and report figures are illustrative sample data for this
        prototype.
      </p>
    </>
  );
}
