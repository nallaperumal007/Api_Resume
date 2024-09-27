import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    email: '',
    skillSet: '',
    remarks: '',
    portfolio: '',
    address: '',
    type: '',
    techStack: '',
    resume: ''
  });
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [emailUserData, setEmailUserData] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new user
  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:5000/details', formData);
      if (result.data.success) {
        toast.success('User added successfully!');
        setFormData({
          name: '',
          mobile: '',
          location: '',
          email: '',
          skillSet: '',
          remarks: '',
          portfolio: '',
          address: '',
          type: '',
          techStack: '',
          resume: ''
        });
        fetchAllUsers(); // Refresh the user list
      } else {
        toast.error('Error adding user: ' + result.data.message);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error adding user: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  // Fetch user by ID
  const findUserById = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`http://localhost:5000/details/${userId}`);
      if (result.data.success) {
        setUserData(result.data.response); // Adjust to match the response
        setEmailUserData(null);
      } else {
        toast.error('User not found.');
      }
    } catch (error) {
      console.error('Error finding user by ID:', error);
      toast.error('Error finding user by ID: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  // Fetch user by email
  const findUserByEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`http://localhost:5000/details?email=${email}`);
      if (result.data.success) {
        setEmailUserData(result.data.response); // Adjust to match the response
        setUserData(null);
      } else {
        toast.error('User not found.');
      }
    } catch (error) {
      console.error('Error finding user by email:', error);
      toast.error('Error finding user by email: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const result = await axios.get('http://localhost:5000/all-details');
      if (result.data.success) {
        setAllUsers(result.data.response); // Adjust based on the response structure
      } else {
        toast.error('Error fetching all users: ' + result.data.message);
      }
    } catch (error) {
      console.error('Error fetching all users:', error);
      toast.error('Error fetching all users: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  // Fetch all users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Function to handle skillSet display
  const handleSkillSetDisplay = (skillSet) => {
    if (Array.isArray(skillSet)) {
      return skillSet.join(', ');
    }
    return skillSet; // If not an array, return it directly
  };

  return (
    <div className="container mt-4">
      <h2>User Management</h2>

      {/* Add User Form */}
      <form onSubmit={addNewUser}>
        <h3>Add User</h3>
        {Object.keys(formData).map((key) => (
          <div className="mb-3" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === 'email' ? 'email' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>

      {/* Find User by ID Form */}
      <form onSubmit={findUserById} className="mt-4">
        <h3>Find User by ID</h3>
        <div className="mb-3">
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary">Find User</button>
      </form>

      {/* Find User by Email Form */}
      <form onSubmit={findUserByEmail} className="mt-4">
        <h3>Find User by Email</h3>
        <div className="mb-3">
          <label>User Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary">Find User</button>
      </form>

      {/* Display User Data by ID */}
      {userData && (
        <div className="mt-4">
          <h3>User Data (ID)</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Location</th>
                <th>Email</th>
                <th>Skill Set</th>
                <th>Remarks</th>
                <th>Portfolio</th>
                <th>Address</th>
                <th>Type</th>
                <th>Tech Stack</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.id}</td>
                <td>{userData.name}</td>
                <td>{userData.mobile}</td>
                <td>{userData.location}</td>
                <td>{userData.email}</td>
                <td>{handleSkillSetDisplay(userData.skillSet)}</td>
                <td>{userData.remarks}</td>
                <td>{userData.portfolio}</td>
                <td>{userData.address}</td>
                <td>{userData.type}</td>
                <td>{userData.techStack}</td>
                <td>{userData.resume}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Display User Data by Email */}
      {emailUserData && (
        <div className="mt-4">
          <h3>User Data (Email)</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Location</th>
                <th>Email</th>
                <th>Skill Set</th>
                <th>Remarks</th>
                <th>Portfolio</th>
                <th>Address</th>
                <th>Type</th>
                <th>Tech Stack</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{emailUserData.id}</td>
                <td>{emailUserData.name}</td>
                <td>{emailUserData.mobile}</td>
                <td>{emailUserData.location}</td>
                <td>{emailUserData.email}</td>
                <td>{handleSkillSetDisplay(emailUserData.skillSet)}</td>
                <td>{emailUserData.remarks}</td>
                <td>{emailUserData.portfolio}</td>
                <td>{emailUserData.address}</td>
                <td>{emailUserData.type}</td>
                <td>{emailUserData.techStack}</td>
                <td>{emailUserData.resume}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Display All Users */}
      <div className="mt-4">
        <h3>All Users</h3>
        {allUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Location</th>
                <th>Email</th>
                <th>Skill Set</th>
                <th>Remarks</th>
                <th>Portfolio</th>
                <th>Address</th>
                <th>Type</th>
                <th>Tech Stack</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.location}</td>
                  <td>{user.email}</td>
                  <td>{handleSkillSetDisplay(user.skillSet)}</td>
                  <td>{user.remarks}</td>
                  <td>{user.portfolio}</td>
                  <td>{user.address}</td>
                  <td>{user.type}</td>
                  <td>{user.techStack}</td>
                  <td>{user.resume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
