import { useContext } from "react";
import { LibraryContext } from "../../context/LibraryContext";
import "./Borrowing.css";

function Borrowing() {
  const { borrowings, returnBook } = useContext(LibraryContext);

  return (
    <div className="borrowing-page">
      <h1>📖 Borrowing Records</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Book</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {borrowings.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.student}</td>
              <td>{record.book}</td>
              <td>{record.borrowDate}</td>
              <td>{record.returnDate}</td>
              <td>{record.status}</td>

              <td>
                {record.status === "Borrowed" && (
                  <button
                    onClick={() => returnBook(record.id)}
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Borrowing; 