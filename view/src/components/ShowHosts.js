import Host from "./Host";
import React, { useState, useEffect } from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import FontAwesomeIcon from "react-fontawesome"

const ShowHosts = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // const [host, setHost] = useState([]);

  let url;

  const subscribe = () => {
    console.log("subscribing");
    console.log(url.trim());

    fetch(url.trim(), {
      method: "PUT",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        body: JSON.stringify({ message: "subscribing" }),
      },
      credentials: "include",
    })
      .then((res) => {
        console.log(res.status);
        // console.log("subscribed")
        // document.getElementById('btn').disabled=true;
       // document.querySelectorALL('.btn-success').innerHTML="<span>Subscribed</span>"
        console.log(res);
        // window.alert(`subscribed ${host.hostname}`)
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

  // const results = searchResults.map(host => <article>
  //     <h2>{host.hostname}</h2>
  //     <p>{host.about}</p>
  //     <button className="btn-success" ></button>
  //   </article>)

  // const content = results?.length ? results : <article><p>No Matching Hosts</p></article>

  return (
    // <main>{content}</main>
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="navbar1">
        <Link to="#" className="menu-bars">
          <MdIcons.MdArrowForwardIos onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars" onClick={showSidebar}>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          <header>
            <form className="search" onSubmit={handleSubmit}>
              <input
                className="search__input"
                type="text"
                id="search"
                onChange={handleSearchChange}
              />
              <button className="search__button">
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                <FontAwesomeIcon icon="fa-sharp fa-solid fa-magnifying-glass" />
              </button>
            </form>
          </header>
          {searchResults.map((host, index) => {

            url = `http://localhost:5000/api/user/subscribe/${host.hostname}`;
            return (
              <>
              <div className="menubox">
                <h2>{host.hostname}</h2>
                <p>{host.about}</p>

                <button className="btn-success" id="btn" onClick={subscribe}>
                  Subscribe
                </button>


                </div>
              </>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
};
export default ShowHosts;
