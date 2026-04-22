import { useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [course, setCourse] = useState("");

  const token = localStorage.getItem("token");

  const updateCourse = async () => {
    await API.put("/update-course",
      { course },
      { headers: { Authorization: token } }
    );
    alert("Updated");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <input placeholder="New Course" onChange={e => setCourse(e.target.value)} />
      <button onClick={updateCourse}>Update Course</button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}