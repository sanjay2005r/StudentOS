const db = require("../config/db");

const addStudyHour = (req, res) => {
    const { study_date, hours } = req.body;
    
    const sql = "INSERT INTO study_hours(study_date, hours) VALUES (?, ?)";

    db.query(sql, [study_date, hours], (err, result) =>{
        if (err){
            return res.status(500).json(err);
        }
        res.json({
            message: "Study Hours Added",
        });
    });
};

const getStudyHours = (req, res) => {
    const sql = "SELECT * FROM study_hours";

    db.query(sql, (err, result) =>{
        if(err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

module.exports = {
    addStudyHour,
    getStudyHours,
}