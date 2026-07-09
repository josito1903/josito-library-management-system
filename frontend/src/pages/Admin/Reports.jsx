import { useState } from "react";
import "./AdminDashboard.css";

function Reports() {
  const [reports] = useState([
    {
      id: 1,
      title: "Monthly Library Report",
      date: "29 June 2026",
      status: "Generated",
    },
    {
      id: 2,
      title: "Borrowing Report",
      date: "28 June 2026",
      status: "Generated",
    },
    {
      id: 3,
      title: "Student Activity Report",
      date: "27 June 2026",
      status: "Pending",
    },
  ]);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>📊 Reports</h1>
        <p>Library Reports Management</p>
      </div>

      <div className="requests">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Report</th>
              <th>Date</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.title}</td>
                <td>{report.date}</td>
                <td>{report.status}</td>

                <td>
                  <button className="approve">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Reports;