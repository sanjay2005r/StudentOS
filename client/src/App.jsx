
import { useState, useEffect } from "react";

import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Tasks from "./pages/Tasks";
import Study from "./pages/Study";
import Pomodoro from "./pages/Pomodoro";
import Placement from "./pages/Placement";
import Resources from "./pages/Resources";


import "./App.css";
import API from "./api/api";
import { toFormData } from "axios";

function App(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [studyHours, setStudyHours] = useState([]);
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [xp, setXp] = useState(0);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [studyData, setStudyData] = useState({
    study_date: "",
    hours: "",
  });

  const totalSubjects = subjects.length;

  const totalTasks = tasks.length;

  const totalStudyHours = studyHours.reduce(
    (sum, study) => sum + Number(study.hours),
    0
  );

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const averageStudyHours =
    studyHours.length > 0
      ? (
        totalStudyHours /
        studyHours.length
        ).toFixed(1)
      : 0;

  const productivityScore = Math.max(
    0,
    Math.round(
      averageStudyHours * 10 -
      pendingTasks * 5
    )
  );

  const level = Math.floor(xp / 100) + 1;

  const achievements = [];

  if (tasks.some(task => task.status === "Completed")) {
    achievements.push("🥇 First Task Completed");
  }
  if (subjects.length >= 3){
    achievements.push("📚 Subject Collector");
  }
  if (totalStudyHours >= 10) {
    achievements.push("⏰ 10 Study Hours");
  }
  if (xp >= 100){
    achievements.push("🎮 Level Up!");
  }

  const xpProgress = xp % 100;

  let productivityStatus = "";
  if (productivityScore >= 70){
    productivityStatus = "🔥 Excellent";
  }
  else if (productivityScore >= 40) {
    productivityStatus = "⚡ Good"
  }
  else {
    productivityStatus = "😴 Needs Improvement"
  }

  let motivation = "";

  if (productivityScore >= 70) {
    motivation = "🔥 You're on fire today!";
  }
  else if (productivityScore >= 40) {
    motivation = "⚡ Keep pushing, you're doing well!";
  }
  else {
    motivation = "😴 Time to lock in and study!";
  }

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const studiedToday = studyHours.some(
    (study) => study.study_date === today
  );

  const studyStreak = studiedToday ? 1 : 0;

  const dailyGoal = 5;
  const todayStudyHours = studyHours
    .filter(
      (study) => study.study_date === today
    )
    .reduce(
      (sum, study) => sum + Number(study.hours),
      0
    );
  
  const goalProgress = 
    todayStudyHours > 0 ? Math.min(
      100,
      Math.round(
        (todayStudyHours / dailyGoal) * 100
      )
    )
  : 0;
  const [taskData, setTaskData] = useState({
    title: "",
    deadline: "",
    status: "Pending",
  });

  const [subjectData, setSubjectData] = useState({
    name: "",
    progress: "",
  });

  useEffect(()=>{
    fetchUsers();
    fetchSubjects();
    fetchTasks();
    fetchStudyHours();

  }, []);

  // ---------------------------------------------
  useEffect(() => {
    let interval;
    if (isRunning && timer > 0){
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);
  // ---------------------------------------------

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubjectChange = (e) => {
    setSubjectData({
      ...subjectData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchSubjects = async () => {
    try {
      const res = await API.get("/api/subjects");

      setSubjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSubject = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/api/subjects",
        subjectData
      );
      alert(res.data.message);

      fetchSubjects();
      setSubjectData({
        name: "",
        progress: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeSubject = async (id) => {
    try {
      await API.delete(
        `/api/subjects/${id}`
      );
      fetchSubjects();
    }
    catch (error){
      console.log(error);
    }
  };

  const handleTaskChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStudyChange = (e) => {
    setStudyData({
      ...studyData,
      [e.target.name]: e.target.value,
    });
  };

  
  const fetchStudyHours = async () => {
    try {
      const res = await API.get("/api/study");

      setStudyHours(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchTasks = async () =>{
    try {
      const res = await API.get("/api/tasks");
      setTasks(res.data);
    } catch (error){
      console.log(error);
    }
  };

  const addStudyHour = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/api/study",
        studyData
      );
      alert(res.data.message);

      fetchStudyHours();

      setStudyData({
        study_date: "",
        hours: "",
      });
    } catch (error){
      console.log(error);
    }
  };


  const addTask = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/api/tasks",
        taskData
      );
      alert(res.data.message);
      fetchTasks();

      setTaskData({
        title: "",
        deadline: "",
        status: "Pending",
      });
    } catch (error) {
      console.log(error);
    }
  };
// ---------------------------------------------------
  // const completeTask =
  //   async (id) => {
  //     try {
  //       await API.put(
  //         `/api/tasks/${id}`
  //       );
  //       fetchTasks();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const completeTask = async (id) => {
    try {
      await API.put(`/api/tasks/${id}`);

      fetchTasks();
      setXp((prevXp) => prevXp + 20);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = async (id) => {
    try {
      await API.delete(
        `/api/tasks/${id}`
      );
      fetchTasks();
    }
    catch(error){
      console.lpg(error);
    }
  };

// ***************************************************
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/api/users/register",
        formData
      );

      alert(res.data.message);
      fetchUsers();

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error){
      console.log(error);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const setPomodoro25 = () => {
    setIsRunning(false);
    setHasStarted(false);
    setTimer(25 * 60);
  };

  const setPomodoro50 = () => {
    setIsRunning(false);
    setHasStarted(false);
    setTimer(50 * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHasStarted(false);
    setTimer(25 * 60);
  };

  const minutes = Math.floor(timer / 60);
  
  const seconds = timer % 60;














  return (
    <div className= {theme}>

      <div className="app-layout">
        <Sidebar/>
        <div className="main-content">
          <Navbar
            pendingTasks={pendingTasks}
          />
        <h1>🎓 StudentOS</h1>
        <nav>
          <Link to="/">
            Dashboard
          </Link>
          {" | "}

          <Link to="/subjects">
            Subjects
          </Link>
          {" | "}

          <Link to="/tasks">
            Tasks
          </Link>
          {" | "}

          <Link to="/study">
            Study
          </Link>
          {" | "}

          <Link to="/pomodoro">
            Pomodoro
          </Link>
          {" | "}

          <Link to="/placement">
            Placement
          </Link>
        </nav>
        <br/>
        <button
          onClick={() => {
            const newTheme =
              theme === "dark"
                ? "light"
                : "dark";
            setTheme(newTheme);

            localStorage.setItem(
              "theme",
              newTheme
            );
          }}
        >
          {
            theme === "dark"
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"
          }
        </button>
        {/* <br/><br/> */}

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                totalSubjects={totalSubjects}
                totalTasks={totalTasks}
                pendingTasks={pendingTasks}
                totalStudyHours={totalStudyHours}
                averageStudyHours={averageStudyHours}
                productivityScore={productivityScore}
                productivityStatus={productivityStatus}
                motivation={motivation}
                studyStreak={studyStreak}
                xp = {xp}
                level={level}
                achievements={achievements}
                xpProgress={xpProgress}
                subjects={subjects}
                studyHours={studyHours}
                tasks={tasks}
              />
            }
          />
          <Route
            path="/subjects"
            element={
              <Subjects 
                subjects={subjects}
                subjectData={subjectData}
                handleSubjectChange={handleSubjectChange}
                addSubject={addSubject}
                removeSubject={removeSubject}
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <Tasks 
                tasks={tasks}
                taskData={taskData}
                handleTaskChange={handleTaskChange}
                addTask={addTask}
                completeTask={completeTask}
                removeTask={removeTask}
              />
            }
          />
          <Route
            path="/study"
            element={
              <Study 
                studyHours={studyHours}
                studyData={studyData}
                handleStudyChange={handleStudyChange}
                addStudyHour={addStudyHour}
              />
            }
          />
          <Route
            path="/pomodoro"
            element={
              <Pomodoro
                timer={`${minutes}:${seconds
                      .toString()
                      .padStart(2, "0")}`}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                resetTimer={resetTimer}
                isRunning={isRunning}
                hasStarted={hasStarted}
                setPomodoro25={setPomodoro25}
                setPomodoro50={setPomodoro50}
              />
            }
          />
          <Route
            path="/placement"
            element={<Placement />}
          />
          <Route
            path = "/resources"
            element = {<Resources/>}
          />

        </Routes>
        
        </div>
      </div>
    </div>
  );
}

export default App;