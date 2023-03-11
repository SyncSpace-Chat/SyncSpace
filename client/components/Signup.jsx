
import React from 'react'

let username ='';
let password = '';

const handleUser = (e) => {
    username = e.target.value;
}

const handlePass = (e) => {
    password = e.target.value;
}

const handleSubmit = () => {


    //=============fetch===============
    //input proper end point
    fetch('/signup',
    {
        method: "POST",
        body: {
            username: username,
            password: password
        },
    })
    //=============fetch===============
}

function Signup() {

    return (
        <div >
            <form className="initialForms">
                <p className="formHeader"> Create an Account Below: </p>
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
export default Signup;