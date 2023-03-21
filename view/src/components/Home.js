import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () =>{
    const navigate = useNavigate();
    const getUserPrivate = async () =>{
        try{
            const res = await fetch(
                'http://localhost:5000/api/user/private',
                {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                }
            );

            const data = await res.json()
            // console.log(data);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
        }
        catch(err){
            console.log(err);
            navigate('/signin');
        }
    }
    
    useEffect(()=>{
        getUserPrivate();
    }, []);

    const [Hosts, setHosts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/api/user/showhosts', 
        {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => res.json())
        .then( data=> {setHosts(data);})
        .catch(err=>{console.log(err)});
    }, []);
    console.log("this is hosts")
    console.log(Hosts);

    return (
    <div class="d-flex" id="wrapper">
        <div class="border-end bg-white" id="sidebar-wrapper">
            <div class="list-group list-group-flush">
                {Hosts.map((item)=>{
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">{item.hostname}</a>
                    // <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Dashboard</a>                
                })};
            </div>
        </div>
    </div>

    //include map here

    );
}

export default Home