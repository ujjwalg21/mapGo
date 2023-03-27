

const Host = ({ host }) => {

    let url = `http://localhost:5000/api/user/subscribe/${host.hostname}`;
    
    const subscribe=()=>{
        console.log('subscribing');
        console.log(url.trim());

            fetch(url.trim(), {
              method: "PUT",
              headers: {
                // Accept: "application/json",
                "Content-Type": "application/json",
                body: JSON.stringify({ message: 'subscribing' })
              },
              credentials: "include",
            }).then((res)=>{
                console.log(res.status);
                // console.log("subscribed")

                // document.querySelectorALL('.btn-success').innerHTML="<span>Subscribed</span>"
                console.log(res)
                // window.alert(`subscribed ${host.hostname}`)
            })
              .catch((err) => {
                console.log(err);
              });
          
    }


  return (
    <article>
      <h2>{host.hostname}</h2>
      <p>{host.about}</p>
      {/* <p>Host ID: {host.id}</p> */}

      <button className="btn-success" onClick={subscribe}>Subscribe</button>
    </article>
  );
};
export default Host;
