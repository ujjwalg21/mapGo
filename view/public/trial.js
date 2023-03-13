const axios = require('axios')

const login = async function() {
    try{
        const res = await axios.post(
            'http://localhost:5000/api/user/login',
            {
                "username": "user3",
                "password": "USER3"
            }
        );

        console.log(res);
    }
    catch(err){
        console.log(err)
    }
}

const register = async function() {
    try{
        const res = await axios.post(
            'http://localhost:5000/api/user/register',
            {
                "username": "user3",
                "iitkemail": "user3@iitk",
                "password": "USER3"
            }
        );

        console.log(res);
    }
    catch(err){
        console.log(err)
    }
}

// login();
// register();