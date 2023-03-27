import React, { useState } from 'react';

export const AddEvent = ({ addEvent }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date,setDate]=useState("");
    const [venue,setVenue]=useState("");


    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc || !date || !venue) {
            alert("Please fill all the fields");
        }
        else {
            addEvent(title, desc, date,venue);
            setTitle("");
            setDesc("");
            setDate("");
            setVenue("");
        }
    }
    return (
        <>
        <div className='heading'>ORGANIZER</div>
        <div className="addEvent my-3">
            <h3 className='title'>Add an Event</h3>
            <form onSubmit={submit}>

                <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="floatingName"
                        placeholder="name"
                        value={title}
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
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        autoComplete="off"
                        />
                      <label className="input" htmlFor="floatingdesc">
                        Description
                      </label>
                    </div>
                <div className="form-floating mb-3">
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        id="floatingDate"
                        placeholder="date"
                        value={venue}
                        onChange={(e) => setDate(e.target.value)}
                        autoComplete="off"
                        />
                      <label className="input" htmlFor="floatingdate">
                        Date
                      </label>
                    </div>
                <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="venue"
                        id="floatingVenue"
                        placeholder="venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        autoComplete="off"
                        />
                      <label className="input" htmlFor="floatingvenue">
                        Venue
                      </label>
                    </div>
                <button type="submit" className="btn btn-sm btn-success">Create Event</button>
            </form>
        </div>

        </>
    )
}
{/* <div className="mb-3">
    <label htmlFor="name" className="form-label">Event Name</label>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control form-input" id="title" aria-describedby="emailHelp" />

</div>
<div className="mb-3">
    <label htmlFor="desc" className="form-label">Description</label>
    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control form-input" id="desc" />
</div>
<div className="mb-3">
    <label htmlFor="date" className="form-label">Date</label>
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control form-input" id="date" />
</div>
<div className="mb-3">
    <label htmlFor="venue" className="form-label">Date</label>
    <input type="venue" value={venue} onChange={(e) => setVenue(e.target.value)} className="form-control form-input" id="venue" />
</div> */}
