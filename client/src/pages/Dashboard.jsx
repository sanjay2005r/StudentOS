import SubjectChart from "../components/SubjectChart";
import StudyChart from "../components/StudyChart";
import TaskPieChart from "../components/TaskPieChart";


function Dashboard({
    totalSubjects,
    totalTasks,
    pendingTasks,
    totalStudyHours,
    averageStudyHours,
    productivityScore,
    productivityStatus,
    motivation,
    studyStreak,
    xp,
    level,
    achievements,
    xpProgress,
    subjects,
    studyHours,
    tasks,
}) {
    return(
        
        <div className="dashboard">
              
            <h2>
                Dashboard
            </h2>

            <div className="xp-card">
                <h2>
                    🎮 Level {level}
                </h2>
                <p>
                    XP: {xp}
                </p>
                <div className="xp-bar">
                    <div
                        className="xp-fill"
                        style={{
                            width:`${xpProgress}%`
                        }}
                    />
                </div>
            </div>

            <div className="achievement-card">
                <h2>
                    🏆 Achievements
                </h2>
                {
                    achievements.length === 0 ?
                    (
                        <p>
                            No achievements yet.
                        </p>
                    )
                    :
                    achievements.map((achievement, index) => (
                        <p key={index}>
                            {achievement}
                        </p>
                    ))
                }
            </div>

            <div className="dashboard-grid">
                <div className="stat-card subjects-card">
                    <h3>📚 Subjects</h3>
                    <p>{totalSubjects}</p>
                </div>
                <div className="stat-card tasks-card">
                    <h3>📝 Tasks</h3>
                    <p>{totalTasks}</p>
                </div>
                <div className="stat-card pending-card">
                    <h3>⚠️ Pending</h3>
                    <p>{pendingTasks}</p>
                </div>
                <div className="stat-card hours-card">
                    <h3>⏰ Hours</h3>
                    <p>{totalStudyHours}</p>
                </div>
                <div className="stat-card average-card">
                    <h3>📈 Average</h3>
                    <p>{averageStudyHours}</p>
                </div>
                <div className="stat-card score-card">
                    <h3>🚀 Score</h3>
                    <p>{productivityScore}</p>
                </div>
            </div>
            <br/>
            <p>
               🎯 Productivity Status: {productivityStatus}
            </p>
            <p>
                {motivation}
            </p>
            <p>
                🔥 Study Streak: {studyStreak} Day
            </p>

            <h2
                style={{
                    marginBottom: "15px",
                }}
            >
                📊 Subject Progress
            </h2>

            <SubjectChart
                subjects={subjects}
            />
            {/* <hr/> */}
            <h2>📈 Study Hours Trend</h2>
            <StudyChart
                studyHours={studyHours}
            />
            <h2>
                🥧 Task Status
            </h2>
            <TaskPieChart
                tasks={tasks}
            />
        </div>
    );
}

export default Dashboard;