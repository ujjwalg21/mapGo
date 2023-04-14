import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {

  const {state, dispatch} =useContext(UserContext);

  const RenderMenu =()=>{
    if(state){
      return(
        <>  
           <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <div className="navbar-nav meauto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <NavLink className="navlink" to="/contact">Contact</NavLink>
        </li>
          
      </div>
      
      </div>

        </>
      )
    }
    else{
      return(
        <>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <div className="navbar-nav meauto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <NavLink className="navlink" aria-current="page" to="/signin">Signin</NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink className="navlink " to="/signup">Signup</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navlink" to="/logout">User Login</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="navlink" to="/hostprofile">Hostprofile</NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink className="navlink" to="/hostlogin">Host Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navlink" to="/userevents">UserEvents</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navlink" to="/userhome">Userhome</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navlink" to="/hosthome">HostHome</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navlink" to="/contact">Contact</NavLink>
        </li>
        
        {/* <li className="nav-item">
          <NavLink className="navlink" to="/hostlogout">Hostlogout</NavLink>
        </li> */}
          
      </div>
      
      </div>

        </>
      )
    }

  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bglight">
  <div className="container-fluid"><img src = "/whitter.png" style={{width:"3vw"}}/>
    <NavLink className="mapgo " to="/">mapGo</NavLink>
    {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><NavLink class="dropdown-item" href="#">Logout</NavLink></li>
          </ul>
        </li> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <RenderMenu/>
    
   
        {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><NavLink class="dropdown-item" href="#">Logout</NavLink></li>
          </ul>
        </li> */}

        
      
  </div>
</nav>

  );
};

export default Navbar;
