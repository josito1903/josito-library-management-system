import "./Profile.css";
import jo from "../../assets/jo.jpg";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={jo}
          alt="Profile"
          className="profile-image"
        />

        <h2>Josito Mendes</h2>
        <p>Library Administrator</p>

        <div className="profile-info">
          <p><strong>Email:</strong> jositomendes1@gmail.com</p>
          <p><strong>Phone:</strong> +91 8793278942</p>
          <p><strong>Department:</strong> Library Management</p>
          <p><strong>Status:</strong> Active</p>
        </div>

        <button className="edit-btn">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;