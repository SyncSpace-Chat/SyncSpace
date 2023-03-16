import React from "react";
import { userCredentialsStore } from "../store";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { setUsername, setPassword, username, password } =
    userCredentialsStore();

  const handleSubmit = () => {
    console.log(password.length, username);
    if (!password.length || !username.length) {
      alert("please include both fields");
      return;
    }
    let temp = {
      username: username,
      password: password,
    };
    fetch("/db/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    }).then((res) => {
      if (res.status < 400) {
        return navigate("/login");
      } else {
        alert("account already exists");
        return;
      }
    });
  };

  return (
    <div>
      <form className="initialForms">
        <p className="formHeader">Create an Account Below:</p>
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
export default Signup;
