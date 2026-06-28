
import { useState, useEffect } from "react";
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

  return (
    <div className="container">
      <h1>StudentOS</h1>
      <br/>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <p>
          📚 Subjects: {totalSubjects}
        </p>
        <p>
          📝 Tasks: {totalTasks}
        </p>
        <p>
          ⏰ Study Hours: {totalStudyHours}
        </p>
        <p>
          ⚠️ Pending Tasks: {pendingTasks}
        </p>
        <p>
          📈 Average Hours: {averageStudyHours}
        </p>
        <p>
          🚀 Productivity Score: {productivityScore}
        </p>
        <p>
          🎯 Productivity Status: {productivityStatus}
        </p>
        <p>
          {motivation}
        </p>
        <p>
          🔥 Study Streak: {studyStreak} Days
        </p>
        <p>
          🎯 Daily Goal: {dailyGoal} hrs
        </p>
        <p>
          📚 Today's Study: {todayStudyHours} hrs
        </p>
        <p>
          📊 Goal Progress:{goalProgress}%
        </p>
        <hr/>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          value={formData.name}
        />
        <br/><br/>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          value={formData.email}
        />
        <br/><br/>

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          value={formData.password}
        />
        <br/><br/>

        <button type="submit">
          Register
        </button>
      </form>
      <br/>

      <h2>All Users</h2>
      {users.map((user)=> (
        <div key={user.id}>
          <p>
            {user.name} - {user.email}
          </p>
        </div>
      ))}

      <h2>Add Subject</h2>
      <form onSubmit={addSubject}>
        <input
          type= "text"
          name= "name"
          placeholder= "Subject Name"
          value={subjectData.name}
          onChange={handleSubjectChange}
        />
        <br/><br/>
        <input
          type="number"
          name="progress"
          placeholder="Progress %"
          value={subjectData.progress}
          onChange={handleSubjectChange}
        />
        <br/><br/>
        <button type="submit">
          Add Subject
        </button>
      </form>
      <br/>

      <h2>Subjects</h2>
      {subjects.map((subject)=>(
        <div key={subject.id}>
          <p>
            {subject.name} - {subject.progress}% 
          </p>
        </div>
      ))}

      <h2>Add Task</h2>
      <form onSubmit={addTask}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleTaskChange}
        />
        <br/><br/>

        <input
          type="date"
          name="deadline"
          value={taskData.deadline}
          onChange={handleTaskChange}
        />
        <br/><br/>

        <select
          name="status"
          value={taskData.status}
          onChange={handleTaskChange}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <br/><br/>
        <button type="submit">
          Add task
        </button>
      </form>
      <br/>

      <h2>Tasks</h2>
      {tasks.map((task)=> (
        <div key = {task.id}>
          <p>
            {task.title} | {task.deadline} | {task.status}
          </p>
        </div>
      ))}
      <br/>
      <h2>Study Hours</h2>
      <form onSubmit={addStudyHour}>
        <input
          type="date"
          name="study_date"
          value={studyData.study_date}
          onChange={handleStudyChange}
        />
        <br/><br/>

        <input
          type="number"
          name="hours"
          placeholder="Hours studied"
          value={studyData.hours}
          onChange={handleStudyChange}
        />
        <br/><br/>

        <button type="submit">
          Add Study Hours
        </button>
      </form>

      <br/>

      {studyHours.map((study)=> (
        <div key={study.id}>
          <p>
            {study.study_date} - {study.hours} hrs
          </p>
        </div>
      ))}
      <br/>

    </div>

  );
}

export default App;