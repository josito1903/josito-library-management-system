import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      <h1>Library Admin Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h2>📚</h2>
          <h3>500</h3>
          <p>Total Books</p>
        </div>

        <div className="card">
          <h2>👨‍🎓</h2>
          <h3>230</h3>
          <p>Total Students</p>
        </div>

        <div className="card">
          <h2>📖</h2>
          <h3>75</h3>
          <p>Borrowed Books</p>
        </div>

        <div className="card">
          <h2>📦</h2>
          <h3>425</h3>
          <p>Available Books</p>
        </div>

      </div>

      <div className="requests">

        <h2>Pending Borrow Requests</h2>

        <table>

          <thead>

            <tr>
              <th>Student</th>
              <th>Book</th>
              <th>Borrow Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            <tr>

              <td>Josito Mendes</td>

              <td>React Guide</td>

              <td>20/06/2026</td>

              <td>Pending</td>

              <td>

                <button className="approve">
                  Approve
                </button>

                <button className="reject">
                  Reject
                </button>

              </td>

            </tr>

            <tr>

              <td>Rahul Kumar</td>

              <td>DBMS</td>

              <td>19/06/2026</td>

              <td>Pending</td>

              <td>

                <button className="approve">
                  Approve
                </button>

                <button className="reject">
                  Reject
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;