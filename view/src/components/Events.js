import React from 'react'
import {EventItem} from "./EventItem";

export const Events = (props) => {
    let myStyle = {
        minHeight: "70vh",
        margin: "40px auto"
    }
    return (
        <div className="container" style={myStyle}>
            <h3 className="my-3">Events List</h3>
            {props.events.length===0? "No Events to display":  
            props.events.map((event)=>{
                console.log(event.sno);
                return (<EventItem event={event} key={event.sno} onDelete={props.onDelete}/>   
                )
            })
              } 
        </div>
    )
}
