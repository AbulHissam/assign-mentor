const express = require("express");
const app = express();
const PORT = 5000;

require("dotenv").config();

// middleware
app.use(express.json());

// connect to DB
const connectToDB = require("./config/db");
connectToDB();

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/student", studentRoutes);

const mentorRoutes = require("./routes/mentorRoutes");
app.use("/api/mentor", mentorRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log("Server is up and listening on", PORT);
});
