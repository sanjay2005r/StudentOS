
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
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(25 * 60);
  };

  const minutes = Math.floor(timer / 60);
  
  const seconds = timer % 60;
  
  // return (
  //   <div className="container">
  //     <h1>
  //       🎓 StudentOS
  //     </h1>
  //     <p
  //       style={{
  //         textAlign: "center",
  //         marginBottom: "20px"
  //       }}
  //     >
  //       Saves Our Students 🚀
  //     </p>
  //     <br/>
  //     <div className="dashboard">
  //       <h2>Dashboard</h2>
  //       <div className="dashboard-grid">
  //         <div className="stat-card subjects-card">
  //           <h3>📚 Subjects</h3>
  //           <p>{totalSubjects}</p>
  //         </div>
  //         <div className="stat-card tasks-card">
  //           <h3>📝 Tasks</h3>
  //           <p>{totalTasks}</p>
  //         </div>
  //         <div className="stat-card pending-card">
  //           <h3>⚠️ Pending</h3>
  //           <p>{pendingTasks}</p>
  //         </div>
  //         <div className="stat-card hours-card">
  //           <h3>⏰ Hours</h3>
  //           <p>{totalStudyHours}</p>
  //         </div>
  //         <div className="stat-card average-card">
  //           <h3>📈 Average</h3>
  //           <p>{averageStudyHours}</p>
  //         </div>
  //         <div className="stat-card score-card">
  //           <h3>🚀 Score</h3>
  //           <p>{productivityScore}</p>
  //         </div>
  //       </div>
  //       <br/>
  //       <p>
  //         🎯 Productivity Status:
  //         {productivityStatus}
  //       </p>
  //       <p>
  //         {motivation}
  //       </p>
  //       <p>
  //         🔥 Study Streak:
  //         {studyStreak} Day
  //       </p>
  //       <p>
  //         🎯 Daily Goal:
  //         {dailyGoal} hrs
  //       </p>
  //       <p>
  //         📚 Today's Study:
  //         {todayStudyHours} hrs
  //       </p>
  //       <p>
  //         📊 Goal Progress:
  //         {goalProgress}%
  //       </p>
  //     </div>

  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         name="name"
  //         placeholder="Enter Name"
  //         onChange={handleChange}
  //         value={formData.name}
  //       />
  //       <br/><br/>

  //       <input
  //         type="email"
  //         name="email"
  //         placeholder="Enter Email"
  //         onChange={handleChange}
  //         value={formData.email}
  //       />
  //       <br/><br/>

  //       <input
  //         type="password"
  //         name="password"
  //         placeholder="Enter Password"
  //         onChange={handleChange}
  //         value={formData.password}
  //       />
  //       <br/><br/>

  //       <button type="submit">
  //         Register
  //       </button>
  //     </form>
  //     <br/>

  //     <h2>All Users</h2>
  //     {users.map((user)=> (
  //       <div key={user.id}>
  //         <p>
  //           {user.name} - {user.email}
  //         </p>
  //       </div>
  //     ))}

  //     <h2>Add Subject</h2>
  //     <form onSubmit={addSubject}>
  //       <input
  //         type= "text"
  //         name= "name"
  //         placeholder= "Subject Name"
  //         value={subjectData.name}
  //         onChange={handleSubjectChange}
  //       />
  //       <br/><br/>
  //       <input
  //         type="number"
  //         name="progress"
  //         placeholder="Progress %"
  //         value={subjectData.progress}
  //         onChange={handleSubjectChange}
  //       />
  //       <br/><br/>
  //       <button type="submit">
  //         Add Subject
  //       </button>
  //     </form>
  //     <br/>

  //     <h2>Subjects</h2>
  //     {subjects.map((subject)=>(
  //       <div key={subject.id}>
  //         <p>
  //           {subject.name} - {subject.progress}% 
  //         </p>
  //       </div>
  //     ))}

  //     <h2>Add Task</h2>
  //     <form onSubmit={addTask}>
  //       <input
  //         type="text"
  //         name="title"
  //         placeholder="Task Title"
  //         value={taskData.title}
  //         onChange={handleTaskChange}
  //       />
  //       <br/><br/>

  //       <input
  //         type="date"
  //         name="deadline"
  //         value={taskData.deadline}
  //         onChange={handleTaskChange}
  //       />
  //       <br/><br/>

  //       <select
  //         name="status"
  //         value={taskData.status}
  //         onChange={handleTaskChange}
  //       >
  //         <option value="Pending">Pending</option>
  //         <option value="Completed">Completed</option>
  //       </select>
  //       <br/><br/>
  //       <button type="submit">
  //         Add task
  //       </button>
  //     </form>
  //     <br/>

  //     <h2>Tasks</h2>
  //     {tasks.map((task)=> (
  //       <div key = {task.id}>
  //         <p>
  //           {task.title} | {task.deadline} | {task.status}
  //         </p>
  //       </div>
  //     ))}
  //     <br/>
  //     <h2>Study Hours</h2>
  //     <form onSubmit={addStudyHour}>
  //       <input
  //         type="date"
  //         name="study_date"
  //         value={studyData.study_date}
  //         onChange={handleStudyChange}
  //       />
  //       <br/><br/>

  //       <input
  //         type="number"
  //         name="hours"
  //         placeholder="Hours studied"
  //         value={studyData.hours}
  //         onChange={handleStudyChange}
  //       />
  //       <br/><br/>

  //       <button type="submit">
  //         Add Study Hours
  //       </button>
  //     </form>

  //     <br/>

  //     {studyHours.map((study)=> (
  //       <div key={study.id}>
  //         <p>
  //           {study.study_date} - {study.hours} hrs
  //         </p>
  //       </div>
  //     ))}
  //     <br/>

  //     <h2>🍅 Pomodoro</h2>
  //     <div className="dashboard">
  //       <h1>
  //         {timer}:00
  //       </h1>
  //       <button>
  //         Start
  //       </button>
  //       <button>
  //         Reset
  //       </button>
  //     </div>

  //   </div>

  // );
  return (
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
      </nav>
      <br/>

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
              timer={
                `${minutes}:${
                  seconds
                    .toString()
                    .padStart(2, "0")
                }`
              }
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              resetTimer={resetTimer}
              isRunning={isRunning}
            />
          }
        />

      </Routes>
      </div>
    </div>
  );
}

export default App;