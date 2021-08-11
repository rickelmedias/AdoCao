async function postUser(user, pass) {
    const logged = await verifyLogged();

    if (!logged)
    {
            try {
                if (user.trimStart().trimEnd() == "") {
                    return errorToRegister("ERRO: USUARIO ESTÁ EM BRANCO!", false);
                }
                else
                if (pass.trimStart().trimEnd() == "") {
                    return errorToRegister("ERRO: SENHA ESTÁ EM BRANCO!", false);
                }
                else
                {
                    // Create XMLhttpRequest:
                    let xhr = new XMLHttpRequest();
                    // Body:
                    const bodyRegister = {
                            login:   `${user}`,
                            pass:   `${pass}`
                    };
                    // URL and connection:
                    const urlRegisterPost = `http://localhost:3003/users/login`;
                    xhr.open("POST", urlRegisterPost);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(bodyRegister));

                    xhr.onreadystatechange = async () => {
                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                    if (xhr.status === 401) {
                                        alert('ACCOUNT AUTH FAILED');
                                    };

                                    if (xhr.status === 200) {
                                        loginSucess(xhr.responseText, true);
                                    };
                            }
                    };
                }
            } catch (error) {
                console.log(error);
            }
            
    }
}

async function sendLogin() {
    const user = await document.getElementById("user").value;
    const pass = await document.getElementById("pass").value;

    
    await postUser(user, pass);
}

async function verifyLogged() {
    const token = localStorage.getItem('token');

    const isLogged = await fetch("http://localhost:3003/users/login/verify", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then ( 
            (response) => {
                    if (response.status === 401) {
                        if (localStorage > 0) {
                            Storage.removeItem('token');
                            console.log('Token removed');
                        }
                        throw new Error('User not logged');
                    }else{
                        response => response.json();
                    }
        })
        .then( async (json) => { 
            if (json.msg.toUpperCase() === "LOGIN VERIFIED") {
                return true;
            };
        })
        .catch( (e) => {
            let error = `${e}`;
                if (error.toUpperCase() === "ERROR: USER NOT LOGGED"){
                    return false;
                }else{
                    return true;
                }
            }
        )

    return await isLogged;
}

function loginSucess(e, isJson) {
    if (isJson) {
        const res = Array(JSON.parse(e));
        localStorage.setItem('token', res[0].token);
        location.reload();
    }else{
            alert(e);
    }
}


window.onload = async () => {
    const logged = await verifyLogged();

    if (!logged) {
        if (localStorage.length > 0) {
            localStorage.clear();
            console.log('Token removed');
        }
    }
    
    console.log(logged);
}
window.onbeforeunload = function () {
    alert( "Do you really want to close?" );
};