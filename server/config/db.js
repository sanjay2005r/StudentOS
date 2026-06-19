const mysql = require("mysql2");
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Sanjai@11",
    database : "studentos",
});
db.connect((err)=> {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
        return;
    }
    console.log("MySQL Connected Successfully");
});
module.exports = db;