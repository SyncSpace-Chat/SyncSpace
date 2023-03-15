import React, { useState } from "react";
import Cookies from "js-cookie";
import { redirect, useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    //   let username = "";
    //   let password = "";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUser = (e) => {
        // username = e.target.value;
        setUsername(e.target.value);
    };

    const handlePass = (e) => {
        // password = e.target.value;
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        let temp = {
            username: username,
            password: password,
        };
        //=============fetch===============
        //input proper end point
        await fetch("/db/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(temp),
        });
        //=============fetch===============

        //Giles Steiner
        //if user is assigned a cookie redirect them to window
        if (Cookies.get("user")) {
            // window.location.href = "/window";
            console.log("valid cookie");
            // return redirect("/window");
            return navigate("/window");
        }
    };

    return (
        <div>
            <form className="initialForms">
                <p className="formHeader">Login Below:</p>
                <br></br>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" onChange={handleUser} className="form-control" id="inputUsername" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="text" onChange={handlePass} className="form-control" id="inputPassword" />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
