import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bglight">
  <div className="container-fluid">
    <NavLink className="mapgo " to="/">mapGo</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <div className="navbar-nav meauto mb-2 mb-lg-0">

        <li className="nav-item">
          <NavLink className="navlink" aria-current="page" to="/home">Home</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="navlink" aria-current="page" to="/profile">Profile</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="navlink" aria-current="page" to="/hostlogin">Host Login</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="navlink" aria-current="page" to="/hostannounce">Host Announcement</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="navlink" aria-current="page" to="/hostprofile">Host Profile</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="navlink" aria-current="page" to="/signin">Signin</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="navlink " to="/signup">Signup</NavLink>
        </li>
       
        
      </div>
      
    </div>
  </div>
</nav>

  );
};

export default Navbar;
