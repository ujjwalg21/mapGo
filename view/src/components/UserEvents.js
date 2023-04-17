import React from "react";
import { useEffect, useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import ShowHosts from './ShowHosts'
import { UserContext } from "../App";


const UserEvents = () => {
  const { state, dispatch } = useContext(UserContext);
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
      if(res.status===200){
        dispatch({type:"USER", payload:"user"});

      }
      else if (!res.status === 200) {
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
  
  


    

  return (
    <>
    

    <div className="eventbox">
    

      {Events.map((elem) => {
        return (
          <div className="col-md-3">
            <div className=" p-3 text-center rounded box contentbox">
              <img
                className="img-responsive rounded-circle dp"
                src="https://i.imgur.com/uppKNuF.jpg"
                width="80"
                />

              <h5 className="mt-3 name">{elem.hostname}</h5>
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



