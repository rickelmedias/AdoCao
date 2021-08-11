async function postUser(user, pass) {
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
                let xhr = new XMLHttpRequest();

                
                const bodyRegister = {
                    login:   `${user}`,
                    pass:   `${pass}`
                };

  
                
                urlRegisterPost = `http://localhost:3003/users/login`;
                xhr.open("POST", urlRegisterPost);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(bodyRegister));

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 401) {
                            console.log('ACCOUNT AUTH FAILED');
                            // errorToRegister(xhr.responseText, true);
                        return;
                        }
                        if (xhr.status === 200) {
                            if (logged) {
                                console.log('User has beend logged.')
                            }else{
                                loginSucess(xhr.responseText, true);
                            }
                        } 
                    }
                };
            }
    } catch (error) {
         console.log(error);
    }
}

async function sendLogin() {
    const user = await document.getElementById("user").value;
    const pass = await document.getElementById("pass").value;

    
    await postUser(user, pass);
}

function loginSucess(e, isJson) {
    if (isJson) {
        const res = Array(JSON.parse(e));
        (function(){
            const privateLocalStorage = window.localStorage;
            privateLocalStorage.setItem('token', res[0].token);
            delete window.localStorage;
          }());

    }else{
            alert(e); 
    }
}


window.onload = () => {
    if (true) {
        console.log(localStorage.getItem('token'))
    }
}