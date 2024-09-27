const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route to add a new user
app.post("/details", async (req, res) => {
  try {
    const response = await axios.post("http://45.127.102.218:3000/details", req.body);
    res.send(response.data);
  } catch (error) {
    console.error("Error in POST /details:", error.response ? error.response.data : error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Route to get user by ID
app.get("/details/:id", async (req, res) => {
  try {
    const response = await axios.get(`http://45.127.102.218:3000/details/${req.params.id}`);
    res.send(response.data);
  } catch (error) {
    console.error("Error in GET /details/:id:", error.response ? error.response.data : error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Route to get user by email
app.get("/details", async (req, res) => {
  try {
    const response = await axios.get(`http://45.127.102.218:3000/details?email=${req.query.email}`);
    res.send(response.data);
  } catch (error) {
    console.error("Error in GET /details:", error.response ? error.response.data : error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Route to get all users
app.get("/all-details", async (req, res) => {
  try {
    const response = await axios.get("http://45.127.102.218:3000/all-details");
    res.send(response.data);
  } catch (error) {
    console.error("Error in GET /all-details:", error.response ? error.response.data : error.message);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Sample request to add a user
const sampleUser = {
  id: 1,
  name: "Barath",
  mobile: "6382411311",
  location: "Salem",
  email: "barath_unique@indiespirit.in", // Unique email
  skillSet: ["JS", "HTML", "CSS"],
  remarks: "Good",
  portfolio: "Software Engineer",
  address: "Salem",
  type: "Remote",
  techStack: "JS",
  resume: "empty"
};

// Function to send sample request to add user
const addSampleUser = async () => {
  try {
    const response = await axios.post("http://localhost:5000/details", sampleUser);
    console.log("Sample user added:", response.data);
  } catch (error) {
    console.error("Error adding sample user:", error.response ? error.response.data : error.message);
  }
};

// Uncomment the line below to add the sample user when starting the server
// addSampleUser();

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
  // Uncomment the line below to add the sample user on server start
  // addSampleUser();
});
