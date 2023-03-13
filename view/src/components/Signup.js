import React, {useState} from 'react';
// import Axios from 'axios';

// import regPic from '../images/mapgo_logo.png';
// import {NavLink, useNavigate} from "react-router-dom";

const Signup = () =>{


    
    
    
    //user instance for schema
    const [user,setUser] = useState({
        username:"", email:"", password:"", confirmpassword:""
    });

    //function handleInput: sets each value to a user key
    let key, value;
    const handleInputs = (event)=>{
        // console.log(event);
        key = event.target.name;
        value = event.target.value;
        
        
        
        setUser({...user, [key]:value})//react hook 
        
    }
    const checkEmail=()=>{
        let email=user.email;
        let text= email.slice(email.length-11,email.length);
        if(text!=="@iitk.ac.in") alert("invalid emailId");
    }
    // const str=JSON.stringify(user);
    // console.log(str);

    //function called after submit button

    // const navigator = useNavigate();

    const PostData = async (event)=>{
        event.PreventDefault();///idk what this does
  
        const {username, email, password,confirmpassword} = user;
        checkEmail();

        const res = await fetch("/register",{
            method: "POST",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password,
                confirmpassword
            })
        }).catch((err)=>{
            console.log(err);
        });

        const data = await res.json();

        if(data.status=== 422 || !data){
            window.alert("failed reg");
            console.log("failed registration");
        }
        else{
            window.alert("registration successful");
            console.log("successful regi");
            navigator.push("/login");
        }
    }

    
    return (
        <>
    <body className="loginbody">
        <div className="container loginbox">
        <div className="row1">
            <div className="mx-auto">
                <div className="card border-0 shadow rounded-3 my-5 con2">
                <p className="signin">Sign Up</p>
                <div className="card-body">
                    <br />
                    <br />
                    <form method='POST' action='/register'>
                    <div className="form-floating mb-3">
                        <input
                        type="username"
                        className="form-control"
                        id="floatingUsername"
                        name="username"
                        placeholder="username"
                        value={user.username}
                        onChange={handleInputs}
                        autoComplete="off"
                        />
                        <label className="input" htmlFor="floatingInput">
                        Username
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        type="email"
                        className="form-control"
                        name='email'
                        id="floatingEmail"
                        placeholder="email"
                        value={user.email}
                        onChange={handleInputs}
                        autoComplete="off"
                        />
                        <label className="input" htmlFor="floatingInput">
                        Email
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        type="password"
                        className="form-control"
                        name='password'
                        id="floatingPassword"
                        placeholder="password"
                        value={user.password}
                        onChange={handleInputs}
                        autoComplete="off"
                        />
                        <label className="input" htmlFor="floatingPassword">
                        Password
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        type="confirmpassword"
                        name='confirmpassword'
                        className="form-control"
                        id="floatingInput"
                        placeholder="confirmpassword"
                        value={user.confirmpassword}
                        onChange={handleInputs}
                        autoComplete="off"
                        />
                        <label className="input" htmlFor="floatingInput">
                        Confirm Password
                        </label>
                    </div>

                        <button className="text-uppercase button" onClick={PostData} type="submit">
                        Sign Up
                        </button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </body>
        </>
    );
}

export default Signup