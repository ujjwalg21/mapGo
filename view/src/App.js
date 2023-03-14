import React from 'react'
import { Routes, Route } from "react-router-dom"

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import {AddEvent} from "./components/AddEvent";
import {Events} from "./components/Events";
import { useState,useEffect } from 'react';



const App = ()=> {



  let initEvent;
  if (localStorage.getItem("events") === null) {
    initEvent = [];
  }
  else {
    initEvent = JSON.parse(localStorage.getItem("events"));
  }


  const onDelete = (event) => {
    console.log("I am ondelete of event", event);
    // Deleting this way in react does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setEvents(events.filter((e) => {
      return e !== event;
    }));
    console.log("deleted", events)
    localStorage.setItem("events", JSON.stringify(events));
  }

  const addEvent = (title, desc, date, venue) => {
    console.log("I am adding this event", title, desc, date, venue)
    let sno;
    if (events.length === 0) {
      sno = 0;
    }
    else {
      sno = events[events.length - 1].sno + 1;
    }
    const myEvent = {
      sno: sno,
      title: title,
      desc: desc,
      date: date,
      venue: venue,
    }
    setEvents([...events, myEvent]);
    console.log(myEvent);
  }

  const [events, setEvents] = useState(initEvent);
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events])













  
  return(
    <>
      <Navbar/>

      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/contact" element={ <Contact/> } />
        <Route path="/signin" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        {/* <Route exact path="/events" render={()=>{
            return(
            <>
            <AddEvent addEvent={addEvent} />
            <Events events={events} onDelete={onDelete} /> 
            </>)
          }}> 
          </Route> */}

          <Route path='/addevents' element={<AddEvent addEvent={addEvent}/>} />
          <Route path='/events' element={<Events events={events} onDelete={onDelete}/>} />

      </Routes>
      

    </>
    
  );
  
}

export default App;
