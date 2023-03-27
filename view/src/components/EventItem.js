import React from 'react'

export const EventItem = ({event, onDelete}) => {
    return (
        <>
        <div>
           <h4>{event.eventname}</h4>
           <p>{event.description}</p>
           <p>{event.startTime}</p>
           <p>{event.endTime}</p>
           <p>{event.longitude}</p>
           <p>{event.latitude}</p>
           {/* <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(event)}}>Delete</button>  */}
        </div>
        <hr/> 
        </>
    )
}
