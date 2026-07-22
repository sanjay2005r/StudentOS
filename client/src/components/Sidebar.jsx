import { use } from "react";
import { 
    Link,
    useLocation,
} from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    return (
        <div className="sidebar">
            <h2>🎓 StudentOS</h2>
            <br/>
            <div className="profile-card">
                <div className="avatar">
                    👤
                </div>
                <h3>
                    Sanjay
                </h3>
                <p>
                    Student Developer
                </p>
            </div>

            <div className="sidebar-links">
                <Link 
                    to="/"
                    className={
                        location.pathname === "/"
                            ? "active"
                            : ""
                    }
                >
                    🏠 Dashboard
                </Link>

                <Link 
                    to="/subjects"
                    className={
                        location.pathname === "/subjects"
                            ? "active"
                            : ""
                    }
                >
                    📚 Subjects
                </Link>

                <Link 
                    to="/tasks"
                    className={
                        location.pathname === "/tasks"
                            ? "active"
                            : ""
                    }
                >
                    📝 Tasks
                </Link>

                <Link 
                    to="/study"
                    className={
                        location.pathname === "/study"
                            ? "active"
                            : ""
                    }
                >
                    ⏰ Study
                </Link>

                <Link 
                    to="/pomodoro"
                    className={
                        location.pathname === "/pomodoro"
                            ? "active"
                            : ""
                    }
                >
                    🍅 Pomodoro
                </Link>
                <Link to="/placement">
                    💼 Placement
                </Link>
            </div>
            
            <div className="sidebar-bottom">
                <hr/>

                <Link to="#">
                    ⚙️ Settings
                </Link>
                <Link to="#">
                    🚪 Logout
                </Link>
            </div>

        </div>
    );
}

export default Sidebar;