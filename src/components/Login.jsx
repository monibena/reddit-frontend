import { useState } from "react";
import { API } from "../lib";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); //to display error message on webpage

  const { setToken } = useOutletContext();

  //console.log(userName, password);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    // console.log("hi");

    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    //console.log(username);
    //console.log(password);

    const info = await res.json();
    //console.log(info.error);
    //console.log(info);

    if (!info.success) {
      return setError(info.error);
    }

    setToken(info.token);
    localStorage.setItem("token", info.token);

    //we want to redirect the user to /(slash)
    navigate("/");
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          value={password}
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button>Login</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
