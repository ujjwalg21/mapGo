import React from 'react'
import { Routes, Route } from "react-router-dom"

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Hostlogin from "./components/Hostlogin"
import Hostprofile from './components/Hostprofile';
import Hostannounce from './components/Hostannounce';
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = ()=> {

  return(
    <>
      <Navbar/>

      <Routes>
        <Route exact path="/home" element={ <Home/> } />
        <Route exact path="/profile" element={ <Profile/> } />
        <Route exact path="/signin" element={ <Login/> } />
        <Route exact path="/signup" element={ <Signup/> } />
        <Route path='/hostlogin' element={<Hostlogin/>} />
        <Route path='/hostprofile' element={<Hostprofile/>} />
        <Route path='/hostannounce' element={<Hostannounce/>}/>
      </Routes>

      <div>
        login to use the application  
      </div>

    </>
    
  );
  
}

/*

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

*/
export default App;
