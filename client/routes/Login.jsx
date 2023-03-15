import React, { useState } from "react";
import Cookies from "js-cookie";
import { userCredentialsStore, isLoggedInStore } from "../store";
import { redirect, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const { username, password, setpassword, setusername } =
        userCredentialsStore();
    const { isLoggedIn, setIsLoggedIn } = isLoggedInStore();

    const handleSubmit = async () => {
        let reqBody = {
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
            body: JSON.stringify(reqBody),
        });
        //=============fetch===============
        //Giles Steiner
        //if user is assigned a cookie redirect them to window
        if (Cookies.get("user")) {
            setIsLoggedIn();
            // window.location.href = "/window";
            console.log("valid cookie");
            // return redirect('/')
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
                    <input type="text" onChange={(e) => setusername(e.target.value)} className="form-control" id="inputUsername" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="text" onChange={(e) => setpassword(e.target.value)} className="form-control" id="inputPassword" />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
