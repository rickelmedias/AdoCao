
async function verifyLogged() {
    const token = localStorage.getItem('token');

    const isLogged = await fetch("http://localhost:3003/users/login/verify", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then ( 
            async (response) => {
                    if (response.status === 401) {
                        if (localStorage > 0) {
                            Storage.removeItem('token');
                        }
                        throw new Error('User not logged');
                    }else{
                        response = await response.json();
                        return response;
                    }
        })
        .then( async (json) => { 
            if (json.msg.toUpperCase() === "LOGIN VERIFIED") {
                return true;
            };
        })
        .catch( (e) => {
            let error = `${e}`;
            // console.log(error);
                if (error.toUpperCase() === "ERROR: USER NOT LOGGED"){
                    return false;
                }else{
                    // console.log(error)
                    return true;
                }
            }
        )

    return await isLogged;
}