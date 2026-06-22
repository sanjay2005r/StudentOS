
import { useState, useEffect } from "react";
import API from "./api/api";

function App(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [subjectData, setSubjectData] = useState({
    name: "",
    progress: "",
  });

  useEffect(()=>{
    fetchUsers();
    fetchSubjects();
    fetchTasks();
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

  const fetchTasks = async () =>{
    try {
      const res = await API.get("/api/tasks");
      setTasks(res.data);
    } catch (error){
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
    <div>
      <h1>StudentOS</h1>
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

    <h2>Tasks</h2>
    {tasks.map((task)=> (
      <div key = {task.id}>
        <p>
          {task.title} | {task.deadline} | {task.status}
        </p>
      </div>
    ))}


    </div>

  );
}

export default App;