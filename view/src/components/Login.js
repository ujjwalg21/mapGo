import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <body className="loginbody">
        <div className="container loginbox">
          <div className="row1">
            <div className="mx-auto">
              <div className="card border-0 shadow rounded-3 my-5 con2">
                <p className="signin">Sign In</p>
                <div className="card-body">
                  <br />
                  <br />
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        type="username"
                        className="form-control"
                        id="floatingInput"
                        placeholder="username"
                      />
                      <label className="input" for="floatingInput">
                        Username
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="password"
                      />
                      <label className="input" for="floatingPassword">
                        Password
                      </label>
                    </div>

                    <button className="text-uppercase button" type="submit">
                      Sign in
                    </button>
                    <NavLink to="#" className="forgotPass">
                      <p>Forgot password ?</p>
                    </NavLink>
                    <hr className="my-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Login;
