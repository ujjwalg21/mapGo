import React, { useState, useEffect } from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import FontAwesomeIcon from "react-fontawesome";
import Accordion from "react-bootstrap/Accordion";

const ShowHosts = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () =>{
    setSidebar(!sidebar);
    let k= document.getElementById("open");
    if(k.style.display==="none") k.style.display="block";
    else k.style.display="none";
  }

  let baseURL = "http://localhost:5000/api/user/subscribe/";

  const subscribe = (host) => {
    let url = baseURL + host.hostname;

    console.log("this is url");
    console.log(url);
    // setUrl(URL);
    console.log("subscribing");
    console.log(URL);

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        console.log(res.status);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [hosts, setHosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/allhosts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setHosts(data);
        return data;
      })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(hosts);

    const resultsArray = hosts.filter(
      (host) =>
        host.hostname.includes(e.target.value) ||
        host.about.includes(e.target.value)
    );

    setSearchResults(resultsArray);
  };

  return (
    // <main>{content}</main>
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="navbar1">
        <Link to="#" className="menu-bars" id="open">
          <MdIcons.MdArrowForwardIos onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars" id="close" onClick={showSidebar}>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          <header>
            <form className="search" onSubmit={handleSubmit}>
              <input
                className="search__input"
                type="text"
                id="search"
                placeholder="Search Hosts"
                onChange={handleSearchChange}
              />
              {/* <button className="search__button">
                <FontAwesomeIcon icon="fa-sharp fa-solid fa-magnifying-glass" />
              </button> */}
            </form>
          </header>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {searchResults.map((host, index) => {
              return (
                <>
                  {/* <div className="menubox">
                <h2>{host.hostname}</h2>
                <p>{host.about}</p>

                <button className="btn-success" id="btn" onClick={()=>{subscribe(host)}}>
                  Subscribe
                </button>


                </div> */}

                 
                  <Accordion.Item eventKey={index} className="menubox">
                    <Accordion.Header  >{host.hostname}</Accordion.Header>
                    <Accordion.Body>
                      <p>{host.about}</p>
                      <button
                        className="btn-success"
                        id="btn"
                        onClick={() => {
                          subscribe(host);
                        }}
                      >
                        Subscribe
                      </button>
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              );
            })}
          </Accordion>
        </ul>
      </nav>
    </IconContext.Provider>
  );
};
export default ShowHosts;
