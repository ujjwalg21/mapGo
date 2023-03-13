import React from 'react'

export const EventItem = ({event, onDelete}) => {
    return (
        <>
        <div>
           <h4>{event.title}</h4>
           <p>{event.desc}</p>
           <p>{event.date}</p>
           <p>{event.venue}</p>
           <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(event)}}>Delete</button> 
        </div>
        <hr/> 
        </>
    )
}
