function Dashboard() {
    return(
        <div className="dashboard">
            <h2>
                Dashboard
            </h2>
            <div className="dashboard-grid">
                <div className="stat-card subjects-card">
                    <h3>📚 Subjects</h3>
                    <p>0</p>
                </div>
                <div className="stat-card tasks-card">
                    <h3>📝 Tasks</h3>
                    <p>0</p>
                </div>
                <div className="stat-card pending-card">
                    <h3>⚠️ Pending</h3>
                    <p>0</p>
                </div>
                <div className="stat-card hours-card">
                    <h3>⏰ Hours</h3>
                    <p>0</p>
                </div>
                <div className="stat-card average-card">
                    <h3>📈 Average</h3>
                    <p>0</p>
                </div>
                <div className="stat-card score-card">
                    <h3>🚀 Score</h3>
                    <p>0</p>
                </div>
            </div>
            <br/>
            <p>
               🎯 Productivity Status 
            </p>
            <p>
                Motivation Message
            </p>
            <p>
                🔥 Study Streak
            </p>
        </div>
    );
}

export default Dashboard;