import { useState } from "react";
import API from "../api";

export default function Login() {
  const [data, setData] = useState({});

  const login = async () => {
    try {
      const res = await API.post("/login", data);

      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";

    } catch (err) {
      console.log("ERROR:", err);
      alert("Backend not running or wrong API");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      <input
        placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}