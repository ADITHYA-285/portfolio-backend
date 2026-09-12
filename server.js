require("dotenv").config();

const express = require("express");
const cors = require("cors");

const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillroute");
const messageRoutes = require("./routes/messageroute");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Portfolio Backend is Working!");
});

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});