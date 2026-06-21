
import { useState, useEffect } from "react";
import API from "./api/api";

function App(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetchUsers();
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
      <h2>All Users</h2>

      {users.map((user)=> (
        <div key={user.id}>
          <p>
            {user.name} - {user.email}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;