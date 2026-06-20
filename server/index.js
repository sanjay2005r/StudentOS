const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

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