import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Userhome = () => {
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
            {/* <li className="list-item">
                    <i className="list-item-icon fas fa-search"></i>
                    <span className="list-item-text">Search</span>
                </li>
                <li className="list-item active">
                    <i className="list-item-icon fas fa-stream"></i>
                    <span className="list-item-text">Insights</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon fas fa-book"></i>
                    <span className="list-item-text">Docs</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon fas fa-users"></i>
                    <span className="list-item-text">Community</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon fas fa-toolbox"></i>
                    <span className="list-item-text">Tools</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon fas fa-shopping-basket"></i>
                    <span className="list-item-text">Market</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon far fa-question-circle"></i>
                    <span className="list-item-text">Resources</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon far fa-question-circle"></i>
                    <span className="list-item-text">Resources</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon far fa-question-circle"></i>
                    <span className="list-item-text">Resources</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon far fa-question-circle"></i>
                    <span className="list-item-text">Resources</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon far fa-question-circle"></i>
                    <span className="list-item-text">Resources</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon far fa-question-circle"></i>
                    <span className="list-item-text">Resources</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon far fa-question-circle"></i>
                    <span className="list-item-text">Resources</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon far fa-question-circle"></i>
                    <span className="list-item-text">Resources</span>
                </li>
                <li className="list-item">
                    <i className="list-item-icon far fa-question-circle"></i>
                    <span className="list-item-text">Resources</span>
                </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};
