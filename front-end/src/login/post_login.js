window.onload = async () => {
    /* Check if user is logged */
    const logged = await verifyLogged();

    if (!logged) {
        if (localStorage.length > 0) {
            localStorage.clear();
        }
    }
}

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
                // console.log(error);
            }
            
    }
}

async function sendLogin() {
    const user = await document.getElementById("user").value;
    const pass = await document.getElementById("pass").value;

    
    await postUser(user, pass);
}


async function loginSucess(e, isJson) {
    if (isJson) {
        const res = await Array(JSON.parse(e));
        await localStorage.setItem('token', res[0].token);
        location.reload();
    }else{
            alert(e);
    }
}