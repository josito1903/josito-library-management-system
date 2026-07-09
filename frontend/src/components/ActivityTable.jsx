import "./ActivityTable.css";

function ActivityTable() {
  const activities = [
    {
      student: "John Smith",
      book: "React Basics",
      date: "18/06/2026",
      status: "Borrowed",
    },
    {
      student: "Maria Silva",
      book: "Database Systems",
      date: "17/06/2026",
      status: "Returned",
    },
    {
      student: "David Johnson",
      book: "Java Programming",
      date: "16/06/2026",
      status: "Borrowed",
    },
    {
      student: "Emma Brown",
      book: "Python Programming",
      date: "15/06/2026",
      status: "Returned",
    },
  ];

  return (
    <div className="activity-container">
      <h2>Recent Activities</h2>

      <table className="activity-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Book</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.student}</td>
              <td>{activity.book}</td>
              <td>{activity.date}</td>
              <td>{activity.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityTable;