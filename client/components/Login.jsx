import React from 'react'

function Login() {

    return (
        <div>
            <form className="initialForms">
                <p className="formHeader"> Login Below: </p>
                <br></br>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="email" className="form-control" id="inputUsername" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;