const db = require("../config/db");

const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)";

    db.query(
        sql,
        [name, email, password],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                message : "User Registered Succesfully",
            });
        }
    );
};

const getUsers = (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(result);
    });
};
module.exports = {
    registerUser,
    getUsers,
};