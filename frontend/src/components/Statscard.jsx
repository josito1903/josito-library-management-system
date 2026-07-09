import "./StatsCard.css";

function StatsCard({ title, value, icon }) {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>

      <div className="stats-content">
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default StatsCard;