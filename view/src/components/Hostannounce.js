import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { set } from 'mongoose';

const Hostannounce = ({ addEvent }) => {
  const navigate = useNavigate();

  const getUserPrivate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/host/private", {
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
      navigate("/hostlogin");
    }
  };
  useEffect(() => {
    getUserPrivate();
  }, []);

  // Handling Inputs

  const [eventname, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [venue, setVenue] = useState("");



// SET LONGITUDE AND LATITUDE

 const setlocation=()=>{
  // console.log(venue);
    if(venue==="events"){
      setLongitude("3");
      setLatitude("7");
    }
    else if(venue==="pronite"){
      setLongitude("8");
      setLatitude("15");
    }
    else if(venue==="oat"){
      setLongitude("17");
      setLatitude("25");
    }
    else if(venue==="LHC"){
      setLongitude("25");
      setLatitude("35");
    }
    

 }









  const submit = async (e) => {

    
      setlocation();
   
    // console.log(latitude,longitude);


    e.preventDefault();
    if (
      !eventname ||
      !description ||
      !startTime ||
      !endTime ||
      !longitude ||
      !latitude
    ) {
      alert("Please fill all the fields");
    } else {
      // addEvent(eventname,description,startTime,endTime,longitude,latitude);

      const res = await fetch("http://localhost:5000/api/host/createevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          eventname: eventname,
          description: description,
          startTime: startTime,
          endTime: endTime,
          longitude: longitude,
          latitude: latitude,
        }),
      });

      if (res.status === 400) {
        window.alert("username taken, try another one");
        console.log("username taken");
      } else if (res.status === 200) {
        window.alert("created an event");
        console.log(
          eventname,
          description,
          startTime,
          endTime,
          longitude,
          latitude
        );
        navigate("/signin");
      } else if (res.status === 500) {
        console.log("error in searching db");
      } else {
        console.log("unknown err");
      }

      setTitle("");
      setDesc("");
      setStartTime("");
      setEndTime("");
      setLongitude("");
      setLatitude("");
      setVenue("");
    }
  };

  return (
    <>
      <div className="heading">ORGANIZER</div>
      <div className="addEvent my-3">
        <h3 className="title">Add an Event</h3>
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              id="floatingName"
              placeholder="name"
              value={eventname}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
            <label className="input" htmlFor="floatingname">
              Event Name
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="desc"
              id="floatingdesc"
              placeholder="desc"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              autoComplete="off"
            />
            <label className="input" htmlFor="floatingdesc">
              Description
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="datetime-local"
              className="form-control"
              name="start"
              placeholder="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              autoComplete="off"
            />
            <label className="input" htmlFor="floatingTime">
              startTime
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="datetime-local"
              className="form-control"
              name="end"
              placeholder="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              autoComplete="off"
            />
            <label className="input" htmlFor="floatingTime">
              endTime
            </label>
          </div>
          {/* <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="longitude"
                        placeholder="longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        autoComplete="off"
                        />
                      <label className="input" htmlFor="floatingvenue">
                        Longitude
                      </label>
                    </div>
                <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="latitude"
                        placeholder="latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        autoComplete="off"
                        />
                      <label className="input" htmlFor="floatingvenue">
                        Latitude
                      </label>
                    </div> */}

          {/* <label for="venue">Choose a Venue:</label>
          <select id="cars" name="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select> */}

          <div className="form-floating mb-3">
            <select
              className="form-control"
              name="venue"
              value={venue}
              placeholder="venue"
              autoComplete="off"
              onChange={(e)=>setVenue(e.target.value)}
            >
              <option value="LHC">LHC</option>
              <option value="oat">OAT</option>
              <option value="pronite">Pronite Ground</option>
              <option value="events">Events Ground</option>
            </select>

            <label className="input" htmlFor="floatingVenue">
              Venue
            </label>
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-sm btn-success"
          onClick={submit}
        >
          Create Event
        </button>
      </div>
    </>
  );
};

export default Hostannounce;
