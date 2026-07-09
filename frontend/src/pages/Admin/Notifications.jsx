import { useState } from "react";
import "./AdminDashboard.css";

function Notifications() {
  const [notifications] = useState([
    {
      id: 1,
      title: "New student registered",
      time: "10 minutes ago",
      status: "Unread",
    },
    {
      id: 2,
      title: "Book returned successfully",
      time: "30 minutes ago",
      status: "Read",
    },
    {
      id: 3,
      title: "New borrowing request",
      time: "1 hour ago",
      status: "Unread",
    },
  ]);

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <h1>🔔 Notifications</h1>
        <p>Latest Library Notifications</p>
      </div>

      <div className="requests">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Notification</th>
              <th>Time</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {notifications.map((notification) => (

              <tr key={notification.id}>
                <td>{notification.id}</td>
                <td>{notification.title}</td>
                <td>{notification.time}</td>
                <td>{notification.status}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Notifications;