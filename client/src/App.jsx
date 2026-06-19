import { useEffect, useState } from "react";
import API from "./api/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/")
      .then((response) => {
        setMessage(response.data); 
        // Stores the msg ^ from index.js in above
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>StudentOS</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;