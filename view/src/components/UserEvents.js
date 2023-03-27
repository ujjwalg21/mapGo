import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
// import SearchBar from './SearchBar'
import ShowHosts from './ShowHosts'



const UserEvents = () => {
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

  const [Events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/showevents", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        console.log("this is data");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  console.log("this is events");
  console.log(Events);
  
  
  // const [hosts, setHosts] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);
  
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/user/allhosts", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setHosts(data);
  //       return data;
  //     }).then(data=>{
  //       setSearchResults(data)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);


  // const handleSubmit = (e) => e.preventDefault()

  //   const handleSearchChange = (e) => {
  //       if (!e.target.value) return setSearchResults(hosts)

  //       const resultsArray = hosts.filter(host => host.hostname.includes(e.target.value) || host.about.includes(e.target.value))

  //       setSearchResults(resultsArray)
  //   }


    

  return (
    <>
    {/* <header>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className="search__input"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                />
                <button className="search__button">
                    Search
                </button>
            </form>
        </header> */}

      
    <div className="contain">
      
    

      {Events.map((elem) => {
        return (
          <div className="col-md-3">
            <div className=" p-3 text-center rounded box contentbox">
              <img
                className="img-responsive rounded-circle dp"
                src="https://i.imgur.com/uppKNuF.jpg"
                width="80"
              />
              <h5 className="mt-3 name">{elem.eventname}</h5>

              <i className="fa-solid ">Date:{elem.startTime.slice(0, 10)}</i>
              <br />
              <i className="fa-solid ">Time:{elem.startTime.slice(11, 16)}</i>
              <div className="mt-4"></div>
            </div>
          </div>
        );
      })}
    
    </div>
<ShowHosts/>

    </>
  );
};

export default UserEvents;



