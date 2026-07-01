import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>🎓 StudentOS</h2>
            <Link to="/">🏠 Dashboard</Link>
            <Link to="/subjects">📚 Subjects</Link>
            <Link to="/tasks">📝 Tasks</Link>
            <Link to="/study">⏰ Study</Link>
            <Link to="/pomodoro">🍅 Pomodoro</Link>
        </div>
    );
}

export default Sidebar;