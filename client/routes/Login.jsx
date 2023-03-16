import React from "react";
import { userCredentialsStore, isLoggedInStore } from "../store";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { username, password, setPassword, setUsername } =
    userCredentialsStore();
  const { setIsLoggedIn } = isLoggedInStore();

  const handleSubmit = async () => {
    let reqBody = {
      username: username,
      password: password,
    };
    const res = await fetch("/db/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    if (res.status < 400) {
      setIsLoggedIn();
      return navigate("/chat");
    } else {
      alert("invalid login");
      return;
    }
  };

  return (
    <div>
      <form className="initialForms">
        <p className="formHeader">Login Below:</p>
        <br></br>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            id="inputUsername"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="inputPassword"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
