import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Userhome = () => {



  const navigate = useNavigate();
  const getUserPrivate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/private", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/signin");
    }
  };
  useEffect(() => {
    getUserPrivate();
  }, []);









  
  const [hosts, setHosts] = useState([]);

  let data;

  const getHosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/showhosts", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      data = await res.json();
      setHosts(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHosts();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
          <i className="logo fab fa-sketch"></i>
          <span className="brand">The App</span>
        </div>
        <div className="sidebar-center">
          <ul className="list">
            {hosts.map((elem) => {
                return(
              <li className="list-item">
                <i className="list-item-icon fas fa-search"></i>
                <span className="list-item-text">{elem.hostname}</span>
              </li>
                )
            })}
            
          </ul>
        </div>
      </div>
    </>
  );
};
