const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const studyRoutes = require("./routes/studyRoutes");
const placementRoutes = require("./routes/placementRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/placements", placementRoutes);

app.get("/", (req, res)=>{
    db.query("SELECT * FROM users", (err, result)=>{
        if (err){
            return res.status(500).json(err);
        }
        res.json(result);
    });
});


// app.get("/", (req, res) => {
//     res.send("StudentOS Server Running 👍");
// }); 

app.listen(5000, () => {
  console.log("Server running on port 5000");
//   console.log("Hello SOS gang");
});