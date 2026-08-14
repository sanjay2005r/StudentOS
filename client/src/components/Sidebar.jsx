import { useState } from "react";
import {
    Link,
    useLocation,
} from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Sidebar Toggle Button */}
            <button
                className="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title={isOpen ? "Close Sidebar" : "Open Sidebar"}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

                <h2>🎓 StudentOS</h2>

                <br />

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
                        onClick={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
                    >
                        🍅 Pomodoro
                    </Link>

                    <Link
                        to="/placement"
                        className={
                            location.pathname === "/placement"
                                ? "active"
                                : ""
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        💼 Placement
                    </Link>

                    <Link
                        to="/resources"
                        className={
                            location.pathname === "/resources"
                                ? "active"
                                : ""
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        🔎 Resources
                    </Link>

                </div>

                <div className="sidebar-bottom">

                    <hr />

                    <Link to="#">
                        ⚙️ Settings
                    </Link>

                    <Link to="#">
                        🚪 Logout
                    </Link>

                </div>

            </div>
        </>
    );
}

export default Sidebar;