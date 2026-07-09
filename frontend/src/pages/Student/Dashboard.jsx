// import StatsCard from "../components/StatsCard";
// import ActivityTable from "../components/ActivityTable";
// import "./Dashboard.css";

// function Dashboard() {
//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1>📚 Library Dashboard</h1>
//         <p>Welcome back, Admin</p>
//       </div>

//       <div className="stats-container">
//         <StatsCard
//           title="Total Books"
//           value="500"
//           icon="📚"
//         />

//         <StatsCard
//           title="Students"
//           value="120"
//           icon="👨‍🎓"
//         />

//         <StatsCard
//           title="Borrowed Books"
//           value="75"
//           icon="🔄"
//         />

//         <StatsCard
//           title="Available Books"
//           value="425"
//           icon="✅"
//         />
//       </div>

//       <ActivityTable />
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    borrowedBooks: 0,
    returnedBooks: 0,
    pendingRequests: 0,
    fines: 0,
  });

  useEffect(() => {
    // Later connect to backend
    // const res = await API.get("/student/dashboard");
    // setStats(res.data);
  }, []);

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Welcome, {user?.fullname}</h1>

        <p>Library Management System</p>
      </div>

      <div className="stats-container">

        <StatsCard
          title="Borrowed Books"
          value={stats.borrowedBooks}
          icon="📚"
        />

        <StatsCard
          title="Returned Books"
          value={stats.returnedBooks}
          icon="✅"
        />

        <StatsCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon="⏳"
        />

        <StatsCard
          title="Library Fine"
          value={`₹${stats.fines}`}
          icon="💰"
        />

      </div>

      <div className="dashboard-section">

        <h2>Recent Borrowing Activity</h2>

        <table>

          <thead>

            <tr>
              <th>Book</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>React Guide</td>
              <td>25 June 2026</td>
              <td>02 July 2026</td>
              <td>Borrowed</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;