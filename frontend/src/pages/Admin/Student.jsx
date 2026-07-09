import "./Student.css";

function Student() {
  const students = [
    {
      id: 1,
      name: "Josito Mendes",
      email: "jositomendes1@gmail.com",
      phone: "+91 8793278942",
      department: "BCA",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
      department: "MCA",
      status: "Active",
    },
  ];

  return (
    <div className="student-container">
      <h1>Student Records</h1>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.department}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;