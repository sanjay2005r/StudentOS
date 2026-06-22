const db = require("../config/db");

const addTask = (req, res) => {
    const {title, deadline, status} = req.body;

    const sql = "INSERT INTO tasks(title, deadline, status) VALUES (?, ?, ?)";
    db.query(
        sql,
        [title, deadline, status],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Task Added Successfully",
            });
        }
    );
};

const getTasks = (req, res) => {
    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, result) =>{
        if (err){
            return res.status(500).json(err);
        }
        res.json(result);
    });
};

module.exports = {
    addTask,
    getTasks,
};